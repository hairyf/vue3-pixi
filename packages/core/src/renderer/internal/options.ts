import type { ContainerChild } from 'pixi.js'
import { Container, Filter } from 'pixi.js'
import { Empty } from './custom'

const filterParentMap = new WeakMap<Filter, Container>()
const placeholderParentMap = new WeakMap<Container, Container>()
// Vue's host order includes filters and placeholders, not just Pixi's drawable children.
const hostChildrenMap = new WeakMap<Container, (Container | Filter)[]>()

export function getContainerParent(node: Container) {
  return placeholderParentMap.get(node) ?? node.parent
}

function detachHostChild(child: Container | Filter, parent: Container) {
  const children = hostChildrenMap.get(parent)
  const index = children?.indexOf(child) ?? -1
  if (index >= 0)
    children!.splice(index, 1)
}

function getHostChildren(parent: Container) {
  const children = hostChildrenMap.get(parent)
  if (!children)
    return
  for (let i = children.length - 1; i >= 0; i--) {
    const node = children[i]
    const currentParent = node instanceof Filter ? filterParentMap.get(node) : getContainerParent(node)
    if (currentParent !== parent)
      children.splice(i, 1)
  }
  // Native add/remove/reorder calls must remain visible to Vue's host operations.
  let anchor: Container | undefined
  for (let i = parent.children.length - 1; i >= 0; i--) {
    const child = parent.children[i]
    const index = children.indexOf(child)
    const nextChild = children.slice(index + 1).find(node => node instanceof Container && node.parent === parent)
    if (index < 0 || nextChild !== anchor) {
      if (index >= 0)
        children.splice(index, 1)
      children.splice(anchor ? children.indexOf(anchor) : children.length, 0, child)
    }
    anchor = child
  }
  return children
}

function insertHostChild(child: Container | Filter, parent: Container, anchor?: Container | Filter | null) {
  let children = getHostChildren(parent)
  if (!children) {
    children = [...parent.children]
    hostChildrenMap.set(parent, children)
    parent.once('destroyed', () => {
      for (const node of hostChildrenMap.get(parent) ?? []) {
        if (node instanceof Empty && placeholderParentMap.get(node) === parent)
          placeholderParentMap.delete(node)
        if (node instanceof Filter && filterParentMap.get(node) === parent) {
          filterParentMap.delete(node)
          node.destroy()
        }
      }
      hostChildrenMap.delete(parent)
    })
  }
  const previousParent = child instanceof Filter ? filterParentMap.get(child) : getContainerParent(child)
  if (previousParent)
    detachHostChild(child, previousParent)
  const index = anchor ? children.indexOf(anchor) : -1
  children.splice(index < 0 ? children.length : index, 0, child)
  return children.slice(children.indexOf(child) + 1)
}

function nextHostSibling(node: Container | Filter, parent: Container) {
  const children = getHostChildren(parent)
  const index = children?.indexOf(node) ?? -1
  return index >= 0 ? children![index + 1] ?? null : undefined
}

/** Destroy renderer-managed filters; prop/imperative filters remain owned by the caller. */
function destroyFilters(node: Container) {
  const stack: Container[] = [node]
  for (let i = 0; i < stack.length; i++) {
    const container = stack[i]
    const filters = container.filters
    if (filters) {
      const arr = Array.isArray(filters) ? filters : [filters]
      for (const filter of arr) {
        if (filterParentMap.get(filter) === container) {
          filterParentMap.delete(filter)
          filter.destroy()
        }
      }
    }
    // Collect descendants for breadth-first walk
    for (const child of container.children as ContainerChild[]) {
      if (child instanceof Container && !child.destroyed)
        stack.push(child)
    }
  }
}

export function getFilterParent(filter: Filter): Container | undefined {
  return filterParentMap.get(filter)
}

export function insertFilter(child: Filter, parent: Container, anchor?: Container | Filter | null) {
  if (child === anchor)
    return
  const previousParent = filterParentMap.get(child)
  const following = insertHostChild(child, parent, anchor)
  if (previousParent && previousParent !== parent)
    previousParent.filters = previousParent.filters.filter(filter => filter !== child)
  const current = parent.filters
  const filters = (Array.isArray(current) ? current : current ? [current] : []).filter(filter => filter !== child)
  const nextFilter = following.find(node => node instanceof Filter)
  const index = nextFilter ? filters.indexOf(nextFilter as Filter) : -1
  filters.splice(index < 0 ? filters.length : index, 0, child)
  filterParentMap.set(child, parent)
  parent.filters = filters
}

export function nextSiblingFilter(node: Filter) {
  const parent = filterParentMap.get(node)
  if (!parent)
    return null
  return nextHostSibling(node, parent) ?? null
}

export function insertContainer(child: Container, parent: Container, anchor?: Container | Filter | null) {
  if (child === anchor)
    return
  let following: (Container | Filter)[]
  if (hostChildrenMap.has(parent) || (child instanceof Empty && !parent.allowChildren)) {
    following = insertHostChild(child, parent, anchor)
  }
  else {
    const previousParent = getContainerParent(child)
    if (previousParent)
      detachHostChild(child, previousParent)
    following = anchor ? [anchor] : []
  }
  placeholderParentMap.delete(child)
  if (child instanceof Empty && !parent.allowChildren) {
    child.parent?.removeChild(child)
    placeholderParentMap.set(child, parent)
    return
  }
  const nextChild = following.find(node => node instanceof Container && node.parent === parent)
  if (nextChild) {
    let index = parent.getChildIndex(nextChild as Container)
    if (child.parent === parent && parent.getChildIndex(child) < index)
      index--
    parent.addChildAt(child, index)
  }
  else {
    parent.addChild(child)
  }
}

export function nextSiblingContainer(node: Container) {
  const parent = getContainerParent(node)
  if (!parent)
    return null
  const sibling = nextHostSibling(node, parent)
  if (sibling !== undefined)
    return sibling
  const index = parent.getChildIndex(node)
  if (parent.children.length <= index + 1)
    return null
  return parent.getChildAt(index + 1) as Container ?? null
}

export function removeContainer(node: Container) {
  // If the node is already destroyed, return early
  if (!node || node.destroyed)
    return

  const parent = getContainerParent(node)
  if (parent)
    detachHostChild(node, parent)
  placeholderParentMap.delete(node)

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

    // PIXI does not destroy attached filters. Clean up declarative filter nodes,
    // but leave externally owned filters alive: they may be shared by other containers.
    destroyFilters(node)

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
    detachHostChild(node, parent)
    parent.filters = parent.filters.filter(filter => filter !== node)
    filterParentMap.delete(node)
  }
}
