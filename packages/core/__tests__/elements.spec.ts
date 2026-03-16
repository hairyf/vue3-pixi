import { Container, Texture } from 'pixi.js'
import { describe, expect, it } from 'vitest'
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
]

// Elements requiring specific props
const propsElements = [
  { name: 'TilingSprite', props: { texture: Texture.WHITE, width: 100, height: 100 } },
  { name: 'AnimatedSprite', props: { textures: [Texture.WHITE] } },
  { name: 'NineSliceSprite', props: { texture: Texture.WHITE } },
]

const filterElements = [
  'AlphaFilter',
  'BlurFilter',
  'ColorMatrixFilter',
  'NoiseFilter',
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
