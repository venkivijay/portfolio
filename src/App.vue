<script setup>
import { useHead } from '@unhead/vue'
import { canonicalUrl, site } from '~/site.config'

const route = useRoute()

const frontmatter = computed(() => route.meta?.frontmatter ?? {})
const canonical = computed(() => canonicalUrl(route.path))
const ogImage = computed(() => frontmatter.value.image ?? site.image)
// Posts carry a date; everything else is a plain page.
const ogType = computed(() => (frontmatter.value.date ? 'article' : 'website'))

// Pages opt out of indexing with `noindex: true` in their frontmatter.
// `follow` is kept so link equity still flows out of them.
const robots = computed(() => (frontmatter.value.noindex ? 'noindex, follow' : 'index, follow'))

/**
 * Person is the entity that matters for personal branding: it is what feeds
 * Google's Knowledge Graph and what LLMs extract when asked about me.
 * It is defined in full on the homepage (which is the ProfilePage) and
 * referenced by @id elsewhere.
 */
const jsonLd = computed(() => {
  const isHome = route.path === '/'
  const personId = `${site.url}/#person`
  const websiteId = `${site.url}/#website`

  const person = {
    '@type': 'Person',
    '@id': personId,
    'name': site.name,
    'url': site.url,
    'image': site.image,
    'email': `mailto:${site.email}`,
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
  const skills = frontmatter.value.skills
  if (isHome && Array.isArray(skills))
    person.knowsAbout = skills.map(s => s.name)

  const graph = [
    person,
    {
      '@type': 'WebSite',
      '@id': websiteId,
      'url': site.url,
      'name': site.name,
      'description': site.description,
      'inLanguage': site.lang,
      'publisher': { '@id': personId },
    },
    {
      '@type': isHome ? 'ProfilePage' : 'WebPage',
      'url': canonical.value,
      'name': frontmatter.value.title ?? site.title,
      'isPartOf': { '@id': websiteId },
      'about': { '@id': personId },
      ...(isHome ? { mainEntity: { '@id': personId } } : {}),
    },
  ]

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
})

useHead({
  link: [
    { rel: 'canonical', href: canonical },
  ],
  meta: [
    { name: 'robots', content: robots },
    { property: 'og:url', content: canonical },
    { property: 'og:type', content: ogType },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: site.locale },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  script: [
    { type: 'application/ld+json', innerHTML: jsonLd },
  ],
})
</script>

<template>
  <Header />
  <main class="px-7 py-10 of-x-hidden">
    <RouterView />
    <Footer />
  </main>
</template>
