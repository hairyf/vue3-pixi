import type { SpriteOptions } from 'pixi.js'
import type { DefineContainerAttributes } from '../types'
import { Sprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type SpriteAttributes = DefineContainerAttributes<Sprite, SpriteOptions>

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
