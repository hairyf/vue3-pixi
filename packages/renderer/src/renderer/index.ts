/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { } from 'pixi.js'
import {
  BitmapText,
  Container,
  DisplayObject,
  Filter,
  Text,
} from 'pixi.js'
import { createRenderer, warn } from 'vue-demi'
import { isCustomFilter, isOn } from '../utils'
import { isCustomElement } from '../compiler'
import { createPixiElement, insertContainer, insertFilter, nextSiblingContainer, nextSiblingFilter, parentNode } from './options'
import { patchProp } from './patch'

export interface CreatePixiRendererOptions {
  prefix?: string
}

class Empty extends Container {
  render() {}
  visible = false
  renderable = false
}

export function createPixiRenderer(options: CreatePixiRendererOptions = {}) {
  const { prefix = 'pixi' } = options

  const renderer = createRenderer<Container, Container>({
    createElement: (name, _, __, props) => {
      const element = isCustomFilter(prefix, name)
        ? props?.is?.(props)
        : createPixiElement(prefix, name, props)

      if (element instanceof DisplayObject) {
        element.filters = []
        // @ts-expect-error
        if (isOn(props) && element.eventMode === 'auto')
        // @ts-expect-error
          element.eventMode = 'static'
      }
      return element
    },

    patchProp,

    parentNode,
    createText: (text): any => text ? new Text(text) : null,
    createComment: () => new Empty(),
    remove: child => child.destroy(),
    insert: (child, parent, anchor) => {
      if (child instanceof Filter)
        return insertFilter(child, parent, anchor)
      if (parent instanceof Container && child instanceof DisplayObject)
        return insertContainer(child, parent, anchor)
    },
    nextSibling: (node) => {
      if (node instanceof Filter)
        return nextSiblingFilter(node)
      if (node instanceof DisplayObject)
        return nextSiblingContainer(node)
    },
    setElementText: (node, text) => {
      text = text.replace(/\\n/g, '\n')
      node instanceof Text || node instanceof BitmapText
        ? node.text = text.trim()
        : warn(`Text is only supported with ${prefix}-text element`)
    },
    setText: (node, text) => {
      text = text.replace('\\n', '\n')
      node instanceof Text || node instanceof BitmapText
        ? node.text = text.trim()
        : warn(`Text is only supported with ${prefix}-text element`)
    },
  })

  return renderer
}

export const renderer = createPixiRenderer()

export const createApp: typeof renderer.createApp = (...args: any[]) => {
  // @ts-expect-error
  const app = renderer.createApp(...args)
  app.config.compilerOptions.isCustomElement = isCustomElement
  return app
}
export const render = renderer.render

export { setObject, setValue, setSkipFirstValue, setPoint } from './setter'
