<script setup>
import { useHead } from '@unhead/vue'
import { canonicalUrl, LOCALES, parseDate, resolveLocale, site } from '~/site.config'

const route = useRoute()

const frontmatter = computed(() => route.meta?.frontmatter ?? {})
const canonical = computed(() => canonicalUrl(route.path))
const ogImage = computed(() => frontmatter.value.image ?? site.image)

// Anything with a date is a post; everything else is a plain page.
const published = computed(() => parseDate(frontmatter.value.date))
const isPost = computed(() => Boolean(published.value))
const updated = computed(() => parseDate(frontmatter.value.updated) ?? published.value)

const lang = computed(() => resolveLocale(frontmatter.value.lang))
const ogLocale = computed(() => LOCALES[lang.value].ogLocale)

// Drafts are unfinished work: keep them out of the index as well as out of the
// sitemap and feeds, so the three signals can never contradict each other.
const noindex = computed(() => Boolean(frontmatter.value.noindex || frontmatter.value.draft))

const personId = `${site.url}/#person`
const websiteId = `${site.url}/#website`

/**
 * Person is the entity that matters for personal branding: it is what feeds
 * Google's Knowledge Graph and what LLMs extract when asked about me.
 * It is defined in full on the homepage (which is the ProfilePage) and
 * referenced by @id elsewhere.
 */
function buildPerson(isHome, skills) {
  const person = {
    '@type': 'Person',
    '@id': personId,
    'name': site.name,
    'url': `${site.url}/`,
    'image': site.photo,
    'email': site.email,
    'jobTitle': site.jobTitle,
    'description': site.description,
    'sameAs': site.sameAs,
    'worksFor': {
      '@type': 'Organization',
      'name': site.worksFor.name,
      'url': site.worksFor.url,
    },
  }

  // Skills live in the homepage frontmatter; surface them as knowsAbout so the
  // stack is machine-readable rather than trapped in the 3D cloud.
  if (isHome && Array.isArray(skills))
    person.knowsAbout = skills.map(skill => skill.name)

  return person
}

const jsonLd = computed(() => {
  const fm = frontmatter.value
  const isHome = route.path === '/'
  const url = canonical.value

  const graph = [
    buildPerson(isHome, fm.skills),
    {
      '@type': 'WebSite',
      '@id': websiteId,
      'url': `${site.url}/`,
      'name': site.name,
      'description': site.description,
      'inLanguage': Object.keys(LOCALES),
      'publisher': { '@id': personId },
    },
  ]

  if (isPost.value) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      'url': url,
      'headline': fm.title,
      'description': fm.description,
      'datePublished': published.value.toISOString(),
      'dateModified': updated.value.toISOString(),
      'inLanguage': lang.value,
      'image': ogImage.value,
      'author': { '@id': personId },
      'publisher': { '@id': personId },
      'isPartOf': { '@id': websiteId },
      'mainEntityOfPage': { '@id': `${url}#webpage` },
    })
  }

  graph.push({
    '@type': isHome ? 'ProfilePage' : 'WebPage',
    '@id': `${url}#webpage`,
    'url': url,
    'name': fm.title ?? site.title,
    'description': fm.description,
    'inLanguage': lang.value,
    'isPartOf': { '@id': websiteId },
    'about': { '@id': personId },
    ...(isHome ? { mainEntity: { '@id': personId } } : {}),
  })

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
})

useHead(() => ({
  htmlAttrs: { lang: lang.value },
  // A canonical on a noindex page is a contradictory signal, so it is omitted
  // rather than pointing at a URL we are asking crawlers to drop.
  link: noindex.value
    ? []
    : [{ rel: 'canonical', href: canonical.value }],
  meta: [
    { name: 'robots', content: noindex.value ? 'noindex, follow' : 'index, follow' },
    { property: 'og:url', content: canonical.value },
    { property: 'og:type', content: isPost.value ? 'article' : 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: ogLocale.value },
    { property: 'og:image', content: ogImage.value },
    { name: 'twitter:image', content: ogImage.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(isPost.value
      ? [
          { property: 'article:published_time', content: published.value.toISOString() },
          { property: 'article:modified_time', content: updated.value.toISOString() },
          { property: 'article:author', content: site.name },
        ]
      : []),
  ],
  script: [
    { type: 'application/ld+json', innerHTML: jsonLd.value },
  ],
}))
</script>

<template>
  <Header />
  <main class="px-7 py-10 of-x-hidden">
    <RouterView />
    <Footer />
  </main>
</template>
