import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { AnimatedSprite } from 'pixi.js'
import { normalizeTexture, renderer, setPropertyValue, setSkipFirstValue } from '../renderer'
import { patchBooleanProp, patchProp } from '../renderer/patchProp'

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
        setSkipFirstValue(el, key, () => {
          el.textures = next.map(normalizeTexture)
          el.loop && el.gotoAndPlay(0)
        })
        break
      case 'playing':
        // eslint-disable-next-line no-case-declarations
        const isPlaying = (next === '') || !!next
        setPropertyValue(el, key, () => isPlaying ? el.play() : el.stop())
        break
      case 'gotoAndPlay':
        setPropertyValue(el, key, () => el.gotoAndPlay(next))
        break
      case 'loop':
      case 'updateAnchor':
        patchBooleanProp(el, key, prev, next)
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

export type AnimatedSpriteProps = ExtractContainerProps<AnimatedSprite, { textures?: any }>

export interface AnimatedSpriteEvents extends AllowedEvents {
  render: [AnimatedSprite]
}

export type AnimatedSpriteElement = DefineElement<AnimatedSpriteProps, AnimatedSpriteEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AnimatedSprite: AnimatedSpriteElement
    PixiAnimatedSprite: AnimatedSpriteElement
  }
}
