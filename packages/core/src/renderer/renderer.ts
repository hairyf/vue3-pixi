import type { Container } from 'pixi.js'
import type { VuePIXIRenderer } from '../types'
import { createRenderer as _createRenderer } from 'vue-demi'
import { rendererWithActions, rendererWithCapture } from './internal'
import { nodeOps as _nodeOps } from './nodeOps'

export function createRenderer(options: { prefix?: string } = {}) {
  const { createElement, setText, ...nodeOps } = _nodeOps
  const { prefix = 'pixi' } = options
  const rendererOptions = rendererWithCapture({
    createElement: (...args) => createElement(prefix, ...args),
    setElementText: (...args) => setText(prefix, ...args),
    setText: (...args) => setText(prefix, ...args),
    ...nodeOps,
  })
  return _createRenderer<Container, Container>(rendererOptions)
}

export const renderer = createRenderer() as VuePIXIRenderer

rendererWithActions(renderer)

export const createApp = renderer.createApp
export const render = renderer.render
