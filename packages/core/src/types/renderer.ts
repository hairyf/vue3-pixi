import { Container, ContainerChild } from 'pixi.js'
import type { RendererOptions as _RendererOptions } from 'vue-demi'
import type { Renderer as _Renderer } from 'vue-demi'

export interface VuePIXIRenderer<T = Container<ContainerChild>> extends _Renderer<T> {
  use: (options: RendererOptions | RendererOptions[]) => void
}

export interface RendererStacks {
  [key: string]: Omit<RendererOptions, 'name'>
}

export interface RendererOptions extends Partial<Omit<_RendererOptions<any, any>, 'createText' | 'createElement'>> {
  name: string
  createElement: (props: any) => any
}

