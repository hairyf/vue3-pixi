import { describe, expect, it } from 'vitest'
import { compilerOptions } from '../src/compiler'

const allTags = [
  'container',
  'sprite',
  'graphics',
  'text',
  'html-text',
  'bitmap-text',
  'bitmap-text-graphics',
  'split-bitmap-text',
  'tiling-sprite',
  'animated-sprite',
  'mesh',
  'mesh-plane',
  'mesh-simple',
  'nine-slice-sprite',
  'mesh-rope',
  'perspective-mesh',
  'render-layer',
  'graphics-context',
  'split-text',
  'filter',
  'blur-filter',
  'blur-filter-pass',
  'alpha-filter',
  'displacement-filter',
  'color-matrix-filter',
  'mask-filter',
  'noise-filter',
  'particle-container',
  'dom-container',
  'render-container',
]

describe('compiler', () => {
  for (const tag of allTags) {
    it(`recognizes <${tag}>`, () => {
      expect(compilerOptions.isCustomElement(tag)).toBe(true)
    })
    it(`recognizes <pixi-${tag}>`, () => {
      expect(compilerOptions.isCustomElement(`pixi-${tag}`)).toBe(true)
    })
  }

  it('rejects unknown elements', () => {
    expect(compilerOptions.isCustomElement('div')).toBe(false)
    expect(compilerOptions.isCustomElement('pixi-unknown')).toBe(false)
  })
})
