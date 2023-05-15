import { patchProp } from './patch'
import { elements } from './elements'
import { isCustomFilter, isExistsEvent } from './utils'
import {
  Container,
  Filter,
  Text,
} from 'pixi.js'
import { camelize, createRenderer, warn } from 'vue-demi'

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
        if (isExistsEvent(props) && element.eventMode === 'auto')
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

function createPixiElement(prefix: string, name: string, props: any) {
  let is
  if (name.startsWith(prefix)) {
    name = camelize(name)
    is = elements[name.slice(prefix.length)]
  }
  else {
    name = camelize(name)
    name = name.charAt(0).toUpperCase() + name.slice(1)
    is = elements[name]
  }
  if (!is) {
    warn(`Unknown element ${name}`)
    return new Container()
  }
  return is(props ?? {})
}

function insertContainer(child: Container, parent: Container, anchor?: Container | null) {
  if (anchor)
    parent.addChildAt(child, parent.getChildIndex(anchor))
  else
    parent.addChild(child)
}

function insertFilter(child: any, parent: Container, _anchor: any) {
  function remove() {
    parent.filters?.splice(parent.filters.indexOf(child) >>> 0, 1)
  }
  child.parent = parent
  child.destroy = remove
  parent.filters!.push(child)
}

function nextSiblingFilter(node: any) {
  const index = node.parent.filters!.indexOf(node)
  if (node.parent.filters!.length <= index + 1)
    return null
  return node
}

function nextSiblingContainer(node: Container) {
  const index = node.parent.getChildIndex(node)
  if (node.parent.children.length <= index + 1)
    return null
  return node.parent.getChildAt(index + 1) as Container ?? null
}

export const { createApp, render } = createPixiRenderer()
