import type { Texture } from 'pixi.js'
import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
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

export type SpriteProps = ExtractContainerProps<Sprite, { texture: Texture | string }>

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
