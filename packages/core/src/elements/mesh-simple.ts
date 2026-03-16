import type { SimpleMeshOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { MeshSimple } from 'pixi.js'
import { normalizeTexture, renderer } from '../renderer'

export type MeshSimpleElement = DefineContainerElement<MeshSimple, SimpleMeshOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MeshSimple: MeshSimpleElement
    PixiMeshSimple: MeshSimpleElement
  }
}

renderer.use({
  name: 'MeshSimple',
  createElement: props => new MeshSimple({ ...props, texture: normalizeTexture(props.texture) }),
})
