import type { DefineFilterAttributes } from '../types'
import { NoiseFilter, NoiseFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type NoiseFilterAttributes = DefineFilterAttributes<NoiseFilter, NoiseFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NoiseFilter: NoiseFilterAttributes
    PixiNoiseFilter: NoiseFilterAttributes
  }
}

renderer.use({
  name: 'NoiseFilter',
  createElement: props => new NoiseFilter(props.alpha),
})
