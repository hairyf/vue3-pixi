import type { NineSliceSpriteOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { NineSliceSprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type NineSliceSpriteElement = DefineContainerElement<NineSliceSprite, NineSliceSpriteOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NineSliceSprite: NineSliceSpriteElement
    PixiNineSliceSprite: NineSliceSpriteElement
  }
}

renderer.use({
  name: 'NineSliceSprite',
  createElement: props => new NineSliceSprite({
    ...props,
    texture: normalizeTexture(props.texture),
  }),
})
