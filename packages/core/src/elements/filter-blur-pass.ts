import type { BlurFilterPassOptions } from 'pixi.js'
import type { DefineFilterElement } from '../types'
import { BlurFilterPass } from 'pixi.js'
import { renderer } from '../renderer'

export type BlurFilterPassElement = DefineFilterElement<BlurFilterPass, BlurFilterPassOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlurFilterPass: BlurFilterPassElement
    PixiBlurFilterPass: BlurFilterPassElement
  }
}

renderer.use({
  name: 'BlurFilterPass',
  createElement: props => new BlurFilterPass(props.alpha),
})
