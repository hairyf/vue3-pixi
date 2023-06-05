// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import FloatingVue from 'floating-vue'
import { NMessageProvider, NScrollbar, useMessage } from 'naive-ui'
import PixiJSContainer from './components/PixiJSContainer/index.vue'
import StackBlitzEmbed from './components/StackBlitzEmbed/index.vue'
import DraggableCircle from './components/Sites/DraggableCircle.vue'

import './main'

export default {
  ...Theme,
  Layout: () => {
    return h(NMessageProvider, null,
      [
        h(NScrollbar, { style: 'max-height: 100vh' }, [
          h(Theme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
          }),
        ]),
      ],
    )
  },
  enhanceApp({ app }) {
    app.component('DemoContainer', PixiJSContainer)
    app.component('StackBlitzEmbed', StackBlitzEmbed)
    app.component('DraggableCircle', DraggableCircle)
    app.use(FloatingVue)
  },
}
