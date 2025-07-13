import type { MeshRope } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { Mesh } from 'pixi.js'
import { patchProp, renderer, setters } from '../renderer'
import { MeshRopeOptions } from 'pixi.js'

export type MeshElement = DefineContainerElement<MeshRope, MeshRopeOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Mesh: MeshElement
    PixiMesh: MeshElement
  }
}

renderer.use({
  name: 'Mesh',
  createElement: props => new Mesh(props),
  patchProp(el: Mesh, key, prev, next) {
    switch (key) {
      case 'geometry':
      case 'shader':
      case 'state':
        setters.unfirst(el, key, () => el[key] = next)
        break
      case 'roundPixels':
        setters.boolean(el, key, prev, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})