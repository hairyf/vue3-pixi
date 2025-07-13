import type { DefineAttributes, ExtractFilterEvents, ExtractFilterProps } from '../types'
import { NoiseFilter, NoiseFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type NoiseFilterProps = ExtractFilterProps<NoiseFilter, NoiseFilterOptions>

export type NoiseFilterEvents = ExtractFilterEvents<NoiseFilter>

export type NoiseFilterAttributes = DefineAttributes<NoiseFilterProps, NoiseFilterEvents>

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
