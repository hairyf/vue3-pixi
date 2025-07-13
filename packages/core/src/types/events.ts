import type { ContainerChild, ContainerEvents } from 'pixi.js'
import { Overwrite } from './utils'

export interface AllowedContainerEvents<C extends ContainerChild = ContainerChild> extends ContainerEvents<C> { }

export type ExtractContainerEvents<_T, U = {}> = Overwrite<AllowedContainerEvents, U>
