import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import { canonicalUrl, site } from '../src/site.config.js'

/**
 * Derive the router path for a page file, mirroring unplugin-vue-router's
 * file-based routing: pages/index.md -> /, pages/posts/index.md -> /posts.
 */
function toRoutePath(file) {
  const path = file
    .replace(/^pages/, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
  return path || '/'
}

async function collectPages() {
  const files = await fg('pages/**/*.md', { ignore: ['**/[[]*'] })

  const pages = await Promise.all(files.map(async (file) => {
    const { data } = matter(await fs.readFile(file, 'utf-8'))
    return {
      path: toRoutePath(file),
      url: canonicalUrl(toRoutePath(file)),
      title: data.title ?? site.name,
      description: data.description ?? '',
      date: data.date ?? null,
      noindex: Boolean(data.noindex),
      draft: Boolean(data.draft),
      isPost: file.startsWith('pages/posts/') && !file.endsWith('index.md'),
    }
  }))

  // Drafts and noindex pages are deliberately kept out of both artefacts:
  // a sitemap that lists pages we ask Google not to index is a mixed signal.
  return pages
    .filter(page => !page.noindex && !page.draft)
    .sort((a, b) => a.path.localeCompare(b.path))
}

function buildSitemap(pages) {
  const urls = pages.map((page) => {
    const lastmod = page.date
      ? `\n    <lastmod>${new Date(page.date).toISOString().slice(0, 10)}</lastmod>`
      : ''
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

  if (skills.length) {
    lines.push('## Skills', '', skills.join(', '), '')
  }

  const posts = pages.filter(page => page.isPost)
  const rest = pages.filter(page => !page.isPost)

  lines.push('## Pages', '')
  for (const page of rest)
    lines.push(`- [${page.title}](${page.url})${page.description ? `: ${page.description}` : ''}`)
  lines.push('')

  if (posts.length) {
    lines.push('## Writing', '')
    for (const page of posts)
      lines.push(`- [${page.title}](${page.url})${page.description ? `: ${page.description}` : ''}`)
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
