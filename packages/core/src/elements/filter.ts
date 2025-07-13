import type { DefineFilterAttributes } from '../types'
import { Filter, FilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type FilterAttributes = DefineFilterAttributes<Filter, FilterOptions>

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