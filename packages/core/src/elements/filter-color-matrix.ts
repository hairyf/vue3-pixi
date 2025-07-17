import type { FilterOptions } from 'pixi.js'
import type { DefineFilterElement } from '../types'
import { ColorMatrixFilter } from 'pixi.js'
import { renderer } from '../renderer'

export type ColorMatrixFilterElement = DefineFilterElement<ColorMatrixFilter, FilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ColorMatrixFilter: ColorMatrixFilterElement
    PixiColorMatrixFilter: ColorMatrixFilterElement
  }
}

renderer.use({
  name: 'ColorMatrixFilter',
  createElement: props => new ColorMatrixFilter(props.alpha),
})
