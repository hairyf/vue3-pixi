import type { Renderer } from '@vue-pixi/renderer'
import { elements, pathProp } from './renderer'

const ProjectionRenderer: Renderer = {
  elements,
  pathProp,
}

export default ProjectionRenderer

export * from './global'
