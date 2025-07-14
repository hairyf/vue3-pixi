/* eslint-disable ts/no-redeclare */
import type { ColorSource, Container, GpuPowerPreference } from 'pixi.js'
import type { App, PropType } from 'vue-demi'
import { Application as PixiApplication } from 'pixi.js'
import { defineComponent, getCurrentInstance, h, markRaw, onMounted, onUnmounted, ref, renderSlot } from 'vue-demi'
import { appInjectKey } from '../../composables'
import { createApp } from '../../renderer'
import { inheritParent } from '../../utils'

export interface Application {
  canvas: HTMLCanvasElement
  app: PixiApplication
}

export const Application = defineComponent({
  props: {
    antialias: { type: Boolean, default: undefined },
    autoDensity: { type: Boolean, default: undefined },
    autoStart: { type: Boolean, default: true },
    alpha: { type: Boolean, default: undefined },
    background: { type: Object as PropType<ColorSource> },
    backgroundColor: [Number, String, Array, Object] as PropType<ColorSource>,
    backgroundAlpha: { type: Number, default: 1 },
    clearBeforeRender: { type: Boolean, default: undefined },
    hello: { type: Boolean, default: undefined },
    textureGCActive: { type: Boolean, default: undefined },
    textureGCAMaxIdle: { type: Number, default: undefined },
    textureGCCheckCountMax: { type: Number, default: undefined },
    bezierSmoothness: { type: Number, default: undefined },
    premultipliedAlpha: { type: Boolean, default: undefined },
    preserveDrawingBuffer: { type: Boolean, default: undefined },
    forceFallbackAdapter: { type: Boolean, default: undefined },
    depth: { type: Boolean, default: undefined },
    failIfMajorPerformanceCaveat: { type: Boolean, default: undefined },
    powerPreference: { type: String as PropType<GpuPowerPreference>, default: undefined },
    resizeTo: Object as PropType<HTMLElement | Window | undefined>,
    roundPixels: { type: Boolean, default: undefined },
    useBackBuffer: { type: Boolean, default: undefined },
    width: { type: Number, default: undefined },
    height: { type: Number, default: undefined },
    resolution: { type: Number, default: 1 },

    // @TODO: Add webgl/webgpu
  },
  setup(props, { slots, expose }) {
    const { appContext } = getCurrentInstance()!
    const canvas = ref<HTMLCanvasElement>()
    const pixiApp = ref<PixiApplication>()

    let app: App<Container> | undefined

    async function mount() {
      const inst = new PixiApplication()
      await inst.init({ canvas: canvas.value, ...props })

      pixiApp.value = markRaw(inst)

      app = createApp({ render: () => renderSlot(slots, 'default') })

      inheritParent(app, appContext)

      app.provide(appInjectKey, pixiApp.value)
      app.mount(pixiApp.value.stage)
    }
    function unmount() {
      app?.unmount()
      app = undefined

      pixiApp.value?.destroy()
      pixiApp.value = undefined
    }
    onMounted(mount)
    onUnmounted(unmount)

    expose({ canvas, app: pixiApp })

    return () => h('canvas', { ref: canvas })
  },
})
