/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from 'vitepress'
import unocss from 'unocss/vite'
import markdownItVitepressDemo from 'markdown-it-vitepress-demo'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 Pixi',
  description: 'Vue Renderer for PixiJS',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

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
})
