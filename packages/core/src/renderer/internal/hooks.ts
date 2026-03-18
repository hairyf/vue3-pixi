import type { RendererOptions } from '../../types'
import { renderers } from './constants'

export function baseUse(options: RendererOptions) {
  const { createElement: _createElement, name } = options
  function createElement(...args: Parameters<typeof _createElement>) {
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
