/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Container } from 'pixi.js'
import { camelize, warn } from 'vue-demi'
import { context } from '../context'

export function createPixiElement(prefix: string, name: string, props: any) {
  const { elements } = context
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
    is = () => new Container()
  }
  return is(props ?? {})
}

let stage: any

export function parentNode(node: any) {
  node && (node.__parent ??= node.parent)
  return node?.__parent || node?.parent || stage
}

export function insertContainer(child: Container, parent: Container, anchor?: Container | null) {
  parent && !parent.parent && (stage ??= parent)
  if (anchor)
    parent?.addChildAt(child, parent.getChildIndex(anchor))
  else if (child)
    parent?.addChild(child)
}

export function insertFilter(child: any, parent: Container, _anchor: any) {
  function remove() {
    parent.filters?.splice(parent.filters.indexOf(child) >>> 0, 1)
  }
  child.parent = parent
  child.destroy = remove
  parent.filters!.push(child)
}

export function nextSiblingFilter(node: any) {
  const index = node.parent.filters!.indexOf(node)
  if (node.parent.filters!.length <= index + 1)
    return null
  return node.parent.filters[index + 1]
}

export function nextSiblingContainer(node: Container) {
  if (!node.parent)
    return null
  const index = node.parent.getChildIndex(node)
  if (node.parent.children.length <= index + 1)
    return null
  return node.parent.getChildAt(index + 1) as Container ?? null
}
