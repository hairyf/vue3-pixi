/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, onBeforeUnmount, onMounted, ref, renderSlot, warn, watch } from 'vue-demi'
import type { Container } from 'pixi.js'
import { Application } from 'pixi.js'
import type { App, PropType } from 'vue-demi'
import { createApp } from '../renderer'

const State = defineComponent({
  props: {
    width: Number,
    height: Number,

    alpha: Boolean,
    antialias: {
      type: Boolean,
      default: true,
    },
    depth: Boolean,
    desynchronized: Boolean,
    failIfMajorPerformanceCaveat: Boolean,
    powerPreference: String as PropType<WebGLPowerPreference>,
    premultipliedAlpha: Boolean,
    preserveDrawingBuffer: Boolean,
    stencil: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const canvas = ref<HTMLCanvasElement>()
    let pixiApp: Application | undefined
    let app: App<Container> | undefined
    onMounted(() => {
      const context = canvas.value?.getContext('webgl', {
        alpha: props.alpha,
        antialias: props.antialias,
        depth: props.depth,
        desynchronized: props.desynchronized,
        failIfMajorPerformanceCaveat: props.failIfMajorPerformanceCaveat,
        premultipliedAlpha: props.premultipliedAlpha,
        preserveDrawingBuffer: props.preserveDrawingBuffer,
        stencil: props.stencil,
      })
      if (!context)
        warn('could not crate webgl context')

      pixiApp = new Application({
        view: canvas.value,
        width: props.width,
      })

      app = createApp({
        render: () => renderSlot(slots, 'default'),
      })

      app.mount(pixiApp.stage)
    })

    onBeforeUnmount(() => {
      app?.unmount()
      app = undefined

      pixiApp?.destroy()
      pixiApp = undefined
    })
    watch(
      () => [props.width, props.height],
      () => pixiApp?.resize(),
    )
    return () => h('canvas', { ref: canvas })
  },
})

export default State
