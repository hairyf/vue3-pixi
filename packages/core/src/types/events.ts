import type { ContainerChild, ContainerEvents } from 'pixi.js'
import { Overwrite } from './utils'

export interface AllowedContainerEvents<C extends ContainerChild = ContainerChild> extends ContainerEvents<C> { }

export type ExtractContainerEvents<T, U = {}> = Overwrite<AllowedContainerEvents, { render: [T] } & U>
export type ExtractFilterEvents<T, U = {}> = Overwrite<{ render: [T] }, U>
