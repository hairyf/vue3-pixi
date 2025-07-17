import type { ElementNamespace, VNodeProps } from 'vue-demi'
import {
  BitmapText,
  Container,
  Filter,
  Text,
  Texture,
} from 'pixi.js'
import { camelize, markRaw, warn } from 'vue-demi'
import { Empty, insertContainer, insertFilter, nextSiblingContainer, nextSiblingFilter, renderers } from './internal'
import { isOn, patchs, withThisRender } from './utils'

export function createElement(prefix: string, name: string, _?: ElementNamespace, _1?: string, props?: (VNodeProps & { [key: string]: any }) | null): any {
  let is
  if (name.startsWith(prefix)) {
    name = camelize(name)
    is = renderers[name.slice(prefix.length)].createElement
  }
  else {
    name = camelize(name)
    name = name.charAt(0).toUpperCase() + name.slice(1)
    is = renderers[name].createElement
  }
  if (!is) {
    warn(`Unknown element ${name}`)
    is = () => new Container()
  }
  props ??= {}

  withThisRender(props)

  const element = is(props)

  if (element instanceof Container && isOn(props) && element.eventMode === 'passive')
    element.eventMode = 'static'

  if (element instanceof Filter)
    element._vp_filter = true

  markRaw(element)

  return element
}

export function parentNode(node: any) {
  return node?.parent
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
  if (Reflect.get(child, '_vp_filter'))
    insertFilter(child as unknown as Filter, parent, anchor)
  else
    insertContainer(child, parent, anchor)
}

export function nextSibling(node: Container): any {
  if (Reflect.get(node, '_vp_filter'))
    return nextSiblingFilter(node as unknown as Filter)
  else
    return nextSiblingContainer(node)
}

export function setText(prefix: string, node: Container, text: string) {
  text = text.replace(/\\n/g, '\n')
  node instanceof Text || node instanceof BitmapText
    ? node.text = text.trim()
    : warn(`Text is only supported with ${prefix}-text element`)
}

export function patchProp(el: any, prevValue: any, key: string, nextValue: any) {
  if (patchs.skip(key))
    return

  if (patchs.events.effect(el, key, prevValue, nextValue))
    return
  if (patchs.events.general(el, key, prevValue, nextValue))
    return
  if (patchs.texture(el, key, prevValue, nextValue))
    return

  if (patchs.boolean(el, key, prevValue, nextValue))
    return

  if (patchs.point(el, key, prevValue, nextValue))
    return

  patchs.default(el, key, prevValue, nextValue)
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
  patchProp,
}
