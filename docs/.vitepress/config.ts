/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from 'vitepress'
import unocss from 'unocss/vite'
import markdownItVitepressDemo from 'markdown-it-vitepress-demo'
import { compilerOptions } from '../../packages/renderer/src/compiler'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 Pixi',
  description: 'Vue Renderer for PixiJS',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Docs',
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Elements', link: '/guide/elements/' },
          { text: 'Composition API', link: '/guide/composition-api/' },
        ],
      },
      { text: 'Examples', link: '/examples/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Usage', link: '/guide/usage' },
          ],
        },
        {
          text: 'Elements',
          items: [
            { text: 'AnimatedSprite', link: '/guide/elements/animated-sprite/' },
            { text: 'ParticleContainer', link: '/guide/elements/particle-container/' },
            { text: 'BitmapText', link: '/guide/elements/bitmap-text/' },
            { text: 'Container', link: '/guide/elements/container/' },
            { text: 'Graphics', link: '/guide/elements/graphics/' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'Application', link: '/guide/components/application/' },
          ],
        },
        {
          text: 'Composition API',
          items: [],
        },
      ],
      '/examples/': [
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },

  markdown: {
    config(md) {
      md.use(markdownItVitepressDemo)
    },
  },
  vite: {
    plugins: [
      // @ts-expect-error
      unocss({}),
    ],
    ssr: {
      noExternal: ['naive-ui'],
    },
  },

  vue: {
    template: { compilerOptions },
  },
})
