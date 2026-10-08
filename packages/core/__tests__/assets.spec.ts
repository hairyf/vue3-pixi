import { flushPromises } from '@vue/test-utils'
import { Assets as PixiAssets } from 'pixi.js'
import { afterEach, expect, it, vi } from 'vitest'
import { createApp, h } from 'vue-demi'
import { AssetsBundle } from '../src/components/assets'

const manifest = {
  bundles: [{ name: 'load-screen', assets: [{ alias: 'flowerTop', src: 'flowerTop.png' }] }],
}

afterEach(() => vi.restoreAllMocks())

it.each([manifest, '/manifest.json'])('registers manifest bundles after other assets have initialized the manager (%j)', async (input) => {
  const init = vi.spyOn(PixiAssets, 'init').mockResolvedValue(undefined)
  const load = vi.spyOn(PixiAssets, 'load').mockResolvedValue(manifest)
  const addBundle = vi.spyOn(PixiAssets, 'addBundle').mockImplementation(() => {})
  const loadBundle = vi.spyOn(PixiAssets, 'loadBundle').mockResolvedValue({ flowerTop: 'texture' })
  const container = document.createElement('div')
  const app = createApp({
    render: () => h(AssetsBundle, { manifest: input, entry: 'load-screen' }, {
      default: ({ data }: { data: { flowerTop: string } }) => h('span', data.flowerTop),
    }),
  })
  app.mount(container)

  await flushPromises()

  expect(init).not.toHaveBeenCalled()
  expect(addBundle).toHaveBeenCalledWith('load-screen', manifest.bundles[0].assets)
  expect(loadBundle).toHaveBeenCalledWith('load-screen', expect.any(Function))
  expect(container.textContent).toBe('texture')
  if (typeof input === 'string')
    expect(load).toHaveBeenCalledWith(input)
  app.unmount()
})

it('renders the error slot instead of dereferencing missing bundle data on load failure', async () => {
  const failure = new Error('asset unavailable')
  const onError = vi.fn()
  vi.spyOn(PixiAssets, 'loadBundle').mockRejectedValue(failure)
  const container = document.createElement('div')
  const app = createApp({
    render: () => h(AssetsBundle, { entry: 'load-screen', onError }, {
      default: ({ data }: { data: { flowerTop: string } }) => h('span', data.flowerTop),
      error: ({ error }: { error: Error }) => h('span', error.message),
    }),
  })
  app.mount(container)

  await flushPromises()

  expect(onError).toHaveBeenCalledWith(failure)
  expect(container.textContent).toBe('asset unavailable')
  app.unmount()
})
