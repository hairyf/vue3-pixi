import type { AllowedEvents, DefineElement } from '../types'
import { BLEND_MODES, ColorSource, Geometry, Mesh, Shader, State, Texture, Topology } from 'pixi.js'
import { patchProp, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp } from '../renderer/patchProp'

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

export interface MeshProps {
  geometry: Geometry
  shader: Shader
  blendMode?: BLEND_MODES
  drawMode?: Topology
  material?: Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: State
  texture?: string | Texture
  tint?: ColorSource
  canvasPadding?: number
}

export interface MeshEvents extends AllowedEvents {
  render: [Mesh]
}

export type MeshElement = DefineElement<MeshProps, MeshEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Mesh: MeshElement
    PixiMesh: MeshElement
  }
}
