/* eslint-disable ts/ban-ts-comment */
import type { AnyFn } from '@vueuse/core'
import type { Container } from 'pixi.js'
import type { Renderer, RendererOptions } from 'vue-demi'
import { camelize } from 'vue-demi'
import { compilerOptions } from '../../compiler'
import { renderers } from './constants'
import { use } from './hooks'

const { assign } = Object

export function rendererWithCapture(options: RendererOptions<Container, Container>) {
  const notOverrides = ['createComment', 'insertStaticContent', 'createText', 'querySelector', 'createElement']
  for (const key in options) {
    if (notOverrides.includes(key))
      continue
    const rendererFn = options[key as keyof RendererOptions] as AnyFn

    function overwritePatchProp(el: any, prop: string, ...args: any[]) {
      return overwrite(el, camelize(prop), ...args)
    }
    function overwrite(el: any, ...args: any[]) {
      const overwriteFn = Reflect.get(renderers, el._vp_name)?.[key]
      return (overwriteFn ?? rendererFn)(el, ...args)
    }

    if (key === 'patchProp')
      options[key] = overwritePatchProp
    else
      // @ts-expect-error
      options[key] = overwrite
  }
  return options
}

export function rendererWithActions(
  renderer: Renderer<Container<Container>> & Record<string, any>,
) {
  const { createApp: _createApp } = renderer
  function createApp(...args: Parameters<typeof _createApp>) {
    const app = _createApp(...args)
    assign(app.config.compilerOptions, compilerOptions)
    return app
  }
  assign(renderer, { createApp, use })
}
