import type { DefineContainerAttributes } from '../types'
import { Particle, ParticleOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type ParticleAttributes = DefineContainerAttributes<Particle, ParticleOptions>

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