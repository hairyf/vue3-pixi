import type { DefineAttributes, ExtractFilterProps } from '../types'
import { Filter, FilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type FilterProps = ExtractFilterProps<Filter, FilterOptions>

export interface FilterEvents { render: [Filter] }

export type FilterAttributes = DefineAttributes<FilterProps, FilterEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Filter: FilterAttributes
    PixiFilter: FilterAttributes
  }
}

renderer.use({
  name: 'Filter',
  createElement: props => new Filter(props.alpha),
})