// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import FloatingVue from 'floating-vue'
import { NMessageProvider } from 'naive-ui'
import PixiJSContainer from './components/PixiJSContainer/index.vue'

import 'floating-vue/dist/style.css'
import 'uno.css'
import './style.css'

FloatingVue.options.distance = 12
FloatingVue.options.themes.tooltip.delay.show = 100
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
    app.use(FloatingVue)
  },
}
