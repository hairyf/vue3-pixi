
import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { Particle } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'Particle',
  createElement: props => new Particle(props),
})


export type ParticleProps = ExtractContainerProps<Particle>

export interface ParticleEvents extends AllowedEvents {
  render: [Particle]
}

export type ParticleElement = DefineElement<ParticleProps, ParticleEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Particle: ParticleElement
    PixiParticle: ParticleElement
  }
}
