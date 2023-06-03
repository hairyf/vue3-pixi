// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import PixiJSContainer from './components/PixiJSContainer/index.vue'
import 'uno.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('DemoContainer', PixiJSContainer)
    app.use(FloatingVue)
  },
}
