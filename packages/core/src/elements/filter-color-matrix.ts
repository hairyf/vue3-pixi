import type { DefineAttributes, ExtractFilterProps } from '../types'
import { ColorMatrixFilter } from 'pixi.js'
import { renderer } from '../renderer'

export type ColorMatrixFilterProps = ExtractFilterProps<ColorMatrixFilter>

export interface ColorMatrixFilterEvents { render: [ColorMatrixFilter] }

export type ColorMatrixFilterAttributes = DefineAttributes<ColorMatrixFilterProps, ColorMatrixFilterEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ColorMatrixFilter: ColorMatrixFilterAttributes
    PixiColorMatrixFilter: ColorMatrixFilterAttributes
  }
}

renderer.use({
  name: 'ColorMatrixFilter',
  createElement: props => new ColorMatrixFilter(props.alpha),
})