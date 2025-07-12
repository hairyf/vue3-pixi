import type { AllowedEvents, DefineElement } from '../types'
import { BLEND_MODES, ColorSource, PointData, Texture, TextureMatrix, TextureOptions, TilingSprite } from 'pixi.js'
import { normalizeTexture, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp, patchProp } from '../renderer/patchProp'
import { Transform } from 'stream'

renderer.use({
  name: 'TilingSprite',
  createElement: props => new TilingSprite({
    texture: normalizeTexture(props!.texture),
    width: props.width,
    height: props.height,
  }),
  patchProp(el: TilingSprite, key, prev, next) {
    switch (key) {
      case 'width':
      case 'height':
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      case 'uvRespectAnchor':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})

export interface TilingSpriteProps {
  texture: string | Texture
  textureOptions?: TextureOptions
  width?: number
  height?: number

  anchor?: Partial<PointData> | number
  anchorX?: number
  anchorY?: number

  blendMode?: BLEND_MODES

  pluginName?: string

  tint?: ColorSource

  clampMargin?: number

  tilePosition?: Partial<PointData> | number | [number, number]
  tilePositionX?: number
  tilePositionY?: number

  tileScale?: Partial<PointData> | number | [number, number]
  tileScaleX?: number
  tileScaleY?: number

  tileTransform?: Transform

  uvMatrix?: TextureMatrix
  uvRespectAnchor?: boolean
}

export interface TilingSpriteEvents extends AllowedEvents {
  render: [TilingSprite]
}

export type TilingSpriteElement = DefineElement<TilingSpriteProps, TilingSpriteEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TilingSprite: TilingSpriteElement
    PixiTilingSprite: TilingSpriteElement
  }
}
