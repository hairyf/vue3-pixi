import type { ButtonOptions, FancyButton } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface FancyButtonProps {
  options?: ButtonOptions
}

export interface FancyButtonEvents extends PixiEvents {
  down: [btn?: FancyButton]
  hover: [btn?: FancyButton]
  out: [btn?: FancyButton]
  press: [btn?: FancyButton]
  up: [btn?: FancyButton]
  upOut: [btn?: FancyButton]
  render: [FancyButtonInst]
}

export type FancyButtonInst = FancyButton & EventTarget

export type FancyButtonComponent = DefineComponent<
  FancyButtonProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof FancyButtonEvents)[],
  keyof FancyButtonEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<FancyButtonProps> & {
    [key in keyof FancyButtonEvents as `on${Capitalize<key>}`]?:
    | ((...args: FancyButtonEvents[key]) => any)
    | undefined;
  },
  {}
>
