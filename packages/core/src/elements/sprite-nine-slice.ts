import type { AllowedEvents, DefineElement } from '../types'
import { BLEND_MODES, ColorSource, NineSliceSprite, Shader, State, Texture } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

renderer.use({
  name: 'NineSliceSprite',
  createElement: props => new NineSliceSprite({
    ...props,
    texture: normalizeTexture(props.texture),
  }),
})

export interface NineSliceSpriteProps {
  texture: Texture | string
  leftWidth?: number
  rightWidth?: number
  topHeight?: number
  bottomHeight?: number
  verticesX?: number
  verticesY?: number

  shader?: Shader
  blendMode?: BLEND_MODES
  material?: Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: State

  tint?: ColorSource
  canvasPadding?: number

  autoResize?: boolean
}

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
