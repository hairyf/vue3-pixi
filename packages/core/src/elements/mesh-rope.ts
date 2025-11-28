import type { MeshRopeOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { MeshRope } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type MeshRopeElement = DefineContainerElement<MeshRope, MeshRopeOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MeshRope: MeshRopeElement
    PixiMeshRope: MeshRopeElement
  }
}

renderer.use({
  name: 'MeshRope',
  createElement: props => new MeshRope({ ...props, texture: normalizeTexture(props.texture) }),
})
