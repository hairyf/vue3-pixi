import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { Particle } from 'pixi.js'
import { renderer } from '../renderer'

export type ParticleProps = ExtractContainerProps<Particle>

export type ParticleEvents = ExtractContainerEvents<Particle, { render: [Particle] }>

export type ParticleAttributes = DefineAttributes<ParticleProps, ParticleEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Particle: ParticleAttributes
    PixiParticle: ParticleAttributes
  }
}

renderer.use({
  name: 'Particle',
  createElement: props => new Particle(props),
})