import type { RadioGroup } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface RadioGroupProps {}

export interface RadioGroupEvents extends PixiEvents {
  render: [RadioGroupInst]
}

export type RadioGroupInst = RadioGroup & EventTarget

export type RadioGroupComponent = DefineComponent<
  RadioGroupProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof RadioGroupEvents)[],
  keyof RadioGroupEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<RadioGroupProps> & {
    [key in keyof RadioGroupEvents as `on${Capitalize<key>}`]?:
    | ((...args: RadioGroupEvents[key]) => any)
    | undefined;
  },
  {}
>
