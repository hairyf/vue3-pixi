import type { ContainerChild, ContainerEvents } from 'pixi.js'

export interface AllowedEvents<C extends ContainerChild = ContainerChild> extends ContainerEvents<C> { }
