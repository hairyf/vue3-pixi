/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, inject, markRaw, onMounted, onUnmounted, ref, renderSlot, warn, watch } from 'vue-demi'
import { throttle } from '@antfu/utils'
import type { ColorSource, Container } from 'pixi.js'
import { Application } from 'pixi.js'
import type { App, PropType } from 'vue-demi'
import { createApp } from '../renderer'
import { appInjectKey } from '../composables/internal'

export interface StageInst {
  app?: Application
}

const Stage = defineComponent({
  props: {

    alpha: Boolean,
    antialias: { type: Boolean, default: true },
    depth: Boolean,
    desynchronized: Boolean,
    failIfMajorPerformanceCaveat: Boolean,
    powerPreference: String as PropType<WebGLPowerPreference>,
    premultipliedAlpha: Boolean,
    preserveDrawingBuffer: Boolean,
    stencil: { type: Boolean, default: true },

    width: Number,
    height: Number,
    background: [Number, String, Array] as PropType<ColorSource>,
    backgroundColor: [Number, String, Array] as PropType<ColorSource>,
    backgroundAlpha: { type: Number, default: 1 },
    resolution: Number,
  },
  setup(props, { slots }) {
    const canvas = ref<HTMLCanvasElement>()
    const pixiApp = injectApplication()
    let app: App<Container> | undefined

    function mount() {
      const context = canvas.value?.getContext('webgl', {
        alpha: props.alpha,
        antialias: props.antialias,
        depth: props.depth,
        desynchronized: props.desynchronized,
        failIfMajorPerformanceCaveat: props.failIfMajorPerformanceCaveat,
        powerPreference: props.powerPreference,
        premultipliedAlpha: props.premultipliedAlpha,
        preserveDrawingBuffer: props.preserveDrawingBuffer,
        stencil: props.stencil,
      })

      if (!context)
        warn('could not crate webgl context')

      const inst = new Application({
        view: canvas.value,
        width: props.width,
        height: props.height,
        background: props.background,
        backgroundColor: props.backgroundColor,
        backgroundAlpha: props.backgroundAlpha,
        resolution: props.resolution,
      })

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
      pixiApp.value.renderer.resize(
        props.width || pixiApp.value.renderer.width,
        props.height || pixiApp.value.renderer.height,
      )
    }

    watch(
      () => [props.width, props.height],
      throttle(50, resize),
    )

    onMounted(mount)

    onUnmounted(unmount)

    return { canvas, app: pixiApp }
  },
  render() {
    return h('canvas', { ref: 'canvas' })
  },
})

function injectApplication() {
  let pixiApp = inject(appInjectKey, ref())
  if (pixiApp?.value)
    pixiApp = ref()
  return pixiApp
}

export default Stage
