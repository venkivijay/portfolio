import { dirname } from 'node:path'
import fg from 'fast-glob'
import { Feed } from 'feed'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { absoluteUrl, canonicalUrl, LOCALES, parseDate, resolveLocale, site } from '../src/site.config.js'

const AUTHOR = {
  name: site.name,
  email: site.email,
  link: site.url,
}

const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function run() {
  await buildBlogRSS()
}

async function readPosts() {
  // Recursive, because the router and the sitemap both treat pages/posts/**
  // as posts; a flat glob silently dropped anything under posts/2026/.
  // Only `/index.md` is the listing page — matching the substring "index"
  // anywhere in the path used to drop posts like `indexing-logs.md`.
  const files = (await fg('pages/posts/**/*.md')).filter(file => file !== 'pages/posts/index.md')

  const posts = await Promise.all(files.map(async (file) => {
    const { data, content } = matter(await fs.readFile(file, 'utf-8'))

    // Drafts are unfinished: never mail them to subscribers.
    if (data.draft)
      return null

    const date = parseDate(data.date)
    if (!date) {
      console.warn(`[rss] skipping ${file}: missing or invalid \`date\``)
      return null
    }

    // Every relative src, not just the first — String.replace with a string
    // pattern only replaces one occurrence, so later images stayed relative
    // and broke in feed readers.
    const html = markdown.render(content)
      .replace(/src="\//g, `src="${site.url}/`)
      .replace(/href="\//g, `href="${site.url}/`)

    const image = absoluteUrl(data.image)

    return {
      ...data,
      image,
      date,
      lang: resolveLocale(data.lang),
      content: html,
      author: [AUTHOR],
      link: canonicalUrl(file.replace(/^pages(.+)\.md$/, '$1')),
    }
  }))

  return posts
    .filter(Boolean)
    .sort((a, b) => +b.date - +a.date)
}

async function buildBlogRSS() {
  const posts = await readPosts()

  // The default feed carries every language so nothing is ever silently
  // missing from it; per-language feeds exist for readers who want just one.
  await writeFeed('feed', posts, null)

  // Written for every configured locale even when it has no posts yet:
  // index.html advertises these URLs for autodiscovery, and pointing a feed
  // reader at a 404 is worse than handing it an empty feed that fills in.
  for (const lang of Object.keys(LOCALES))
    await writeFeed(`feed.${lang}`, posts.filter(post => post.lang === lang), lang)

  console.log(`[rss] ${posts.length} posts -> feed.xml${posts.length ? ` (${[...new Set(posts.map(p => p.lang))].join(', ')})` : ''}`)
}

async function writeFeed(name, items, lang) {
  // The combined feed carries every language, so it asserts none.
  const suffix = lang ? ` (${LOCALES[lang].label})` : ''

  const feed = new Feed({
    title: `${site.name}${suffix}`,
    description: `${site.name}'s Blog${suffix}`,
    // Atom requires a feed id unique to that feed; sharing one lets
    // aggregators collapse the three into a single subscription.
    id: `${site.url}/${name}.xml`,
    link: `${site.url}/`,
    ...(lang ? { language: lang } : {}),
    copyright: `CC BY-NC-SA 4.0 2021-${new Date().getFullYear()} © ${site.name}`,
    feedLinks: {
      json: `${site.url}/${name}.json`,
      atom: `${site.url}/${name}.atom`,
      rss: `${site.url}/${name}.xml`,
    },
    author: AUTHOR,
    image: `${site.url}/logo.png`,
    favicon: `${site.url}/logo.png`,
  })

  items.forEach(item => feed.addItem(item))

  await fs.ensureDir(dirname(`./dist/${name}`))
  await fs.writeFile(`./dist/${name}.xml`, feed.rss2(), 'utf-8')
  await fs.writeFile(`./dist/${name}.atom`, feed.atom1(), 'utf-8')
  await fs.writeFile(`./dist/${name}.json`, feed.json1(), 'utf-8')
}

run()
