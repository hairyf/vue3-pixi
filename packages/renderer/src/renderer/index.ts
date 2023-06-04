import type { Container, DisplayObject } from 'pixi.js'

import type { Renderer as _Renderer } from 'vue-demi'
import { createRenderer as _createRenderer } from 'vue-demi'

import { isCustomElement } from '../compiler'
import { patchProp, patchProps } from './patchProp'
import { nodeOps as _nodeOps } from './nodeOps'
import type { CustomElement } from './ops'
import { elements } from './ops'

export interface RendererOptions {
  prefix?: string
}

export interface CustomRendererOptions {
  elements: Record<string, CustomElement>
  pathProp?: (el: any, key: string, prevValue: any, nextValue: any) => boolean | void
}
export interface Renderer<T = Container<DisplayObject>> extends _Renderer<T> {
  use: (options: CustomRendererOptions) => void
}

const { createElement, setText, ...nodeOps } = _nodeOps

function createRenderer(options: RendererOptions = {}) {
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

const renderer = createRenderer() as Renderer

const _createApp = renderer.createApp
const _render = renderer.render
function $createApp(...args: any[]) {
  const app = (_createApp as any)(...args)
  Object.assign(app.config.compilerOptions, {
    isCustomElement,
  })
  return app
}
function $render(...args: any[]) {
  return (_render as any)(...args)
}
function $use(options: CustomRendererOptions) {
  Object.assign(elements, options.elements)
  options.pathProp && patchProps.push(options.pathProp)
}
Object.assign(renderer, {
  createApp: $createApp,
  render: $render,
  use: $use,
})

export const createApp = renderer.createApp
export const render = renderer.render
export { renderer, createRenderer }
export * from './setter'
