import type { TilingSpriteOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { TilingSprite } from 'pixi.js'
import { normalizeTexture, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp, patchProp } from '../renderer/patchProp'

export type TilingSpriteElement = DefineContainerElement<TilingSprite, TilingSpriteOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TilingSprite: TilingSpriteElement
    PixiTilingSprite: TilingSpriteElement
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