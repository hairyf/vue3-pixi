import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import { ExtractContainerOptions, ExtractContainerProps, ExtractFilterProps } from './props'
import { ExtractContainerEvents } from './events'

export type DefineContainerAttributes<T, O = {}> = DefinePIXIAttributes<
  ExtractContainerProps<T, ExtractContainerOptions<O>>,
  ExtractContainerEvents<T, { render: [T] }>
>

export type DefineFilterAttributes<T, O = {}> = DefinePIXIAttributes<ExtractFilterProps<T, O>, { render: [T] }>

export type DefinePIXIAttributes<
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
  VNodeProps & InstanceProps,
  Readonly<InstanceProps> & {
    [key in Extract<keyof Events, string> as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>

