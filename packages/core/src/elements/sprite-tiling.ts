import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { Texture, TilingSprite } from 'pixi.js'
import { normalizeTexture, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp, patchProp } from '../renderer/patchProp'

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

export type TilingSpriteProps = ExtractContainerProps<TilingSprite, { texture: Texture | string }>

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
