import type { DefineContainerElement } from '../types'
import { Particle, ParticleOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type ParticleElement = DefineContainerElement<Particle, ParticleOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Particle: ParticleElement
    PixiParticle: ParticleElement
  }
}

renderer.use({
  name: 'Particle',
  createElement: props => new Particle(props),
})