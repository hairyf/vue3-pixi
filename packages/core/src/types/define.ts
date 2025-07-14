import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { ExtractContainerEvents, ExtractFilterEvents } from './events'
import type { ExtractContainerOptions, ExtractContainerProps, ExtractFilterProps } from './props'

export type DefineContainerElement<T, O = {}> = DefineElement<ExtractContainerProps<T, ExtractContainerOptions<O>>, ExtractContainerEvents<T>>

export type DefineFilterElement<T, O = {}> = DefineElement<ExtractFilterProps<T, O>, ExtractFilterEvents<T>>

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
  VNodeProps & InstanceProps,
  Readonly<InstanceProps> & {
    [key in Extract<keyof Events, string> as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
