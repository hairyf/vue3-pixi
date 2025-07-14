import type { ContainerChild, ContainerEvents, Renderer } from 'pixi.js'
import type { Overwrite } from './utils'

export interface AllowedContainerEvents<C extends ContainerChild = ContainerChild> extends ContainerEvents<C> { }

export type ExtractContainerEvents<T, U = {}> = Overwrite<AllowedContainerEvents, { effect: [T], render: [T, Renderer] } & U>
export type ExtractFilterEvents<T, U = {}> = Overwrite<{ effect: [T] }, U>
