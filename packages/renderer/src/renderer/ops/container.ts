import type { Container } from 'pixi.js'
import { ParticleContainer } from 'pixi.js'
import { Empty } from './define'

export function insertContainer(child: Container, parent: Container, anchor?: Container | null) {
  if (anchor)
    parent?.addChildAt(child, parent.getChildIndex(anchor))
  // fix: particle-container insert far comment error
  // if the element is empty, wait for subsequent additions to avoid affecting the collection of the first element
  else if (isInvalidElement(child, parent))
    setTimeout(() => parent.addChild(child))
  if (child)
    parent.addChild(child)
}

export function nextSiblingContainer(node: Container) {
  const index = node.parent.getChildIndex(node)
  if (node.parent.children.length <= index + 1)
    return null
  return node.parent.getChildAt(index + 1) as Container ?? null
}

function isInvalidElement(child: Container, parent: Container) {
  return child instanceof Empty && parent instanceof ParticleContainer
}
