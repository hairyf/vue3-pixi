import type { Container, Filter } from 'pixi.js'

export function insertFilter(child: Filter, parent: Container, _anchor: any) {
  parent.filters ??= []
  parent.filters = Array.isArray(parent.filters) ? parent.filters : [parent.filters]

  function remove() {
    const index = (parent.filters as Filter[]).indexOf(child)
    parent.filters = [...parent.filters]?.splice(index >>> 0, 1)
  }

  child.parent = parent
  child.destroy = remove

  parent.filters = [...parent.filters, child]
}

export function nextSiblingFilter(node: Filter) {
  node.parent.filters ??= []
  node.parent.filters = Array.isArray(node.parent.filters) ? node.parent.filters : [node.parent.filters]

  const index = node.parent.filters!.indexOf(node)
  if (node.parent.filters!.length <= index + 1)
    return null

  return node.parent.filters?.[index + 1]
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

  try {
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
  node.parent.filters = node.parent.filters.filter(filter => filter !== node)
}
