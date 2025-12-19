import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNode,
  VNodeProps,
} from 'vue-demi'
import type { ExtractContainerEvents, ExtractFilterEvents } from './events'
import type { ExtractContainerOptions, ExtractContainerProps, ExtractFilterProps } from './props'
import type { Overwrite } from './utils'

export type DefineContainerElement<T, O = {}> = DefineElement<ExtractContainerProps<T, ExtractContainerOptions<O>>, ExtractContainerEvents<T>>

export type DefineFilterElement<T, O = {}> = DefineElement<ExtractFilterProps<T, O>, ExtractFilterEvents<T>>

export type VNodePixiMountHook = (vnode: VNode<any>) => void
export type VNodePixiUpdateHook = (vnode: VNode<any>, oldVNode: VNode<any>) => void

export type VnodePixiProps = Overwrite<VNodeProps, {
  onVnodeBeforeMount?: VNodePixiMountHook | VNodePixiMountHook[]
  onVnodeMounted?: VNodePixiMountHook | VNodePixiMountHook[]
  onVnodeBeforeUpdate?: VNodePixiUpdateHook | VNodePixiUpdateHook[]
  onVnodeUpdated?: VNodePixiUpdateHook | VNodePixiUpdateHook[]
  onVnodeBeforeUnmount?: VNodePixiMountHook | VNodePixiMountHook[]
  onVnodeUnmounted?: VNodePixiMountHook | VNodePixiMountHook[]
}>

export type DefineElement<
  InstanceProps = {},
  Events extends { [key: string]: any } = {},
> = DefineComponent<
  InstanceProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (Extract<keyof Events, string>)[],
  Extract<keyof Events, string>,
  VnodePixiProps & InstanceProps,
  Readonly<InstanceProps> & {
    [key in Extract<keyof Events, string> as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
