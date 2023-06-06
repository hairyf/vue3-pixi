/* eslint-disable vue/one-component-per-file */
import type { App, PropType } from 'vue'
import { createApp, defineComponent, getCurrentInstance, h, inject, onMounted, onUnmounted, ref } from 'vue'

import { appInjectKey } from 'vue3-pixi'
import { inheritParent } from '../utils'

const External = defineComponent({
  props: {
    tag: String as PropType<keyof HTMLElementTagNameMap>,
    root: Object as PropType<HTMLElement>,
  },
  setup(props, { slots, attrs }) {
    const { appContext } = getCurrentInstance()!
    const element = document.createElement('div')
    const pixiApp = ref(inject(appInjectKey)!)
    const childApp = ref<App>()

    const root = props.root || pixiApp.value.view.parentNode as HTMLElement

    function mount() {
      if (!root)
        throw new Error('could not find root')

      const app = createApp({
        render: () => h(props.tag || 'div', attrs, slots),
      })

      inheritParent(app, appContext)

      app.mount(element)

      root.appendChild(element.firstChild!)
      childApp.value = app
    }

    function unmount() {
      if (!childApp.value)
        return

      childApp.value.unmount()
      childApp.value = undefined
    }

    onMounted(mount)
    onUnmounted(unmount)
    return () => null
  },
})

export default External
