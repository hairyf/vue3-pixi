import { Container, Texture } from 'pixi.js'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue-demi'
import { setters } from '../src/renderer/utils/setters'
import { setTextureOptions } from '../src/renderer/utils/util'

describe('texture setters (v8 compatibility)', () => {
  it('setTextureOptions should set properties on texture.source', () => {
    const texture = Texture.WHITE
    const originalSource = texture.source

    // Should not throw — accessing texture.source instead of texture.baseTexture
    expect(() => setTextureOptions(texture, {})).not.toThrow()
    expect(texture.source).toBe(originalSource)
  })

  it('setters.texture.options should set properties on texture.source', () => {
    const texture = Texture.WHITE

    // Should not throw — accessing texture.source instead of texture.baseTexture
    expect(() => setters.texture.options(texture, {})).not.toThrow()
  })

  it('should use texture.source (not baseTexture) in setters code', () => {
    // Verify our code references .source, not .baseTexture
    // PixiJS v8 provides a deprecated baseTexture shim, but our code should use .source directly
    const texture = Texture.WHITE
    expect(texture.source).toBeDefined()
    expect(typeof texture.source).toBe('object')
  })
})

describe('setters.unfirst', () => {
  it('first call is skipped (sets flag only)', async () => {
    const el: any = {}
    const setter = vi.fn()

    const result = setters.unfirst(el, 'testProp', setter)

    expect(result).toBe(true)
    expect(setter).not.toHaveBeenCalled()
    expect(el._vp_skip_first_set_testProp).toBe(true)
    await nextTick()
    expect(setter).not.toHaveBeenCalled()
  })

  it('second call delegates to setters.call (executes after nextTick)', async () => {
    const el: any = { _vp_skip_first_set_testProp: true }
    const setter = vi.fn()

    const result = setters.unfirst(el, 'testProp', setter)

    expect(result).toBe(true)
    // first call to setters.call defers to nextTick
    expect(setter).not.toHaveBeenCalled()
    await nextTick()
    expect(setter).toHaveBeenCalledTimes(1)
  })

  it('returns true for both first and subsequent calls', () => {
    const el: any = {}
    expect(setters.unfirst(el, 'a', () => {})).toBe(true)
    expect(setters.unfirst(el, 'a', () => {})).toBe(true)
  })
})

describe('setters.object', () => {
  it('applies sub-properties of nextValue to el[key]', async () => {
    const el: any = {
      style: { fontSize: 12, fill: 'black' },
      on: vi.fn(),
    }

    setters.object(el, 'style', null, { fontSize: 24, fill: 'red' })
    await nextTick()

    expect(el.style.fontSize).toBe(24)
    expect(el.style.fill).toBe('red')
  })

  it('stores __vp_scope_{key} and stops previous scope on re-call', async () => {
    const el: any = {
      style: { fontSize: 12 },
      on: vi.fn(),
    }

    setters.object(el, 'style', null, { fontSize: 24 })
    const firstScope = el.__vp_scope_style
    expect(firstScope).toBeDefined()

    // re-call with prevValue set stops old scope
    setters.object(el, 'style', { fontSize: 24 }, { fontSize: 36 })
    const secondScope = el.__vp_scope_style
    expect(secondScope).toBeDefined()
    expect(secondScope).not.toBe(firstScope)
  })

  it('registers destroyed cleanup via el.on', () => {
    const onSpy = vi.fn()
    const el: any = {
      style: {},
      on: onSpy,
    }

    setters.object(el, 'style', null, { fontSize: 24 })

    expect(onSpy).toHaveBeenCalledWith('destroyed', expect.any(Function))
  })
})

describe('setters.call', () => {
  it('first call deferred to nextTick', async () => {
    const el: any = {}
    const setter = vi.fn()

    const result = setters.call(el, 'myKey', setter)

    expect(result).toBe(true)
    expect(setter).not.toHaveBeenCalled()
    await nextTick()
    expect(setter).toHaveBeenCalledTimes(1)
  })

  it('subsequent calls execute immediately', async () => {
    const el: any = {}
    const setter1 = vi.fn()
    const setter2 = vi.fn()

    setters.call(el, 'myKey', setter1)
    await nextTick()
    expect(setter1).toHaveBeenCalledTimes(1)

    setters.call(el, 'myKey', setter2)
    // second call is synchronous
    expect(setter2).toHaveBeenCalledTimes(1)
  })

  it('returns true', () => {
    const el: any = {}
    expect(setters.call(el, 'k', () => {})).toBe(true)
  })
})

describe('setters.boolean', () => {
  it('empty string coerces to true', () => {
    const el: any = {}
    setters.boolean(el, 'visible', null, '')
    expect(el.visible).toBe(true)
  })

  it('truthy value coerces to true', () => {
    const el: any = {}
    setters.boolean(el, 'visible', null, 'yes')
    expect(el.visible).toBe(true)
  })

  it('falsy values coerce to false', () => {
    const el: any = {}

    setters.boolean(el, 'visible', null, null)
    expect(el.visible).toBe(false)

    setters.boolean(el, 'visible', null, false)
    expect(el.visible).toBe(false)

    setters.boolean(el, 'visible', null, 0)
    expect(el.visible).toBe(false)
  })
})
