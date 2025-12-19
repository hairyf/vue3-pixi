import type { FilterOptions } from 'pixi.js'
import type { DefineFilterElement } from '../types'
import { Filter } from 'pixi.js'

import { renderer } from '../renderer'

export type FilterElement = DefineFilterElement<Filter, FilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Filter: FilterElement
    PixiFilter: FilterElement
  }
}

renderer.use({
  name: 'Filter',
  createElement: (props) => {
    if (props?.is)
      return typeof props.is === 'function' ? props.is(props) : props.is
    props.glProgram = props['gl-program']
    delete props['gl-program']
    return new Filter(props)
  },
})
