import { describe, expect, it, vi } from 'vitest'
import { Container, Texture } from 'pixi.js'
import { nextTick } from 'vue-demi'
import { patchProp } from '../src'

const textureURL = 'https://beta.pixijs.com/assets/bunny.png'

describe('props', () => {
  it('should patch render prop', () => {
    const el = { on: vi.fn() }
    const nextValue = vi.fn()
    patchProp(el, 'onRender', null, nextValue)

    expect(el.on).toBeCalled()
    expect(el.on.mock.calls[0][0]).toBe('destroyed')
    expect(el.on.mock.calls[0][1]).toBeInstanceOf(Function)
    expect(nextValue).toBeCalled()
  })

  it('should patch texture string prop', async () => {
    const el = { texture: null }

    patchProp(el, 'texture', null, textureURL)
    patchProp(el, 'texture', null, textureURL)

    await nextTick()

    expect(el.texture).toBeInstanceOf(Texture)
  })

  it('should patch texture object prop', async () => {
    const el = { texture: null }

    const texture = Texture.from(textureURL)

    patchProp(el, 'texture', null, texture)
    patchProp(el, 'texture', null, texture)

    await nextTick()

    expect(el.texture).toEqual(texture)
  })

  it('should patch boolean prop', () => {
    const el = { accessible: false, visible: false }

    patchProp(el, 'accessible', null, true)
    patchProp(el, 'visible', null, '')

    expect(el.accessible).toBe(true)
    expect(el.visible).toBe(true)
  })

  it('should patch point prop', async () => {
    const el = new Container()

    patchProp(el, 'position', null, {})
    patchProp(el, 'position', null, { x: 3, y: 4 })

    await nextTick()

    expect(el.position.x).toBe(3)
    expect(el.position.y).toBe(4)

    patchProp(el, 'position', null, [1, 2])

    await nextTick()

    expect(el.position.x).toBe(1)
    expect(el.position.y).toBe(2)

    patchProp(el, 'position', null, 100)

    await nextTick()

    expect(el.position.x).toBe(100)
    expect(el.position.y).toBe(100)
  })

  it('should patch event prop', () => {
    const el = { on: vi.fn() }
    const nextValue = vi.fn()

    patchProp(el, 'onClick', null, nextValue)

    expect(el.on).toBeCalledWith('click', nextValue)
  })
})
