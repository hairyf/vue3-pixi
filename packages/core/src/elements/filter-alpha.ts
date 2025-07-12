import type { AllowedEvents, AllowedFilterProps, DefineElement, ExtractFilterProps } from '../types'
import { AlphaFilter } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'AlphaFilter',
  createElement: props => new AlphaFilter(props.alpha),
})

export interface AlphaFilterProps extends ExtractFilterProps<AlphaFilter> {

}

export interface AlphaFilterEvents extends AllowedEvents {
  render: [AlphaFilter]
}

export type AlphaFilterElement = DefineElement<AlphaFilterProps, AlphaFilterEvents, AllowedFilterProps>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AlphaFilter: AlphaFilterElement
    PixiAlphaFilter: AlphaFilterElement
  }
}
