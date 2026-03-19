import type { Container, Filter } from 'pixi.js'
import { Empty } from './custom'

const filterParentMap = new WeakMap<Filter, Container>()

export function getFilterParent(filter: Filter): Container | undefined {
  return filterParentMap.get(filter)
}

export function insertFilter(child: Filter, parent: Container, _anchor: any) {
  parent.filters ??= []
  parent.filters = Array.isArray(parent.filters) ? parent.filters : [parent.filters]

  filterParentMap.set(child, parent)

  parent.filters = [...parent.filters, child]
}

export function nextSiblingFilter(node: Filter) {
  const parent = filterParentMap.get(node)
  if (!parent)
    return null
  parent.filters ??= []
  parent.filters = Array.isArray(parent.filters) ? parent.filters : [parent.filters]

  const index = parent.filters.indexOf(node)
  if (parent.filters.length <= index + 1)
    return null

  return parent.filters[index + 1]
}

export function insertContainer(child: Container, parent: Container, anchor?: Container | null) {
  if (anchor)
    parent?.addChildAt(child, parent.getChildIndex(anchor))
  else if (child)
    parent.addChild(child)
}

export function nextSiblingContainer(node: Container) {
  if (!node.parent)
    return null
  const index = node.parent.getChildIndex(node)
  if (node.parent.children.length <= index + 1)
    return null
  return node.parent.getChildAt(index + 1) as Container ?? null
}

export function removeContainer(node: Container) {
  // If the node is already destroyed, return early
  if (!node || node.destroyed)
    return

  // Empty nodes are lightweight placeholders (comments/text) — just detach from parent
  if (node instanceof Empty) {
    node.parent?.removeChild(node)
    return
  }

  try {
    // PIXI v8 fix: Remove from parent BEFORE destroying. The batch renderer may have
    // already collected this node for the current frame's render pass. If we destroy
    // first (which nulls Mesh._geometry), the batch execute phase crashes with
    // "Cannot read properties of null (reading 'geometry')". Removing from parent first
    // ensures the node won't be in the next render pass's build phase.
    node.parent?.removeChild(node)
    node.destroy({ children: true })
  }
  catch {
    // During unmounting, if the Application has already been destroyed, the TexturePool may have been cleaned up
    // This causes the node to fail when trying to return textures to the TexturePool during destruction
    // Catch the error here to avoid crashes and mark the node as destroyed
    if (node && !node.destroyed) {
      // Silent handling: node errors when trying to clean up textures after Application is destroyed
      // This is normal because global resources have already been released
      node.destroyed = true
    }
  }
}

export function removeFilter(node: Filter) {
  const parent = filterParentMap.get(node)
  if (parent) {
    parent.filters = parent.filters.filter(filter => filter !== node)
    filterParentMap.delete(node)
  }
}
