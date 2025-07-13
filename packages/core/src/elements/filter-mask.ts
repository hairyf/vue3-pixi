import type { DefineFilterElement } from '../types'
import { MaskFilter, MaskFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type MaskFilterElement = DefineFilterElement<MaskFilter, MaskFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MaskFilter: MaskFilterElement
    PixiMaskFilter: MaskFilterElement
  }
}

renderer.use({
  name: 'MaskFilter',
  createElement: props => new MaskFilter(props.alpha),
})