/* eslint-disable vue/one-component-per-file */
import { defineComponent, getCurrentInstance, h, markRaw, onMounted, onUnmounted, ref, renderSlot, warn, watch } from 'vue-demi'
import { throttle } from '@antfu/utils'
import { Application as _Application } from 'pixi.js'
import type { ColorSource, Container } from 'pixi.js'
import type { App, PropType } from 'vue-demi'
import { createApp } from '../../renderer'
import { appInjectKey } from '../../composables'
import { inheritParent } from '../../utils'

export interface ApplicationInst {
  canvas: HTMLCanvasElement
  app: _Application
}

export const Application = defineComponent({
  props: {
    antialias: { type: Boolean, default: true },
    autoDensity: { type: Boolean, default: true },
    autoStart: { type: Boolean, default: true },
    background: [Number, String, Array] as PropType<ColorSource>,
    backgroundColor: [Number, String, Array] as PropType<ColorSource>,
    backgroundAlpha: { type: Number, default: 1 },
    clearBeforeRender: { type: Boolean, default: true },
    forceCanvas: Boolean,
    alpha: Number,
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
    resizeTo: Object as PropType<HTMLElement | Window | undefined>,
    transferControlToOffscreen: Boolean,
  },
  setup(props, { slots, expose }) {
    const { appContext } = getCurrentInstance()!
    const canvas = ref<HTMLCanvasElement>()
    const pixiApp = ref()

    let app: App<Container> | undefined
    function mount() {
      let view: HTMLCanvasElement | OffscreenCanvas | undefined = canvas.value
      if (props.transferControlToOffscreen)
        view = canvas.value?.transferControlToOffscreen() as OffscreenCanvas

      const context = view?.getContext('webgl', {
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

      const params = { ...props } as { [key: string]: any }
      // delete params.autoDensity

      const inst = new _Application({ view, ...params })

      inst.view.width = params.width
      inst.view.height = params.height

      pixiApp.value = markRaw(inst)

      app = createApp({
        render: () => renderSlot(slots, 'default'),
      })

      inheritParent(app, appContext)

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

