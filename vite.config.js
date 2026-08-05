import { resolve } from 'node:path'
import MarkdownItShiki from '@shikijs/markdown-it'
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight } from '@shikijs/transformers'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import UnoCSS from '@unocss/vite'
import Vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import MarkdownItMagicLink from 'markdown-it-magic-link'
import TOC from 'markdown-it-table-of-contents'

import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import { slugify } from './scripts/slugify'

export default defineConfig({
  plugins: [
    UnoCSS(),
    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
      // logs: true,
      extendRoute(route) {
        const path = route.components.get('default')
        if (!path || !path.endsWith('.md'))
          return

        const { data } = matter(fs.readFileSync(path, 'utf-8'))
        // `projects` is a large content blob the page renders from its own
        // frontmatter, so it is stripped rather than shipped in route meta —
        // but the page still needs its title/description there for the
        // canonical, robots and JSON-LD tags built in App.vue.
        const { projects: _projects, ...frontmatter } = data
        route.addToMeta({ frontmatter })
      },
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      wrapperComponent: 'WrapperPost',
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownItSetup(md) {
        md.use(await MarkdownItShiki({
          themes: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
          },
          defaultColor: false,
          cssVariablePrefix: '--s-',
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
          ],
        }))

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            // aria-hidden on a focusable element is a WCAG violation: keyboard
            // users land on an anchor that screen readers have been told to
            // ignore. Take it out of the tab order instead.
            renderAttrs: () => ({ 'aria-hidden': 'true', 'tabindex': '-1' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: link => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })

        md.use(MarkdownItMagicLink, {
          // imageUrl is always set explicitly: without it the plugin falls back
          // to favicon.yandex.net, which leaks visitors to a third party and
          // blocks the load event on the pages these links appear on.
          linksMap: {
            'Protium': { link: 'https://protium.co.in', imageUrl: '/icons/protium.jpg' },
            'Social Links': { link: 'https://links.venkivijay.com', imageUrl: '/icons/links.ico' },
          },
          imageOverrides: [],
        })
      },
    }),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
      ],
    }),
    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),
  ],
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
    ],
    exclude: [
      'CSS2DObject',
      'CSS2DRenderer',
      'TrackballControls',
    ],
  },
  ssgOptions: {
    formatting: 'minify',
    // Drop parameterised routes (they have no concrete URL to prerender) and
    // emit the catch-all as dist/404.html so Netlify can serve a real 404
    // instead of rewriting unknown paths to the homepage with a 200.
    includedRoutes(paths) {
      return [...paths.filter(path => !/[:*]/.test(path)), '/404']
    },
  },
})
