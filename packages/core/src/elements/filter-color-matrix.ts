import type { DefineAttributes, ExtractFilterEvents, ExtractFilterProps } from '../types'
import { ColorMatrixFilter, FilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type ColorMatrixFilterProps = ExtractFilterProps<ColorMatrixFilter, FilterOptions>

export type ColorMatrixFilterEvents = ExtractFilterEvents<ColorMatrixFilter>

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