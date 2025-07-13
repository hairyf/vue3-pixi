/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Container } from 'pixi.js'
import type { Renderer, RendererOptions } from 'vue-demi'
import { camelize } from 'vue-demi'
import { isCustomElement } from '../../compiler'
import { renderers } from './constants'
import { use } from './hooks'

const { assign } = Object

export function rendererWithCapture(options: RendererOptions<Container, Container>) {
  const notOverrides = ['createComment', 'insertStaticContent', 'createText', 'querySelector', 'createElement']
  for (const key in options) {
    if (notOverrides.includes(key))
      continue
    // @ts-expect-error
    const fn = options[key]
    if (key === 'patchProp') {
      options[key] = (el, pKey, ...args) => {
        const inFn = renderers[el._vp_name]?.[key]
        pKey = camelize(pKey)
        return inFn ? inFn(el, pKey, ...args) : fn(el, pKey, ...args)
      }
      continue
    }
    // @ts-expect-error
    options[key] = (el, ...args: any[]) => {
      // @ts-expect-error
      const inFn = renderers[el._vp_name]?.[key]
      return inFn ? inFn?.(el, ...args) : fn(el, ...args)
    }
  }
  return options
}

export function rendererWithActions(
  renderer: Renderer<Container<Container>> & Record<string, any>,
) {
  const { createApp: _createApp, render: render } = renderer
  function createApp(...args: Parameters<typeof _createApp>) {
    const app = _createApp(...args)
    assign(app.config.compilerOptions, { isCustomElement })
    return app
  }

  assign(renderer, { createApp, render, use })
}
