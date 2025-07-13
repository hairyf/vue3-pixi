import type { TilingSpriteOptions } from 'pixi.js'
import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { TilingSprite } from 'pixi.js'
import { normalizeTexture, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp, patchProp } from '../renderer/patchProp'



export type TilingSpriteProps = ExtractContainerProps<TilingSprite, TilingSpriteOptions>

export type TilingSpriteEvents = ExtractContainerEvents<TilingSprite>

export type TilingSpriteAttributes = DefineAttributes<TilingSpriteProps, TilingSpriteEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TilingSprite: TilingSpriteAttributes
    PixiTilingSprite: TilingSpriteAttributes
  }
}

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