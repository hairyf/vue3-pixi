import type { Container, DisplayObject, DisplayObjectEvents } from 'pixi.js'

export type PixiEvents = DisplayObjectEvents & {
  // from container
  childAdded: [DisplayObject, Container, number]
  childRemoved: [DisplayObject, Container, number]
}
