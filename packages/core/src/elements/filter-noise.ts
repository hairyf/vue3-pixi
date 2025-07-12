import type { AllowedEvents, AllowedFilterProps, DefineElement, ExtractFilterProps } from '../types'
import { NoiseFilter } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'NoiseFilter',
  createElement: props => new NoiseFilter(props.alpha),
})

export interface NoiseFilterProps extends ExtractFilterProps<NoiseFilter> {

}

export interface NoiseFilterEvents extends AllowedEvents {
  render: [NoiseFilter]
}

export type NoiseFilterElement = DefineElement<NoiseFilterProps, NoiseFilterEvents, AllowedFilterProps>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NoiseFilter: NoiseFilterElement
    PixiNoiseFilter: NoiseFilterElement
  }
}
