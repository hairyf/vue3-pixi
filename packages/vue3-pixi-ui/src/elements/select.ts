import type { Select, SelectOptions } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface SelectProps {
  options?: SelectOptions
}

export interface SelectEvents extends PixiEvents {
  render: [SelectInst]
}

export type SelectInst = Select & EventTarget

export type SelectComponent = DefineComponent<
  SelectProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SelectEvents)[],
  keyof SelectEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<SelectProps> & {
    [key in keyof SelectEvents as `on${Capitalize<key>}`]?:
    | ((...args: SelectEvents[key]) => any)
    | undefined;
  },
  {}
>
