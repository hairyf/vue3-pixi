import type { DefineFilterAttributes } from '../types'
import { BlurFilter, BlurFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type BlurFilterAttributes = DefineFilterAttributes<BlurFilter, BlurFilterOptions>

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