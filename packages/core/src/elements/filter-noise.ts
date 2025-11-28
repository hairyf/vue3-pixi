import type { NoiseFilterOptions } from 'pixi.js'
import type { DefineFilterElement } from '../types'
import { NoiseFilter } from 'pixi.js'
import { renderer } from '../renderer'

export type NoiseFilterElement = DefineFilterElement<NoiseFilter, NoiseFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NoiseFilter: NoiseFilterElement
    PixiNoiseFilter: NoiseFilterElement
  }
}

renderer.use({
  name: 'NoiseFilter',
  createElement: props => new NoiseFilter(props.alpha),
})
