import type { DefineAttributes, ExtractFilterEvents, ExtractFilterProps } from '../types'
import { AlphaFilter, AlphaFilterOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type AlphaFilterProps = ExtractFilterProps<AlphaFilter, AlphaFilterOptions>

export type AlphaFilterEvents = ExtractFilterEvents<AlphaFilter>

export type AlphaFilterAttributes = DefineAttributes<AlphaFilterProps, AlphaFilterEvents>


declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AlphaFilter: AlphaFilterAttributes
    PixiAlphaFilter: AlphaFilterAttributes
  }
}

renderer.use({ name: 'AlphaFilter', createElement: props => new AlphaFilter(props.alpha) })