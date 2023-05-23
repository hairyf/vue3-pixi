import type { Container } from 'pixi.js'

export function insertFilter(child: any, parent: Container, _anchor: any) {
  if (!parent.filters)
    parent.filters = []
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
