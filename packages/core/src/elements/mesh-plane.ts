import type { MeshPlaneOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { MeshPlane } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type MeshPlaneElement = DefineContainerElement<MeshPlane, MeshPlaneOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MeshPlane: MeshPlaneElement
    PixiMeshPlane: MeshPlaneElement
  }
}

renderer.use({
  name: 'MeshPlane',
  createElement: props => new MeshPlane({ ...props, texture: normalizeTexture(props.texture) }),
})
