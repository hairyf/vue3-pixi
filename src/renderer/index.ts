import type { VNodeProps } from 'vue-demi'
import { camelize, createRenderer, warn } from 'vue-demi'
import {
  AnimatedSprite,
  BitmapText,
  Container,
  Filter,
  Graphics,
  Mesh,
  NineSlicePlane,
  SimpleMesh,
  SimplePlane,
  SimpleRope,
  Sprite,
  Text,
  TilingSprite,
} from 'pixi.js'
import { patchProp } from './props'
import { normalizeTexture } from './utils'

interface CreatePixiRendererOptions {
  prefix?: string
}

export type PixiCustomElement = (props: (VNodeProps & { [key: string]: any }) | null) => any

const elements: Record<string, PixiCustomElement> = {
  Container: () => new Container(),
  Sprite: () => new Sprite(),
  Graphics: props => new Graphics(props?.geometry),
  Text: props => new Text(
    props?.text,
    props?.style,
    props?.canvas,
  ),
  BitmapText: props => new BitmapText(
    props?.text,
    props?.style,
  ),
  TilingSprite: props => new TilingSprite(
    normalizeTexture(props!.texture),
    props?.width,
    props?.height,
  ),
  AnimatedSprite: props => new AnimatedSprite(
    props!.textures,
    props?.autoUpdate,
  ),
  Mesh: props => new Mesh(
    props!.geometry,
    props!.shader,
    props?.state,
    props?.drawMode,
  ),
  NineSlicePlane: props => new NineSlicePlane(
    normalizeTexture(props!.texture),
    props?.leftWidth,
    props?.topHeight,
    props?.rightWidth,
    props?.bottomHeight,
  ),
  SimpleMesh: props => new SimpleMesh(
    props?.texture ? normalizeTexture(props.texture) : undefined,
    props?.vertices,
    props?.uvs,
    props?.indices,
    props?.drawMode,
  ),
  SimplePlane: props => new SimplePlane(
    normalizeTexture(props!.texture),
    props?.verticesX,
    props?.verticesY,
  ),
  SimpleRope: props => new SimpleRope(
    normalizeTexture(props!.texture),
    props?.points,
    props?.textureScale,
  ),
}

export function createPixiRenderer(options: CreatePixiRendererOptions = {}) {
  const { prefix = 'pixi' } = options

  return createRenderer<Container, Container>({
    createElement: (name, _, __, props) => {
      const element = props?.is?.(props) || createPixiElement(prefix, name, props)

      if (element instanceof Container)
        element.filters = []

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
        ? node.text = text
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
  return is(props)
}

function insertContainer(child: Container, parent: Container, anchor?: Container | null) {
  if (anchor)
    parent.addChildAt(child, parent.getChildIndex(anchor))
  else
    parent.addChild(child)
}

function insertFilter(child: any, parent: Container, _anchor: any) {
  function remove() {
    const index = parent.filters!.indexOf(child)
    if (index !== -1)
      parent.filters?.splice(index, 1)
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
