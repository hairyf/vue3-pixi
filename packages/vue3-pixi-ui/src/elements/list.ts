import type { List, ListOptions } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface ListProps {
  options?: ListOptions
}

export interface ListEvents extends PixiEvents {
  render: [ListInst]
}

export type ListInst = List & EventTarget

export type ListComponent = DefineComponent<
  ListProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof ListEvents)[],
  keyof ListEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<ListProps> & {
    [key in keyof ListEvents as `on${Capitalize<key>}`]?:
    | ((...args: ListEvents[key]) => any)
    | undefined;
  },
  {}
>
