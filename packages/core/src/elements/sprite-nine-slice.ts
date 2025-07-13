import type { NineSliceSpriteOptions } from 'pixi.js'
import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { NineSliceSprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type NineSliceSpriteProps = ExtractContainerProps<NineSliceSprite, NineSliceSpriteOptions>

export type NineSliceSpriteEvents = ExtractContainerEvents<NineSliceSprite>

export type NineSliceSpriteAttributes = DefineAttributes<NineSliceSpriteProps, NineSliceSpriteEvents>

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