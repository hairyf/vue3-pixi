import type { TilingSpriteOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { TilingSprite } from 'pixi.js'
import { normalizeTexture, renderer, setters } from '../renderer'
import { patchProp } from '../renderer/patchProp'

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
        setters.unfirst(el, key, () => el[key] = next)
        break
      case 'uvRespectAnchor':
        setters.boolean(el, key, prev, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})