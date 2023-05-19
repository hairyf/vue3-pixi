import type { CustomElement } from './elements'
import { elements } from './elements'

export const context = {
  elements: { ...elements },
  patchProps: [] as ((el: any, key: string, prevValue: any, nextValue: any) => boolean | void)[],
}

export interface Renderer {
  elements: Record<string, CustomElement>
  pathProp: (el: any, key: string, prevValue: any, nextValue: any) => boolean | void
}

export function use(renderer: Renderer) {
  Object.assign(context.elements, renderer.elements)
  context.patchProps.push(renderer.pathProp)
}
