import type { RendererOptions } from './types'
import { renderers } from './constants'

export function baseUse(options: RendererOptions) {
  const { createElement: _createElement, name } = options
  function createElement(...args: any) {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const element = _createElement(...args)
    element._vp_name = name
    return element
  }
  options.createElement = createElement
  renderers[name] = options
}

export function use(options: RendererOptions | RendererOptions[]) {
  if (Array.isArray(options))
    options.forEach(baseUse)
  else
    baseUse(options)
}
