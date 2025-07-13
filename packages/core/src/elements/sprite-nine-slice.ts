import type { NineSliceSpriteOptions } from 'pixi.js'
import type { DefineContainerAttributes } from '../types'
import { NineSliceSprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type NineSliceSpriteAttributes = DefineContainerAttributes<NineSliceSprite, NineSliceSpriteOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NineSliceSprite: NineSliceSpriteAttributes
    PixiNineSliceSprite: NineSliceSpriteAttributes
  }
}

renderer.use({
  name: 'NineSliceSprite',
  createElement: props => new NineSliceSprite({
    ...props,
    texture: normalizeTexture(props.texture),
  }),
})