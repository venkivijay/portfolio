import { useDark } from '@vueuse/core'
import dayjs from 'dayjs'
import { nextTick } from 'vue'

export const isDark = useDark({
  // VueUse injects a global `*{transition:none!important}` stylesheet every
  // time it applies the colour mode, including once during hydration.
  // Inserting a stylesheet makes the engine re-resolve @keyframes, and a CSS
  // animation is bound to the keyframes rule object it started against — so
  // every running animation restarts. On a slow load the entrance animation
  // finished and then replayed from the top once the JS arrived.
  //
  // Nothing here needs the suppression: theme changes go through the View
  // Transitions API in toggleDark, which snapshots the old frame anyway.
  disableTransition: false,
})

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDark(event) {
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          // Without this the clip-path snaps back to unclipped the moment the
          // animation ends, a frame or two before the view transition tears
          // the snapshot down. Going light -> dark that repaints the whole old
          // light layer at full size: a white flash at the end of the sweep.
          fill: 'forwards',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}

export function formatDate(d, onlyDate = true) {
  // Frontmatter dates parse as UTC midnight. Formatting them in the viewer's
  // local zone shows the previous day for anyone west of UTC, contradicting
  // datePublished, the feed pubDate and the sitemap lastmod, which are all UTC.
  const utc = new Date(d)
  const date = dayjs(new Date(utc.getTime() + utc.getTimezoneOffset() * 60000))
  if (onlyDate || date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}
