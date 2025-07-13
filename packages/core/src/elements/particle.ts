import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { Particle, ParticleOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type ParticleProps = ExtractContainerProps<Particle, ParticleOptions>

export type ParticleEvents = ExtractContainerEvents<Particle>

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