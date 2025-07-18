import type { AnimatedSpriteOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { AnimatedSprite } from 'pixi.js'
import { normalizeTexture, renderer, setters } from '../renderer'
import { patchProp } from '../renderer/nodeOps'

export type AnimatedSpriteElement = DefineContainerElement<AnimatedSprite, AnimatedSpriteOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AnimatedSprite: AnimatedSpriteElement
    PixiAnimatedSprite: AnimatedSpriteElement
  }
}

renderer.use({
  name: 'AnimatedSprite',
  createElement: (props) => {
    return new AnimatedSprite(
      props.textures.map(normalizeTexture),
      props['auto-update'] || props.autoUpdate,
    )
  },
  patchProp(el: AnimatedSprite, key, prev, next) {
    switch (key) {
      case 'textures':
        setters.unfirst(el, key, () => {
          el.textures = next.map(normalizeTexture)
          el.loop && el.gotoAndPlay(0)
        })
        break
      case 'playing':
        // eslint-disable-next-line no-case-declarations
        const isPlaying = (next === '') || !!next
        setters.call(el, key, () => isPlaying ? el.play() : el.stop())
        break
      case 'gotoAndPlay':
        setters.call(el, key, () => el.gotoAndPlay(next))
        break
      case 'loop':
      case 'updateAnchor':
        setters.boolean(el, key, prev, next)
        break
      case 'onComplete':
      case 'onFrameChange':
      case 'onLoop':
        Reflect.set(el, key, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})
