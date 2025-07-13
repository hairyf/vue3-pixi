import type { DefineAttributes, ExtractFilterEvents, ExtractFilterProps } from '../types'
import { BlurFilter, BlurFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type BlurFilterProps = ExtractFilterProps<BlurFilter, BlurFilterOptions>

export type BlurFilterEvents = ExtractFilterEvents<BlurFilter>

export type BlurFilterAttributes = DefineAttributes<BlurFilterProps, BlurFilterEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlurFilter: BlurFilterAttributes
    PixiBlurFilter: BlurFilterAttributes
  }
}

renderer.use({
  name: 'BlurFilter',
  createElement: props => new BlurFilter(props.alpha),
})