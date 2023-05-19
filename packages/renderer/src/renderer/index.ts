/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Container,
  Filter,
  Text,
} from 'pixi.js'
import { createRenderer, warn } from 'vue-demi'
import { isCustomFilter, isExistsEvent } from '../utils'
import { createPixiElement, insertContainer, insertFilter, nextSiblingContainer, nextSiblingFilter } from './options'
import { patchProp } from './patch'

interface CreatePixiRendererOptions {
  prefix?: string
}

export function createPixiRenderer(options: CreatePixiRendererOptions = {}) {
  const { prefix = 'pixi' } = options

  return createRenderer<Container, Container>({
    createElement: (name, _, __, props) => {
      const element = isCustomFilter(prefix, name)
        ? props?.is?.(props)
        : createPixiElement(prefix, name, props)

      if (element instanceof Container) {
        element.filters = []
        // @ts-expect-error
        if (isExistsEvent(props) && element.eventMode === 'auto')
        // @ts-expect-error
          element.eventMode = 'static'
      }

      return element
    },

    patchProp,

    parentNode: node => node.parent,
    createText: text => new Text(text),
    createComment: () => new Container(),
    remove: child => child.destroy(),
    insert: (child, parent, anchor) => {
      if (child instanceof Filter)
        insertFilter(child, parent, anchor)
      else
        insertContainer(child, parent, anchor)
    },
    nextSibling: (node) => {
      if (node instanceof Filter)
        return nextSiblingFilter(node)
      else
        return nextSiblingContainer(node)
    },
    setElementText: (node, text) => {
      node instanceof Text
        ? node.text = text.trim()
        : warn(`Text is only supported with ${prefix}-text element`)
    },
    setText: (node, text) => {
      node instanceof Text && (node.text = text)
    },
  })
}

export const { createApp, render } = createPixiRenderer()
export { setObject, setValue, setSkipFirstValue, setPoint } from './setter'
