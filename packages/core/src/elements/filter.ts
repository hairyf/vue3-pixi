import type { AllowedEvents, AllowedFilterProps, DefineElement, ExtractFilterProps } from '../types'
import { Filter } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'Filter',
  createElement: props => new Filter(props.alpha),
})

export interface FilterProps extends ExtractFilterProps<Filter> {

}

export interface FilterEvents extends AllowedEvents {
  render: [Filter]
}

export type FilterElement = DefineElement<FilterProps, FilterEvents, AllowedFilterProps>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Filter: FilterElement
    PixiFilter: FilterElement
  }
}
