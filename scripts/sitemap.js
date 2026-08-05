import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import { site } from '../src/site.config.js'

/**
 * The sitemap is derived from the prerendered HTML rather than from the page
 * filenames: the rendered pages are the only accurate record of what actually
 * ships, they cover `.vue` pages and custom paths too, and each one already
 * carries the canonical URL and robots directive the app decided on. Deriving
 * it any other way lets the sitemap drift from what crawlers are told.
 */
function extract(html) {
  const meta = name => html.match(new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`))?.[1]
    ?? html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${name}"`))?.[1]

  return {
    url: html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/)?.[1],
    robots: meta('robots') ?? '',
    title: html.match(/<title>(.*?)<\/title>/s)?.[1],
    description: meta('description'),
    published: meta('article:published_time'),
    modified: meta('article:modified_time'),
  }
}

async function collectPages() {
  const files = await fg('dist/**/*.html')

  const pages = await Promise.all(files.map(async (file) => {
    const html = await fs.readFile(file, 'utf-8')
    return extract(html)
  }))

  // A page without a canonical is one the app marked noindex, so it is
  // excluded here by the same signal rather than by a second, drifting rule.
  return pages
    .filter(page => page.url && !page.robots.includes('noindex'))
    .sort((a, b) => {
      if (a.url === `${site.url}/`)
        return -1
      if (b.url === `${site.url}/`)
        return 1
      return a.url.localeCompare(b.url)
    })
}

function buildSitemap(pages) {
  const urls = pages.map((page) => {
    const stamp = page.modified ?? page.published
    const lastmod = stamp ? `\n    <lastmod>${stamp.slice(0, 10)}</lastmod>` : ''
    return `  <url>\n    <loc>${page.url}</loc>${lastmod}\n  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/**
 * llms.txt — a plain-text summary for AI crawlers and assistants.
 * @see https://llmstxt.org
 */
async function buildLlmsTxt(pages) {
  const { data: home } = matter(await fs.readFile('pages/index.md', 'utf-8'))
  const skills = (home.skills ?? []).map(skill => skill.name)

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.jobTitle} — ${site.description}`,
    '',
    `${site.name} is a ${site.jobTitle} working on secure, scalable and cost-effective cloud architecture on AWS, infrastructure as code, platform engineering and GenAI infrastructure. Currently leading cloud initiatives at ${site.worksFor.name}.`,
    '',
  ]

  if (skills.length)
    lines.push('## Skills', '', skills.join(', '), '')

  // Posts are the pages that carry a published date.
  const posts = pages.filter(page => page.published)
  const rest = pages.filter(page => !page.published)

  const entry = page => `- [${page.title}](${page.url})${page.description ? `: ${page.description}` : ''}`

  lines.push('## Pages', '', ...rest.map(entry), '')

  if (posts.length) {
    lines.push('## Writing', '')
    lines.push(...posts
      .sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''))
      .map(page => `${entry(page)} (${page.published.slice(0, 10)})`))
    lines.push('')
  }

  lines.push('## Contact', '', `- Email: ${site.email}`, ...site.sameAs.map(url => `- ${url}`), '')

  return lines.join('\n')
}

async function run() {
  const pages = await collectPages()
  await fs.ensureDir('dist')
  await fs.writeFile('dist/sitemap.xml', buildSitemap(pages), 'utf-8')
  await fs.writeFile('dist/llms.txt', await buildLlmsTxt(pages), 'utf-8')
  console.log(`[sitemap] ${pages.length} urls written to dist/sitemap.xml and dist/llms.txt`)
}

run()
