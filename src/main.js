import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import { setupRouterScroller } from 'vue-router-better-scroller'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

// Styles
import '@unocss/reset/tailwind.css'
import '@shikijs/twoslash/style-rich.css'
// import 'shiki-magic-move/style.css'
import './assets/css/main.css'
import './assets/css/prose.css'
import './assets/css/markdown.css'
import 'uno.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
  },
  ({ router, isClient }) => {
    if (isClient) {
      const html = document.querySelector('html')
      if (!html)
        return
      setupRouterScroller(router, {
        selectors: {
          html(ctx) {
            // only do the sliding transition when the scroll position is not 0
            // Disable sliding transition on Dev Mode
            if (ctx.savedPosition?.top || import.meta.hot)
              html.classList.add('no-sliding')
            else
              html.classList.remove('no-sliding')
            return true
          },
        },
        behavior: 'auto',
      })

      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
