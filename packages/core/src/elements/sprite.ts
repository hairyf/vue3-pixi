import type { BLEND_MODES, ColorSource, Texture } from 'pixi.js'
import type { AllowedEvents, AllowedProps, DefineElement } from '../types'
import { Sprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

renderer.use({
  name: 'Sprite',
  createElement: props => new Sprite({
    ...props,
    texture: normalizeTexture(props.texture),
  }),
  remove: (node: Sprite) => node.destroy(),
})

export interface SpriteProps extends AllowedProps {
  texture: string | Texture

  blendMode?: BLEND_MODES

  width?: number
  height?: number

  pluginName?: string

  tint?: ColorSource
}

export interface SpriteEvents extends AllowedEvents {
  render: [Sprite]
}

export type SpriteElement = DefineElement<SpriteProps, SpriteEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Sprite: SpriteElement
    PixiSprite: SpriteElement
  }
}
