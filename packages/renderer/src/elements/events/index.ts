import type { Container, DisplayObject, DisplayObjectEvents } from 'pixi.js'

export type PixiEvents = DisplayObjectEvents & {
  // from container
  childAdded: [child: DisplayObject, container: Container, index: number]
  childRemoved: [child: DisplayObject, container: Container, index: number]
}
