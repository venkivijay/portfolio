/**
 * Single source of truth for site-wide metadata.
 * Consumed by the app at runtime (App.vue) and by the build scripts
 * (scripts/sitemap.js, scripts/rss.js).
 */
export const site = {
  url: 'https://venkivijay.com',
  name: 'Venki Vijay',
  title: 'Venki Vijay | DevOps Engineer',
  jobTitle: 'Senior DevOps Engineer',
  description: 'Venki Vijay\'s Portfolio - DevOps Engineer passionate about building innovative solutions',
  image: 'https://venkivijay.com/og.png',
  email: 'venkivijay@hotmail.com',
  locale: 'en_US',
  lang: 'en',
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
 * Absolute, canonical URL for a router path.
 * Trailing slashes are stripped so `/chat` and `/chat/` collapse to one URL.
 */
export function canonicalUrl(path) {
  return `${site.url}${path.replace(/\/+$/, '') || '/'}`
}
