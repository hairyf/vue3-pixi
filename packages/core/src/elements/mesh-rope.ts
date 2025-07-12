import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { MeshRope, Point, Texture } from 'pixi.js'
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

export type MeshRopeProps = ExtractContainerProps<MeshRope, {
  texture: string | Texture
  points: Point[]
}>

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
