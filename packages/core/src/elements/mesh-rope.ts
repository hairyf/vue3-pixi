import type { AllowedEvents, DefineElement } from '../types'
import { BLEND_MODES, ColorSource, MeshRope, Point, Shader, State, Texture, Topology } from 'pixi.js'
import { normalizeTexture, patchProp, renderer } from '../renderer'

renderer.use({
  name: 'MeshRope',
  createElement: (props) => {
    return new MeshRope({
      texture: normalizeTexture(props.texture),
      points: props.points,
    })
  },
  patchProp(el: MeshRope, key, prev, next) {
    switch (key) {
      case 'texture':
      case 'points':
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})

export interface MeshRopeProps {
  texture: string | Texture
  points: Point[]
  textureScale?: number
  autoUpdate?: number
  shader?: Shader
  blendMode?: BLEND_MODES
  drawMode?: Topology
  material?: Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: State
  tint?: ColorSource
  canvasPadding?: number
}

export interface MeshRopeEvents extends AllowedEvents {
  render: [MeshRope]
}

export type MeshRopeElement = DefineElement<MeshRopeProps, MeshRopeEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MeshRope: MeshRopeElement
    PixiMeshRope: MeshRopeElement
  }
}
