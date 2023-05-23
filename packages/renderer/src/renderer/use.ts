import type { CustomElement } from './ops'
import { elements } from './ops'
import { patchProps } from './patchProp'

export interface Renderer {
  elements: Record<string, CustomElement>
  pathProp: (el: any, key: string, prevValue: any, nextValue: any) => boolean | void
}

export function use(renderer: Renderer) {
  Object.assign(elements, renderer.elements)
  patchProps.push(renderer.pathProp)
}
