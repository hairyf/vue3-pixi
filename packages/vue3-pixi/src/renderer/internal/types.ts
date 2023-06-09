import type { VNodeProps, RendererOptions as _RendererOptions } from 'vue-demi'

export interface RendererStacks {
  [key: string]: Omit<RendererOptions, 'name'>
}

export interface RendererOptions extends Partial<Omit<_RendererOptions<any, any>, 'createText' | 'createElement'>> {
  name: string
  createElement(props: VNodeProps & { [key: string]: any }): any
}

export type Renderer = RendererOptions | RendererOptions[]

