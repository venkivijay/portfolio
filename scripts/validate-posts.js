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
  const files = (await fg('pages/posts/**/*.md')).filter(file => !file.endsWith('/index.md'))

  const errors = []
  const warnings = []

  for (const file of files) {
    let data
    try {
      ({ data } = matter(await fs.readFile(file, 'utf-8')))
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

    // `date: 2026` is valid YAML (the integer 2026) and a valid Date
    // (1970-01-01T00:00:02.026Z), so parseability alone is not enough.
    const isCalendarDate = data.date instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(String(data.date))
    if (!data.date) {
      errors.push(`${file}: missing \`date\` — without it the post renders but never appears in /posts, the feed or the sitemap.`)
    }
    else if (!isCalendarDate || !parseDate(data.date)) {
      errors.push(`${file}: \`date: ${data.date}\` is not a valid date. Use an unquoted YYYY-MM-DD, e.g. \`date: 2026-08-05\`.`)
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
