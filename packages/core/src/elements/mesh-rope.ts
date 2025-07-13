import type { MeshRopeOptions } from 'pixi.js'
import type { DefineContainerAttributes } from '../types'
import { MeshRope } from 'pixi.js'
import { normalizeTexture, patchProp, renderer } from '../renderer'

export type MeshRopeAttributes = DefineContainerAttributes<MeshRope, MeshRopeOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MeshRope: MeshRopeAttributes
    PixiMeshRope: MeshRopeAttributes
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