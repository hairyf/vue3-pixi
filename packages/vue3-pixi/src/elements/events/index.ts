import type { Container, DisplayObject } from 'pixi.js'

export interface PixiEvents {
  added: [container: Container]
  childAdded: [child: DisplayObject, container: Container, index: number]
  childRemoved: [child: DisplayObject, container: Container, index: number]
  destroyed: []
  removed: [container: Container]
}
