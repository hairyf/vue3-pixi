/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitepress'
import unocss from 'unocss/vite'
import markdownItVitepressDemo from 'markdown-it-vitepress-demo'
import { compilerOptions } from '../../packages/renderer/src/compiler'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 Pixi',
  description: 'Vue Renderer for PixiJS',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: 'Hairyf' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Docs',
        items: [
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'API Reference', link: '/guide/api-reference' },
          { text: 'Elements', link: '/guide/elements/animated-sprite/' },
          { text: 'Components', link: '/guide/components/application/' },
          { text: 'Composition API', link: '/guide/composition-api/on-tick/' },
        ],
      },
      // TODO
      // { text: 'Examples', link: '/examples/' },
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
          text: 'API Reference',
          items: [
            {
              text: 'Renderer',
              link: '/guide/api-reference/renderer',
            },
            {
              text: 'Props',
              link: '/guide/api-reference/props',
            },

            {
              text: 'Events',
              link: '/guide/api-reference/events',
            },
          ],
        },
        {
          text: 'Elements',
          items: [
            { text: 'AnimatedSprite', link: '/guide/elements/animated-sprite/' },
            { text: 'BitmapText', link: '/guide/elements/bitmap-text/' },
            { text: 'Container', link: '/guide/elements/container/' },
            { text: 'Graphics', link: '/guide/elements/graphics/' },
            { text: 'Mesh', link: '/guide/elements/mesh/' },
            { text: 'NineSlicePlane', link: '/guide/elements/nine-slice-plane/' },
            { text: 'ParticleContainer', link: '/guide/elements/particle-container/' },
            { text: 'SimplePlane', link: '/guide/elements/simple-plane/' },
            { text: 'SimpleRope', link: '/guide/elements/simple-rope/' },
            { text: 'Sprite', link: '/guide/elements/sprite/' },
            { text: 'TilingSprite', link: '/guide/elements/tiling-sprite/' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'Application', link: '/guide/components/application/' },
            { text: 'Transition', link: '/guide/components/transition/' },
            { text: 'Loader', link: '/guide/components/loader/' },
            { text: 'External', link: '/guide/components/external/' },
          ],
        },
        {
          text: 'Composition API',
          items: [
            { text: 'onTick', link: '/guide/composition-api/on-tick/' },
            { text: 'useApplication', link: '/guide/composition-api/use-application/' },
            { text: 'useRenderer', link: '/guide/composition-api/use-renderer/' },
            { text: 'useStage', link: '/guide/composition-api/use-stage/' },
            { text: 'useScreen', link: '/guide/composition-api/use-screen/' },
            { text: 'useTrack', link: '/guide/composition-api/use-track/' },
          ],
        },
      ],
      '/examples/': [
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hairyf/vue3-pixi' },
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
    resolve: {
      alias: [
        {
          // Ported from vuejs/vitepress#2347, thanks to @hooray
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPSwitchAppearance/index.vue', import.meta.url)),
        },
      ],
    },
  },

  vue: {
    template: { compilerOptions },
  },
})
