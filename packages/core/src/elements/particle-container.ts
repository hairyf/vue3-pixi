import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { ParticleContainer } from 'pixi.js'
import { patchProp, renderer } from '../renderer'

export type ParticleContainerProps = ExtractContainerProps<ParticleContainer>

export type ParticleContainerEvents = ExtractContainerEvents<ParticleContainer, { render: [ParticleContainer] }>

export type ParticleContainerAttributes = DefineAttributes<ParticleContainerProps, ParticleContainerEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ParticleContainer: ParticleContainerAttributes
    PixiParticleContainer: ParticleContainerAttributes
  }
}

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