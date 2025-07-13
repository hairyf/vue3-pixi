import type { DefineFilterAttributes } from '../types'
import { DisplacementFilter, DisplacementFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type DisplacementFilterAttributes = DefineFilterAttributes<DisplacementFilter, DisplacementFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DisplacementFilter: DisplacementFilterAttributes
    PixiDisplacementFilter: DisplacementFilterAttributes
  }
}

renderer.use({
  name: 'DisplacementFilter',
  createElement: props => new DisplacementFilter(props.alpha),
})