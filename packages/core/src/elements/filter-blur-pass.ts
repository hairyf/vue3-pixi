import type { DefineFilterAttributes } from '../types'
import { BlurFilterPass, BlurFilterPassOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type BlurFilterPassAttributes = DefineFilterAttributes<BlurFilterPass, BlurFilterPassOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlurFilterPass: BlurFilterPassAttributes
    PixiBlurFilterPass: BlurFilterPassAttributes
  }
}

renderer.use({
  name: 'BlurFilterPass',
  createElement: props => new BlurFilterPass(props.alpha),
})