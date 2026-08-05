/**
 * Single source of truth for site-wide metadata.
 * Consumed by the app at runtime (App.vue) and by the build scripts
 * (scripts/rss.js, scripts/sitemap.js, scripts/validate-posts.js).
 */
export const site = {
  url: 'https://venkivijay.com',
  name: 'Venki Vijay',
  title: 'Venki Vijay | DevOps Engineer',
  jobTitle: 'Senior DevOps Engineer',
  description: 'Venki Vijay\'s Portfolio - DevOps Engineer passionate about building innovative solutions',
  // Social sharing card, 1200x630.
  image: 'https://venkivijay.com/og.png',
  // Schema.org Person.image. Google expects an actual photo of the person
  // here; the OG banner is a stand-in until a headshot is added.
  photo: 'https://venkivijay.com/og.png',
  email: 'venkivijay@hotmail.com',
  sameAs: [
    'https://github.com/venkivijay',
    'https://linkedin.com/in/venkivijay',
    'https://www.instagram.com/venki.vj',
  ],
  worksFor: {
    name: 'Protium',
    url: 'https://protium.co.in',
  },
}

/**
 * Languages posts may be written in. A post's `lang` frontmatter selects one;
 * omitting it means DEFAULT_LOCALE, so a missing key can never drop a post
 * out of a feed or listing.
 */
export const LOCALES = {
  en: { label: 'English', ogLocale: 'en_US' },
  ta: { label: 'தமிழ்', ogLocale: 'ta_IN' },
}

export const DEFAULT_LOCALE = 'en'

export function resolveLocale(lang) {
  return LOCALES[lang] ? lang : DEFAULT_LOCALE
}

/**
 * Absolute, canonical URL for a router path.
 * Trailing slashes are stripped so `/chat` and `/chat/` collapse to one URL.
 */
export function canonicalUrl(path) {
  return `${site.url}${path.replace(/\/+$/, '') || '/'}`
}

/**
 * Absolutise a possibly root-relative asset path. Open Graph and Twitter both
 * require absolute URLs, and a relative one means no preview card at all.
 */
export function absoluteUrl(url) {
  if (!url)
    return url
  return url.startsWith('/') ? `${site.url}${url}` : url
}

/**
 * Parse a frontmatter date, which reaches us as a Date from gray-matter on the
 * server and as an ISO string from serialised route meta in the browser.
 * Returns null rather than throwing on garbage input.
 */
export function parseDate(value) {
  if (!value)
    return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}
