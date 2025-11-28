import type { BlurFilterOptions } from 'pixi.js'
import type { DefineFilterElement } from '../types'
import { BlurFilter } from 'pixi.js'
import { renderer } from '../renderer'

export type BlurFilterElement = DefineFilterElement<BlurFilter, BlurFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlurFilter: BlurFilterElement
    PixiBlurFilter: BlurFilterElement
  }
}

renderer.use({
  name: 'BlurFilter',
  createElement: props => new BlurFilter(props.alpha),
})
