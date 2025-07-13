import type { MeshRope } from 'pixi.js'
import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { Mesh } from 'pixi.js'
import { patchProp, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp } from '../renderer/patchProp'
import { MeshRopeOptions } from 'pixi.js'

export type MeshProps = ExtractContainerProps<MeshRope, MeshRopeOptions>

export type MeshEvents = ExtractContainerEvents<MeshRope>

export type MeshAttributes = DefineAttributes<MeshProps, MeshEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Mesh: MeshAttributes
    PixiMesh: MeshAttributes
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
        setSkipFirstValue(el, key, () => el[key] = next)
        break
      case 'roundPixels':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})