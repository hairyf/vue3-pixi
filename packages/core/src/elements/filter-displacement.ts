import type { DefineAttributes, ExtractFilterProps } from '../types'
import { DisplacementFilter } from 'pixi.js'
import { renderer } from '../renderer'

export type DisplacementFilterProps = ExtractFilterProps<DisplacementFilter>

export interface DisplacementFilterEvents { render: [DisplacementFilter] }

export type DisplacementFilterAttributes = DefineAttributes<DisplacementFilterProps, DisplacementFilterEvents>

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