// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import FloatingVue from 'floating-vue'
import { NMessageProvider } from 'naive-ui'
import { Assets } from 'vue3-pixi'
import PixiJSContainer from './components/PixiJSContainer/index.vue'
import MountProvider from './components/MountProvider/index.vue'
import StackBlitzEmbed from './components/StackBlitzEmbed/index.vue'
import DraggableCircle from './components/Sites/DraggableCircle.vue'
import ApiTyping from './components/ApiTyping/index.vue'
import ApiPoint from './components/Markdown/ApiPoint.md'
import ApiColor from './components/Markdown/ApiColor.md'
import ApiBlendMode from './components/Markdown/ApiBlendMode.md'
import ApiDrawMode from './components/Markdown/ApiDrawMode.md'

import './main'

function inlineComponent(Component: any) {
  return () => h(Component, { class: 'inline-component' })
}

if (typeof document === 'undefined')
  globalThis.document = {} as any

export default {
  ...Theme,
  Layout: () => {
    return h(NMessageProvider, null,
      [
        h(MountProvider, null, [
          h(Theme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
          }),
        ]),

      ],
    )
  },
  enhanceApp({ app }) {
    app.component('Assets', Assets)
    app.component('DemoContainer', PixiJSContainer)
    app.component('StackBlitzEmbed', StackBlitzEmbed)
    app.component('DraggableCircle', DraggableCircle)
    app.component('ApiTyping', ApiTyping)
    app.component('ApiPoint', inlineComponent(ApiPoint))
    app.component('ApiColor', inlineComponent(ApiColor))
    app.component('ApiBlendMode', inlineComponent(ApiBlendMode))
    app.component('ApiDrawMode', inlineComponent(ApiDrawMode))
    app.use(FloatingVue)
  },
}
