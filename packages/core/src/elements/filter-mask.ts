import type { DefineFilterAttributes } from '../types'
import { MaskFilter, MaskFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type MaskFilterAttributes = DefineFilterAttributes<MaskFilter, MaskFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MaskFilter: MaskFilterAttributes
    PixiMaskFilter: MaskFilterAttributes
  }
}

renderer.use({
  name: 'MaskFilter',
  createElement: props => new MaskFilter(props.alpha),
})