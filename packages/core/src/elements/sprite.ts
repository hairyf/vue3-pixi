import type { Texture } from 'pixi.js'
import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { Sprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type SpriteProps = ExtractContainerProps<Sprite, { texture: Texture | string }>

export type SpriteEvents = ExtractContainerEvents<Sprite, { render: [Sprite] }>

export type SpriteAttributes = DefineAttributes<SpriteProps, SpriteEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Sprite: SpriteAttributes
    PixiSprite: SpriteAttributes
  }
}

renderer.use({
  name: 'Sprite',
  createElement: props => new Sprite({
    ...props,
    texture: normalizeTexture(props.texture),
  }),
  remove: (node: Sprite) => node.destroy(),
})
