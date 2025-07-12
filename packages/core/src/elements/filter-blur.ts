import type { AllowedEvents, AllowedFilterProps, DefineElement, ExtractFilterProps } from '../types'
import { BlurFilter } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'BlurFilter',
  createElement: props => new BlurFilter(props.alpha),
})

export interface BlurFilterProps extends ExtractFilterProps<BlurFilter> {

}

export interface BlurFilterEvents extends AllowedEvents {
  render: [BlurFilter]
}

export type BlurFilterElement = DefineElement<BlurFilterProps, BlurFilterEvents, AllowedFilterProps>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlurFilter: BlurFilterElement
    PixiBlurFilter: BlurFilterElement
  }
}
