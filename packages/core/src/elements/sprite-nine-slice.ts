import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { NineSliceSprite, Texture } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

renderer.use({
  name: 'NineSliceSprite',
  createElement: props => new NineSliceSprite({
    ...props,
    texture: normalizeTexture(props.texture),
  }),
})

export type NineSliceSpriteProps = ExtractContainerProps<NineSliceSprite, { texture: Texture | string }>

export interface NineSliceSpriteEvents extends AllowedEvents {
  render: [NineSliceSprite]
}

export type NineSliceSpriteElement = DefineElement<NineSliceSpriteProps, NineSliceSpriteEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NineSliceSprite: NineSliceSpriteElement
    PixiNineSliceSprite: NineSliceSpriteElement
  }
}
