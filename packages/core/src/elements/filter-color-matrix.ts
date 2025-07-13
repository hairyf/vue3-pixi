import type { DefineFilterAttributes } from '../types'
import { ColorMatrixFilter, FilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type ColorMatrixFilterAttributes = DefineFilterAttributes<ColorMatrixFilter, FilterOptions>

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