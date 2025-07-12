import type { AllowedEvents, AllowedFilterProps, DefineElement, ExtractFilterProps } from '../types'
import { DisplacementFilter } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'DisplacementFilter',
  createElement: props => new DisplacementFilter(props.alpha),
})

export interface DisplacementFilterProps extends ExtractFilterProps<DisplacementFilter> {

}

export interface DisplacementFilterEvents extends AllowedEvents {
  render: [DisplacementFilter]
}

export type DisplacementFilterElement = DefineElement<DisplacementFilterProps, DisplacementFilterEvents, AllowedFilterProps>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DisplacementFilter: DisplacementFilterElement
    PixiDisplacementFilter: DisplacementFilterElement
  }
}
