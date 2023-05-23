/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BitmapText, Container, DisplayObject, Filter, Text, Texture } from 'pixi.js'
import { markRaw, warn } from 'vue-demi'
import { isCustomFilter } from '../utils'
import {
  Empty,
  createPixiElement,
  insertContainer,
  insertFilter,
  nextSiblingContainer,
  nextSiblingFilter,
} from './ops'

export function createElement(prefix: string, name: string, props: any) {
  const element = isCustomFilter(prefix, name)
    ? props?.is?.(props)
    : createPixiElement(prefix, name, props)
  if (element instanceof DisplayObject)
  // @ts-expect-error
    isOn(props) && element.eventMode === 'auto' && (element.eventMode = 'static')
  markRaw(element)
  return element
}

export function parentNode(node: any) {
  node && (node.__parent ??= node.parent)
  return node?.__parent || node?.parent
}

export function createText(text: string) {
  text = text.replace(/\\n/g, '\n')
  return text ? new Text(text) : new Empty(Texture.EMPTY) as any
}

export function createComment() {
  return new Empty(Texture.EMPTY)
}

export function remove(node: Container) {
  node.destroy()
}

export function insert(child: Container, parent: Container, anchor?: Container | null) {
  if (child instanceof Filter)
    return insertFilter(child, parent, anchor)
  if (parent instanceof Container && child instanceof DisplayObject)
    return insertContainer(child, parent, anchor)
}

export function nextSibling(node: Container) {
  if (node instanceof Filter)
    return nextSiblingFilter(node)
  if (node instanceof DisplayObject)
    return nextSiblingContainer(node)
}

export function setText(prefix: string, node: Container, text: string) {
  text = text.replace(/\\n/g, '\n')
  node instanceof Text || node instanceof BitmapText
    ? node.text = text.trim()
    : warn(`Text is only supported with ${prefix}-text element`)
}

export const nodeOps = {
  createElement,
  parentNode,
  createText,
  createComment,
  remove,
  insert,
  nextSibling,
  setText,
}
