/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, markRaw, onMounted, onUnmounted, ref, renderSlot, warn, watch } from 'vue-demi'
import { throttle } from '@antfu/utils'
import { Application as _Application } from 'pixi.js'
import type { ColorSource, Container } from 'pixi.js'
import type { App, PropType } from 'vue-demi'
import { createApp } from '@vue-pixi/renderer'
import { appInjectKey } from '@vue-pixi/composables'

export interface ApplicationInst {
  canvas: HTMLCanvasElement
  app: _Application
}

const Application = defineComponent({
  props: {
    antialias: { type: Boolean, default: true },
    autoDensity: { type: Boolean, default: true },
    autoStart: { type: Boolean, default: true },
    background: [Number, String, Array] as PropType<ColorSource>,
    backgroundColor: [Number, String, Array] as PropType<ColorSource>,
    backgroundAlpha: { type: Number, default: 1 },
    clearBeforeRender: Boolean,
    forceCanvas: Boolean,
    alpha: Boolean,
    depth: Boolean,
    desynchronized: Boolean,
    failIfMajorPerformanceCaveat: Boolean,
    powerPreference: String as PropType<WebGLPowerPreference>,
    premultipliedAlpha: Boolean,
    preserveDrawingBuffer: Boolean,
    stencil: { type: Boolean, default: true },
    width: Number,
    height: Number,
    resolution: Number,
  },
  setup(props, { slots, expose }) {
    const canvas = ref<HTMLCanvasElement>()
    const pixiApp = ref()
    let app: App<Container> | undefined

    function mount() {
      const context = canvas.value?.getContext('webgl', props)

      if (!context)
        warn('could not crate webgl context')

      const inst = new _Application({ view: canvas.value, ...props })

      pixiApp.value = markRaw(inst)

      app = createApp({
        render: () => renderSlot(slots, 'default'),
      })
      app.provide(appInjectKey, pixiApp)
      app.mount(pixiApp.value.stage)
    }
    function unmount() {
      app?.unmount()
      app = undefined

      pixiApp.value?.destroy()
      pixiApp.value = undefined
    }
    function resize() {
      if (!pixiApp.value)
        return
      const width = props.width || pixiApp.value.renderer.width
      const height = props.height || pixiApp.value.renderer.height
      pixiApp.value.renderer.resize(width, height)
    }

    watch(
      () => [props.width, props.height],
      throttle(50, resize),
    )
    onMounted(mount)
    onUnmounted(unmount)

    expose({ canvas, app: pixiApp })

    return () => h('canvas', { ref: canvas })
  },
})

export default Application
