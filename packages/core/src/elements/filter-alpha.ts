import type { DefineFilterElement } from '../types'
import { AlphaFilter, AlphaFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type AlphaFilterElement = DefineFilterElement<AlphaFilter, AlphaFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AlphaFilter: AlphaFilterElement
    PixiAlphaFilter: AlphaFilterElement
  }
}

renderer.use({ name: 'AlphaFilter', createElement: props => new AlphaFilter(props.alpha) })