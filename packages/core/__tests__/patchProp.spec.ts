import { Container, Geometry, Texture } from 'pixi.js'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue-demi'

import { renderers } from '../src/renderer/internal/constants'
import { createElement } from '../src/renderer/nodeOps'

// Register all elements
import '../src/elements'

const PREFIX = 'pixi'

describe('Text patchProp', () => {
  it('text prop: first set skipped, second applies after nextTick', async () => {
    const el = createElement(PREFIX, 'pixi-text', undefined, undefined, { text: 'hello' })
    const handler = renderers.Text.patchProp!

    handler(el, 'text', null, 'world')
    // first call is unfirst — skipped
    expect(el.text).toBe('hello')

    handler(el, 'text', null, 'updated')
    // second call delegates to setters.call, deferred
    expect(el.text).toBe('hello')
    await nextTick()
    expect(el.text).toBe('updated')
  })

  it('style prop: first set skipped, second applies sub-properties', async () => {
    const el = createElement(PREFIX, 'pixi-text', undefined, undefined, { text: 'hi', style: { fontSize: 12 } })
    const handler = renderers.Text.patchProp!

    handler(el, 'style', null, { fontSize: 24 })
    // first call: unfirst skip

    handler(el, 'style', { fontSize: 12 }, { fontSize: 36 })
    await nextTick()
    // sub-properties applied via setters.object
    expect(el.style.fontSize).toBe(36)
  })

  it('unknown props fall through to base patchProp', () => {
    const el = createElement(PREFIX, 'pixi-text', undefined, undefined, { text: 'hi' })
    const handler = renderers.Text.patchProp!

    handler(el, 'visible', null, false)
    expect(el.visible).toBe(false)
  })
})

describe('AnimatedSprite patchProp', () => {
  function createAnimSprite() {
    return createElement(PREFIX, 'pixi-animated-sprite', undefined, undefined, {
      textures: [Texture.WHITE],
      autoUpdate: false,
    })
  }

  it('textures first set skipped, second normalizes and applies', async () => {
    const el = createAnimSprite()
    const handler = renderers.AnimatedSprite.patchProp!
    const origLen = el.textures.length

    handler(el, 'textures', null, [Texture.WHITE, Texture.WHITE])
    // first: unfirst skip
    expect(el.textures.length).toBe(origLen)

    handler(el, 'textures', null, [Texture.WHITE, Texture.WHITE])
    await nextTick()
    expect(el.textures.length).toBe(2)
  })

  it('when loop=true and textures change, gotoAndPlay(0) is called', async () => {
    const el = createAnimSprite()
    const handler = renderers.AnimatedSprite.patchProp!
    el.loop = true
    const spy = vi.spyOn(el, 'gotoAndPlay')

    // skip first
    handler(el, 'textures', null, [Texture.WHITE])
    // actual set
    handler(el, 'textures', null, [Texture.WHITE])
    await nextTick()
    expect(spy).toHaveBeenCalledWith(0)
  })

  it('playing=true calls el.play() (deferred first call)', async () => {
    const el = createAnimSprite()
    const handler = renderers.AnimatedSprite.patchProp!
    const spy = vi.spyOn(el, 'play')

    handler(el, 'playing', null, true)
    expect(spy).not.toHaveBeenCalled()
    await nextTick()
    expect(spy).toHaveBeenCalled()
  })

  it('playing=false calls el.stop()', async () => {
    const el = createAnimSprite()
    const handler = renderers.AnimatedSprite.patchProp!
    // prime the call key so it's synchronous
    handler(el, 'playing', null, true)
    await nextTick()

    const spy = vi.spyOn(el, 'stop')
    handler(el, 'playing', null, false)
    expect(spy).toHaveBeenCalled()
  })

  it('playing="" coerces to true (play)', async () => {
    const el = createAnimSprite()
    const handler = renderers.AnimatedSprite.patchProp!

    const spy = vi.spyOn(el, 'play')
    handler(el, 'playing', null, '')
    await nextTick()
    expect(spy).toHaveBeenCalled()
  })

  it('loop applies as boolean', () => {
    const el = createAnimSprite()
    const handler = renderers.AnimatedSprite.patchProp!

    handler(el, 'loop', null, '')
    expect(el.loop).toBe(true)

    handler(el, 'loop', null, false)
    expect(el.loop).toBe(false)
  })

  it('onComplete set via Reflect.set', () => {
    const el = createAnimSprite()
    const handler = renderers.AnimatedSprite.patchProp!
    const fn = () => {}

    handler(el, 'onComplete', null, fn)
    expect(el.onComplete).toBe(fn)
  })
})

describe('TilingSprite patchProp', () => {
  function createTS() {
    return createElement(PREFIX, 'pixi-tiling-sprite', undefined, undefined, {
      texture: Texture.WHITE,
      width: 100,
      height: 100,
    })
  }

  it('width/height skip first set, apply second', async () => {
    const el = createTS()
    const handler = renderers.TilingSprite.patchProp!
    const origW = el.width

    handler(el, 'width', null, 200)
    expect(el.width).toBe(origW)

    handler(el, 'width', null, 300)
    await nextTick()
    expect(el.width).toBe(300)
  })

  it('uvRespectAnchor applies as boolean', () => {
    const el = createTS()
    const handler = renderers.TilingSprite.patchProp!

    handler(el, 'uvRespectAnchor', null, '')
    expect(el.uvRespectAnchor).toBe(true)
  })

  it('unknown props fall through', () => {
    const el = createTS()
    const handler = renderers.TilingSprite.patchProp!

    handler(el, 'visible', null, false)
    expect(el.visible).toBe(false)
  })
})

describe('Mesh patchProp', () => {
  function createMesh() {
    const geometry = new Geometry({
      attributes: {
        aPosition: { buffer: new Float32Array([0, 0, 1, 0, 1, 1]), size: 2 },
      },
      indexBuffer: new Uint32Array([0, 1, 2]),
    })
    return createElement(PREFIX, 'pixi-mesh', undefined, undefined, {
      geometry,
    })
  }

  it('geometry skip first set', () => {
    const el = createMesh()
    const handler = renderers.Mesh.patchProp!
    const origGeo = el.geometry

    const newGeo = new Geometry({
      attributes: {
        aPosition: { buffer: new Float32Array([0, 0, 0, 1, 1, 1]), size: 2 },
      },
      indexBuffer: new Uint32Array([0, 1, 2]),
    })
    handler(el, 'geometry', null, newGeo)
    // first: unfirst skip
    expect(el.geometry).toBe(origGeo)
  })

  it('roundPixels applies as boolean', () => {
    const el = createMesh()
    const handler = renderers.Mesh.patchProp!

    handler(el, 'roundPixels', null, '')
    expect(el.roundPixels).toBe(true)
  })

  it('unknown props fall through', () => {
    const el = createMesh()
    const handler = renderers.Mesh.patchProp!

    handler(el, 'visible', null, false)
    expect(el.visible).toBe(false)
  })
})

describe('ParticleContainer remove', () => {
  it('calls removeParticle(...particleChildren) before destroy', () => {
    const el = createElement(PREFIX, 'pixi-particle-container', undefined, undefined, {})
    const parent = new Container()
    parent.addChild(el)

    // Add some particle children
    const child1 = new Container()
    const child2 = new Container()
    el.addParticle(child1, child2)
    expect(el.particleChildren.length).toBe(2)

    const spy = vi.spyOn(el, 'removeParticle')

    renderers.ParticleContainer.remove!(el)

    expect(spy).toHaveBeenCalledWith(child1, child2)
  })

  it('container is destroyed after removal', () => {
    const el = createElement(PREFIX, 'pixi-particle-container', undefined, undefined, {})
    const parent = new Container()
    parent.addChild(el)

    renderers.ParticleContainer.remove!(el)

    expect(el.destroyed).toBe(true)
  })
})

describe('Sprite remove', () => {
  it('calls destroy() directly', () => {
    const el = createElement(PREFIX, 'pixi-sprite', undefined, undefined, {})
    const spy = vi.spyOn(el, 'destroy')

    renderers.Sprite.remove!(el)

    expect(spy).toHaveBeenCalled()
    expect(el.destroyed).toBe(true)
  })
})
