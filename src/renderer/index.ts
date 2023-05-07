import { camelize, createRenderer, warn } from 'vue-demi'
import {
  AnimatedSprite,
  BitmapText,
  Container,
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

interface CreatePixiRendererOptions {
  prefix?: string
}

const elements = {
  Container,
  Sprite,
  Graphics,
  Text,
  BitmapText,
  TilingSprite,
  AnimatedSprite,
  Mesh,
  NineSlicePlane,
  SimpleMesh,
  SimplePlane,
  SimpleRope,
} as Record<string, new (...args: any) => Container>

export function createPixiRenderer(options: CreatePixiRendererOptions = {}) {
  const { prefix = 'pixi' } = options

  return createRenderer<Container, Container>({
    createElement: (name, _, __, vnodeProps) => {
      const Constructor = findConstructor(prefix, name)

      if (Constructor) {
        if (Constructor === Graphics)
          return new Constructor(vnodeProps?.geometry)
        if (Constructor === Text) {
          return new Constructor(
            vnodeProps?.text,
            vnodeProps?.style,
            vnodeProps?.canvas,
          )
        }
        if (Constructor === BitmapText)
          return new Constructor(vnodeProps?.text, vnodeProps?.style)

        return new Constructor()
      }

      warn(`Unknown element ${name}`)

      return new Container()
    },

    patchProp,

    insert: (child, parent, anchor) => {
      if (anchor)
        parent.addChildAt(child, parent.getChildIndex(anchor))
      else
        parent.addChild(child)
    },
    remove: (child) => {
      child.destroy()
    },
    createText: (text) => {
      return new Text(text)
    },
    createComment: () => {
      return new Container()
    },
    nextSibling: (node) => {
      const index = node.parent.getChildIndex(node)
      if (node.parent.children.length <= index + 1)
        return null
      return (node.parent.getChildAt(index + 1) as Container) ?? null
    },
    parentNode: (node) => {
      return node.parent
    },
    setElementText: (node, text) => {
      if (node instanceof Text)
        node.text = text
      else
        warn(`Text is only supported with ${prefix}-text element`)
    },
    setText: (node, text) => {
      if (node instanceof Text)
        node.text = text
    },
  })
}

function findConstructor(prefix: string, name: string) {
  let ctor
  if (name.startsWith(prefix)) {
    name = camelize(name)
    ctor = elements[name.slice(prefix.length)]
  }
  else {
    name = camelize(name)
    name = name.charAt(0).toUpperCase() + name.slice(1)
    ctor = elements[name]
  }
  return ctor as undefined | (new (...args: any) => Container)
}

export const { createApp, render } = createPixiRenderer()
