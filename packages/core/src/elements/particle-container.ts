
import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { ParticleContainer } from 'pixi.js'
import { patchProp, renderer } from '../renderer'

renderer.use({ 
  name: 'ParticleContainer',
  createElement: props => new ParticleContainer(props),
  patchProp(el: ParticleContainer, key, prev, next) {
    switch (key) {
      case 'max-size':
      case 'properties':
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
 })

export type ParticleContainerProps = ExtractContainerProps<ParticleContainer>

export interface ParticleContainerEvents extends AllowedEvents {
  render: [ParticleContainer]
}

export type ParticleContainerElement = DefineElement<ParticleContainerProps, ParticleContainerEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ParticleContainer: ParticleContainerElement
    PixiParticleContainer: ParticleContainerElement
  }
}
