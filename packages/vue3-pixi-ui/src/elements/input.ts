import type { Input, InputOptions } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface InputProps {
  options?: InputOptions
  value?: string
}

export interface InputEvents extends PixiEvents {
  onChange: [text: string]
  onEnter: [text: string]
  render: [InputInst]
}

export type InputInst = Input & EventTarget

export type InputComponent = DefineComponent<
  InputProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof InputEvents)[],
  keyof InputEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<InputProps> & {
    [key in keyof InputEvents as `on${Capitalize<key>}`]?:
    | ((...args: InputEvents[key]) => any)
    | undefined;
  },
  {}
>
