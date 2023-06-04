// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import FloatingVue from 'floating-vue'
import { NMessageProvider } from 'naive-ui'
import PixiJSContainer from './components/PixiJSContainer/index.vue'
import StackBlitzEmbed from './components/StackBlitzEmbed/index.vue'

import './main'

export default {
  ...Theme,
  Layout: () => {
    return h(NMessageProvider, null, [
      h(Theme.Layout, null, {
        // https://vitepress.dev/guide/extending-default-theme#layout-slots
      }),
    ])
  },
  enhanceApp({ app }) {
    app.component('DemoContainer', PixiJSContainer)
    app.component('StackBlitzEmbed', StackBlitzEmbed)
    app.use(FloatingVue)
  },
}
