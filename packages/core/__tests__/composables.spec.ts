import { Rectangle, Ticker } from 'pixi.js'
import { describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref } from 'vue-demi'
import { useTrack } from '../src/composables/useTrack'
import { useApplication } from '../src/composables/useApplication'
import { useRenderer } from '../src/composables/useRenderer'
import { useStage } from '../src/composables/useStage'
import { useScreen } from '../src/composables/useScreen'
import { onReady } from '../src/composables/onReady'
import { appInjectKey } from '../src/composables/internal'

describe('onTick', () => {
  it('should add and remove callbacks from ticker', () => {
    const ticker = Ticker.shared
    const fn = vi.fn()

    ticker.add(fn)
    expect(fn).not.toBeCalled()

    ticker.update()
    expect(fn).toBeCalled()

    ticker.remove(fn)
    fn.mockClear()
    ticker.update()
    expect(fn).not.toBeCalled()
  })

  it('should use ticker.deltaTime in v8 callback signature', () => {
    const ticker = Ticker.shared
    let receivedTicker: Ticker | undefined

    const fn = (t: Ticker) => {
      receivedTicker = t
    }
    ticker.add(fn)
    ticker.update()
    ticker.remove(fn)

    expect(receivedTicker).toBe(ticker)
    expect(typeof receivedTicker!.deltaTime).toBe('number')
  })
})

describe('useTrack', () => {
  it('returns target[key] value via customRef', () => {
    const target = ref({ count: 42 })
    const tracked = useTrack(target, 'count' as any)
    expect(tracked.value).toBe(42)
  })

  it('setting .value updates target[key]', () => {
    const target = ref({ count: 42 })
    const tracked = useTrack(target, 'count' as any)
    tracked.value = 99
    expect(target.value.count).toBe(99)
  })

  it('returns defaultValue when target is undefined', () => {
    const target = ref(undefined as any)
    const tracked = useTrack(target, 'count' as any, 10)
    expect(tracked.value).toBe(10)
  })
})

describe('useApplication', () => {
  it('returns injected app ref', async () => {
    const mockApp = { stage: {}, renderer: {}, screen: new Rectangle() }
    let result: any

    const Child = defineComponent({
      setup() {
        result = useApplication()
        return () => h('div')
      },
    })

    const app = createApp({
      setup() {
        return () => h(Child)
      },
    })
    app.provide(appInjectKey, mockApp as any)
    app.mount(document.createElement('div'))

    await nextTick()
    expect(result.value).toStrictEqual(mockApp)
    app.unmount()
  })

  it('unwraps .app property if present', async () => {
    const innerApp = { stage: {}, renderer: {} }
    const wrappedApp = { app: innerApp }
    let result: any

    const Child = defineComponent({
      setup() {
        result = useApplication()
        return () => h('div')
      },
    })

    const app = createApp({
      setup() {
        return () => h(Child)
      },
    })
    app.provide(appInjectKey, wrappedApp as any)
    app.mount(document.createElement('div'))

    await nextTick()
    expect(result.value).toStrictEqual(innerApp)
    app.unmount()
  })
})

describe('useRenderer', () => {
  it('returns computed .renderer from app', () => {
    const mockRenderer = { type: 'webgl' }
    const appRef = ref({ renderer: mockRenderer } as any)

    const renderer = useRenderer(appRef)
    expect(renderer.value).toStrictEqual(mockRenderer)
  })
})

describe('useStage', () => {
  it('returns computed .stage from app', () => {
    const mockStage = { children: [] }
    const appRef = ref({ stage: mockStage } as any)

    const stage = useStage(appRef)
    expect(stage.value).toStrictEqual(mockStage)
  })
})

describe('useScreen', () => {
  it('returns app.screen rectangle', () => {
    const mockScreen = new Rectangle(0, 0, 800, 600)
    const appRef = ref({ screen: mockScreen, canvas: document.createElement('canvas') } as any)

    const screen = useScreen(appRef)
    expect(screen.value).toStrictEqual(mockScreen)
  })

  it('returns default Rectangle when app is undefined', () => {
    const appRef = ref(undefined as any)

    const screen = useScreen(appRef)
    expect(screen.value).toBeInstanceOf(Rectangle)
    expect(screen.value.width).toBe(0)
  })
})

describe('onReady', () => {
  it('calls callback immediately when app is available', async () => {
    const mockApp = { stage: {}, renderer: {} }
    const callback = vi.fn()

    const Child = defineComponent({
      setup() {
        onReady(callback)
        return () => h('div')
      },
    })

    const app = createApp({
      setup() {
        return () => h(Child)
      },
    })
    app.provide(appInjectKey, mockApp as any)
    app.mount(document.createElement('div'))

    // onReady fires synchronously when app is already available
    expect(callback).toHaveBeenCalledWith(mockApp)
    app.unmount()
  })
})
