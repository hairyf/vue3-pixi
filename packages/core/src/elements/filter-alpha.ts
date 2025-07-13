import type { DefineFilterAttributes } from '../types'
import { AlphaFilter, AlphaFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type AlphaFilterAttributes = DefineFilterAttributes<AlphaFilter, AlphaFilterOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AlphaFilter: AlphaFilterAttributes
    PixiAlphaFilter: AlphaFilterAttributes
  }
}

renderer.use({ name: 'AlphaFilter', createElement: props => new AlphaFilter(props.alpha) })