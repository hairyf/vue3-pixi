import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import { ExtractContainerProps, ExtractFilterProps } from './props'
import { ExtractContainerEvents } from './events'

export interface ContainerEvents {
  render: []
}

export type DefineContainerAttributes<T> = DefineAttributes<ExtractContainerProps<T>, ExtractContainerEvents<T, { render: [T] }>>

export type DefineFilterAttributes<T> = DefineAttributes<ExtractFilterProps<T>, { render: [T] }>

export type DefineAttributes<
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
  VNodeProps,
  Readonly<InstanceProps> & {
    [key in Extract<keyof Events, string> as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>

