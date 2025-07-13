import type { Point, Texture } from 'pixi.js'
import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { MeshRope } from 'pixi.js'
import { normalizeTexture, patchProp, renderer } from '../renderer'

export type MeshRopeProps = ExtractContainerProps<MeshRope, { texture: string | Texture, points: Point[] }>

export type MeshRopeEvents = ExtractContainerEvents<MeshRope, { render: [MeshRope] }>

export type MeshRopeElement = DefineAttributes<MeshRopeProps, MeshRopeEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MeshRope: MeshRopeElement
    PixiMeshRope: MeshRopeElement
  }
}

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