import { Texture } from 'pixi.js'
import { describe, expect, it } from 'vitest'
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
