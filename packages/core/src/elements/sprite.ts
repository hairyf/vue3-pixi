import type { SpriteOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { Sprite } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type SpriteElement = DefineContainerElement<Sprite, SpriteOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Sprite: SpriteElement
    PixiSprite: SpriteElement
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
