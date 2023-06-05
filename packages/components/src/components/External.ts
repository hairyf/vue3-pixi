/* eslint-disable vue/one-component-per-file */
import type { PropType } from 'vue'
import { createApp, defineComponent, getCurrentInstance, h, inject, ref } from 'vue'

import { appInjectKey } from 'vue3-pixi'
import { inheritParent } from '../utils'

const External = defineComponent({
  props: {
    tag: String as PropType<keyof HTMLElementTagNameMap>,
    root: Object as PropType<HTMLElement>,
  },
  setup(props, { slots, attrs }) {
    return () => {
      const instance = getCurrentInstance()
      const element = document.createElement('div')
      const pixiApp = ref(inject(appInjectKey)!)

      const root = props.root || pixiApp.value.view.parentNode

      const app = createApp({
        render: () => h(props.tag || 'div', attrs, slots),
      })

      inheritParent(app, instance?.appContext)

      root?.appendChild(element)
      app.mount(element)
    }
  },
})

export default External
