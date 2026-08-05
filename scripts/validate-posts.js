import process from 'node:process'
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import { LOCALES, parseDate } from '../src/site.config.js'

/**
 * Posts have an implicit frontmatter contract spread across ListPosts.vue,
 * App.vue, rss.js and sitemap.js. Getting it wrong used to fail silently — a
 * post would render but never appear in the listing, the feed or the sitemap.
 * Check it once, up front, and say exactly what is wrong.
 */
const KNOWN_TYPES = ['blog', 'note']

async function run() {
  const files = (await fg('pages/posts/**/*.md')).filter(file => file !== 'pages/posts/index.md')

  const errors = []
  const warnings = []

  for (const file of files) {
    let data, content, raw
    try {
      ({ data, content, matter: raw } = matter(await fs.readFile(file, 'utf-8')))
    }
    catch (error) {
      // Unquoted colons are the most common frontmatter mistake, and this is
      // the first step of the build — a raw js-yaml dump here names no file.
      errors.push(`${file}: invalid YAML frontmatter — ${error.reason ?? error.message}. Values containing a colon must be quoted, e.g. \`title: "Terraform: A Guide"\`.`)
      continue
    }

    if (!data.title)
      errors.push(`${file}: missing \`title\` — used for the listing, <title> and og:title.`)
    else if (/<\/?script/i.test(String(data.title)))
      errors.push(`${file}: \`title\` contains a script tag, which breaks the generated component and the JSON-LD.`)

    // Two traps here. `date: 2026` is valid YAML (the integer 2026) and a
    // valid Date (1970-01-01T00:00:02.026Z). And YAML builds dates with
    // Date.UTC(), which silently rolls over out-of-range parts, so a typo
    // like 2026-09-31 becomes 2026-10-01 everywhere without complaint.
    // Round-tripping the parsed date back to the written text catches both.
    const written = raw?.match(/^date:(.*)$/m)?.[1].trim()
    const parsed = parseDate(data.date)
    if (!data.date) {
      errors.push(`${file}: missing \`date\` — without it the post renders but never appears in /posts, the feed or the sitemap.`)
    }
    else if (!parsed || !written || parsed.toISOString().slice(0, 10) !== written) {
      errors.push(`${file}: \`date: ${written ?? data.date}\` is not a valid calendar date${parsed && written ? ` (it resolves to ${parsed.toISOString().slice(0, 10)})` : ''}. Use an unquoted YYYY-MM-DD, e.g. \`date: 2026-08-05\`.`)
    }

    if ('draft' in data && typeof data.draft !== 'boolean')
      errors.push(`${file}: \`draft: ${data.draft}\` must be unquoted true or false — any quoted value is truthy and would silently unpublish the post.`)

    // Markdown image paths become build-time imports, and an unresolved one
    // fails the build with a Rollup stack trace that names no line.
    for (const [, src] of content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)) {
      if (!await fs.pathExists(`public${src}`))
        errors.push(`${file}: image \`${src}\` does not exist at \`public${src}\` — the build fails on the unresolved import. Put the file there, or remove the reference.`)
    }

    if (data.lang && !LOCALES[data.lang])
      errors.push(`${file}: \`lang: ${data.lang}\` is not a configured locale (${Object.keys(LOCALES).join(', ')}). Add it to LOCALES in src/site.config.js.`)

    for (const type of String(data.type ?? 'blog').split('+')) {
      if (!KNOWN_TYPES.includes(type))
        errors.push(`${file}: \`type: ${data.type}\` is not one of ${KNOWN_TYPES.join(', ')} — the post will not be listed anywhere.`)
    }

    if (!data.description)
      warnings.push(`${file}: no \`description\` — the post ships without a meta description and gets a bare entry in llms.txt.`)
  }

  for (const warning of warnings)
    console.warn(`[posts] warning: ${warning}`)

  if (errors.length) {
    console.error(`\n[posts] ${errors.length} problem(s) found:\n`)
    for (const error of errors)
      console.error(`  ✗ ${error}`)
    console.error('\nSee .github/POST_TEMPLATE.md for a working example.\n')
    process.exit(1)
  }

  console.log(`[posts] ${files.length} post(s) validated`)
}

run()
