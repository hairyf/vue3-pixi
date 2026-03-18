import type { ParticleContainerOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { ParticleContainer } from 'pixi.js'
import { nodeOps, patchProp, renderer, setters } from '../renderer'

export type ParticleContainerElement = DefineContainerElement<ParticleContainer, ParticleContainerOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ParticleContainer: ParticleContainerElement
    PixiParticleContainer: ParticleContainerElement
  }
}

renderer.use({
  name: 'ParticleContainer',
  createElement: props => new ParticleContainer(props),
  patchProp(el: ParticleContainer, key, prev, next) {
    switch (key) {
      case 'roundPixels':
        setters.boolean(el, key, prev, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
  remove(el) {
    el.removeParticle(...el.particleChildren)
    nodeOps.remove(el)
  },
})
