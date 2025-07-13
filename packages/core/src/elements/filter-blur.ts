import type { DefineAttributes, ExtractFilterProps } from '../types'
import { BlurFilter } from 'pixi.js'
import { renderer } from '../renderer'

export type BlurFilterProps = ExtractFilterProps<BlurFilter>

export interface BlurFilterEvents { render: [BlurFilter] }

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