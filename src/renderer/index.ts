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
    createElement: (name, _, __, props) => {
      const Constructor = findConstructor(prefix, name)

      if (!Constructor) {
        warn(`Unknown element ${name}`)
        return new Container()
      }

      switch (Constructor) {
        case Graphics:
          return new Constructor(props?.geometry)
        case Text:
          return new Constructor(props?.text, props?.style, props?.canvas)
        case BitmapText:
          return new Constructor(props?.text, props?.style)
        default:
          return new Constructor()
      }
    },

    patchProp,

    parentNode: node => node.parent,
    createText: text => new Text(text),
    createComment: () => new Container(),
    remove: child => child.destroy(),
    insert: (child, parent, anchor) => {
      if (anchor)
        parent.addChildAt(child, parent.getChildIndex(anchor))
      else
        parent.addChild(child)
    },
    nextSibling: (node) => {
      const index = node.parent.getChildIndex(node)
      if (node.parent.children.length <= index + 1)
        return null
      return node.parent.getChildAt(index + 1) as Container ?? null
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

function findConstructor(prefix: string, name: string) {
  let c
  if (name.startsWith(prefix)) {
    name = camelize(name)
    c = elements[name.slice(prefix.length)]
  }
  else {
    name = camelize(name)
    name = name.charAt(0).toUpperCase() + name.slice(1)
    c = elements[name]
  }
  return c as undefined | (new (...args: any) => Container)
}

export const { createApp, render } = createPixiRenderer()
