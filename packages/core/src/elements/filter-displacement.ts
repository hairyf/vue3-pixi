import type { DefineFilterElement } from '../types'
import { DisplacementFilter, DisplacementFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type DisplacementFilterElement = DefineFilterElement<DisplacementFilter, DisplacementFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DisplacementFilter: DisplacementFilterElement
    PixiDisplacementFilter: DisplacementFilterElement
  }
}

renderer.use({
  name: 'DisplacementFilter',
  createElement: props => new DisplacementFilter(props.alpha),
})