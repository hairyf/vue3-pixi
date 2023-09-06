import type { CheckBox, CheckBoxOptions } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface CheckBoxProps {
  checked?: boolean
  options?: CheckBoxOptions
}

export interface CheckBoxEvents extends PixiEvents {
  change: [state: string | boolean]
  check: [state: boolean]
  render: [CheckBoxInst]
}

export type CheckBoxInst = CheckBox & EventTarget

export type CheckBoxComponent = DefineComponent<
  CheckBoxProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof CheckBoxEvents)[],
  keyof CheckBoxEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<CheckBoxProps> & {
    [key in keyof CheckBoxEvents as `on${Capitalize<key>}`]?:
    | ((...args: CheckBoxEvents[key]) => any)
    | undefined;
  },
  {}
>
