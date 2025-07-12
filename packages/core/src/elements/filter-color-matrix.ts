import type { AllowedEvents, AllowedFilterProps, DefineElement, ExtractFilterProps } from '../types'
import { ColorMatrixFilter } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'ColorMatrixFilter',
  createElement: props => new ColorMatrixFilter(props.alpha),
})

export interface ColorMatrixFilterProps extends ExtractFilterProps<ColorMatrixFilter> {

}

export interface ColorMatrixFilterEvents extends AllowedEvents {
  render: [ColorMatrixFilter]
}

export type ColorMatrixFilterElement = DefineElement<ColorMatrixFilterProps, ColorMatrixFilterEvents, AllowedFilterProps>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ColorMatrixFilter: ColorMatrixFilterElement
    PixiColorMatrixFilter: ColorMatrixFilterElement
  }
}
