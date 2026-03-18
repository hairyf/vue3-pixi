import { Container, MeshPlane, MeshRope, NineSliceSprite, Sprite, Texture } from 'pixi.js'
import { describe, expect, it, vi } from 'vitest'
import { createElement } from '../src/renderer/nodeOps'

// Register all elements
import '../src/elements'

const PREFIX = 'pixi'

// Elements that can be created with no props
const simpleElements = [
  'Container',
  'Sprite',
  'Graphics',
  'Text',
  'BitmapText',
  'ParticleContainer',
  'RenderLayer',
  'DomContainer',
  'RenderContainer',
  'HtmlText',
  'BitmapTextGraphics',
]

// Elements requiring specific props
const propsElements = [
  { name: 'TilingSprite', props: { texture: Texture.WHITE, width: 100, height: 100 } },
  { name: 'AnimatedSprite', props: { textures: [Texture.WHITE] } },
  { name: 'NineSliceSprite', props: { texture: Texture.WHITE } },
  { name: 'MeshRope', props: { texture: Texture.WHITE, points: [{ x: 0, y: 0 }, { x: 100, y: 0 }] } },
  { name: 'MeshPlane', props: { texture: Texture.WHITE } },
  { name: 'MeshSimple', props: { texture: Texture.WHITE } },
]

const filterElements = [
  'AlphaFilter',
  'BlurFilter',
  'BlurFilterPass',
  'ColorMatrixFilter',
  'NoiseFilter',
]

// These filters require a sprite/texture prop and can't be created with empty props
const filterPropsElements = [
  { name: 'DisplacementFilter', props: { sprite: new Sprite(Texture.WHITE) } },
  { name: 'MaskFilter', props: { sprite: new Sprite(Texture.WHITE) } },
]

describe('element creation', () => {
  describe('simple container elements', () => {
    for (const name of simpleElements) {
      it(`should create ${name}`, () => {
        const el = createElement(PREFIX, name, undefined, undefined, {})
        expect(el).toBeDefined()
        expect(el._vp_name).toBe(name)
      })
    }
  })

  describe('elements with required props', () => {
    for (const { name, props } of propsElements) {
      it(`should create ${name}`, () => {
        const el = createElement(PREFIX, name, undefined, undefined, props)
        expect(el).toBeDefined()
        expect(el._vp_name).toBe(name)
      })
    }
  })

  describe('filter elements', () => {
    for (const name of filterElements) {
      it(`should create ${name}`, () => {
        const el = createElement(PREFIX, name, undefined, undefined, {})
        expect(el).toBeDefined()
        expect(el._vp_name).toBe(name)
      })
    }

    for (const { name, props } of filterPropsElements) {
      it(`should create ${name}`, () => {
        const el = createElement(PREFIX, name, undefined, undefined, props)
        expect(el).toBeDefined()
        expect(el._vp_name).toBe(name)
      })
    }
  })

  it('should create GraphicsContext element', () => {
    const el = createElement(PREFIX, 'GraphicsContext', undefined, undefined, {})
    expect(el).toBeDefined()
    expect(el._vp_name).toBe('GraphicsContext')
  })

  it('should create elements with pixi- prefix', () => {
    const el = createElement(PREFIX, 'pixi-container', undefined, undefined, {})
    expect(el).toBeInstanceOf(Container)
  })
})

describe('filter initial props', () => {
  it('should apply BlurFilter strength', () => {
    const el = createElement(PREFIX, 'BlurFilter', undefined, undefined, { strength: 8 })
    expect(el.strength).toBe(8)
  })

  it('should apply AlphaFilter alpha', () => {
    const el = createElement(PREFIX, 'AlphaFilter', undefined, undefined, { alpha: 0.5 })
    expect(el.alpha).toBe(0.5)
  })

  it('should apply NoiseFilter noise', () => {
    const el = createElement(PREFIX, 'NoiseFilter', undefined, undefined, { noise: 0.8 })
    expect(el.noise).toBeCloseTo(0.8)
  })
})

describe('backwards compatibility (v7 deprecated elements)', () => {
  it('should create NineSliceSprite from deprecated NineSlicePlane name', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const el = createElement(PREFIX, 'NineSlicePlane', undefined, undefined, { texture: Texture.WHITE })
    expect(el).toBeInstanceOf(NineSliceSprite)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('<nine-slice-plane> is deprecated'),
    )
    warnSpy.mockRestore()
  })

  it('should create MeshPlane from deprecated SimplePlane name', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const el = createElement(PREFIX, 'SimplePlane', undefined, undefined, { texture: Texture.WHITE })
    expect(el).toBeInstanceOf(MeshPlane)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('<simple-plane> is deprecated'),
    )
    warnSpy.mockRestore()
  })

  it('should create MeshRope from deprecated SimpleRope name', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const el = createElement(PREFIX, 'SimpleRope', undefined, undefined, {
      texture: Texture.WHITE,
      points: [{ x: 0, y: 0 }, { x: 100, y: 0 }],
    })
    expect(el).toBeInstanceOf(MeshRope)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('<simple-rope> is deprecated'),
    )
    warnSpy.mockRestore()
  })

  it('should create deprecated elements with kebab-case prefix', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const el = createElement(PREFIX, 'pixi-nine-slice-plane', undefined, undefined, { texture: Texture.WHITE })
    expect(el).toBeInstanceOf(NineSliceSprite)
    warnSpy.mockRestore()
  })

  it('should only warn once per deprecated element', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    createElement(PREFIX, 'NineSlicePlane', undefined, undefined, { texture: Texture.WHITE })
    createElement(PREFIX, 'NineSlicePlane', undefined, undefined, { texture: Texture.WHITE })
    // The warned set persists, so we may get 0 or 1 calls depending on prior tests
    // The key assertion is it does NOT warn twice for the same element
    const callCount = warnSpy.mock.calls.filter(c =>
      String(c[0]).includes('<nine-slice-plane> is deprecated'),
    ).length
    expect(callCount).toBeLessThanOrEqual(1)
    warnSpy.mockRestore()
  })
})
