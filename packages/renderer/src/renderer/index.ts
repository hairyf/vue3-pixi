import type { Container } from 'pixi.js'

import { createRenderer as _createRenderer } from 'vue-demi'
import { isCustomElement } from '../compiler'

import { patchProp } from './patchProp'
import { nodeOps as _nodeOps } from './nodeOps'

const { createElement, setText, ...nodeOps } = _nodeOps
const { createApp: _createApp, render: _render } = createRenderer()

export interface RendererOptions {
  prefix?: string
}

export function createRenderer(options: RendererOptions = {}) {
  const { prefix = 'pixi' } = options
  const renderer = _createRenderer<Container, Container>({
    createElement: (name, _, __, props) => createElement(prefix, name, props),
    setElementText: (node, text) => setText(prefix, node, text),
    setText: (node, text) => setText(prefix, node, text),
    patchProp,
    ...nodeOps,
  })
  return renderer
}

export const createApp: typeof _createApp = (...args: any[]) => {
  const app = (_createApp as any)(...args)
  Object.assign(app.config.compilerOptions, { isCustomElement })
  return app
}
export const render: typeof _render = (...args: any[]) => {
  return (render as any)(...args)
}

export * from './setter'
export * from './use'
