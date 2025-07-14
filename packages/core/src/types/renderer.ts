import type { Container, ContainerChild } from 'pixi.js'

import type { RendererOptions as _RendererOptions, Renderer } from 'vue-demi'

export interface VuePIXIRenderer<T = Container<ContainerChild>> extends Renderer<T> {
  use: (options: RendererOptions | RendererOptions[]) => void
}

export interface RendererStacks {
  [key: string]: Omit<RendererOptions, 'name'>
}

export interface RendererOptions extends Partial<Omit<_RendererOptions<any, any>, 'createText' | 'createElement'>> {
  name: string
  createElement: (props: any) => any
}
