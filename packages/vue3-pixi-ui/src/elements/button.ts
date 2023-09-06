import type { Button } from '@pixi/ui'
import type { Container } from 'pixi.js'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface ButtonProps {
  view: Container
}

export interface ButtonEvents extends PixiEvents {
  down: [btn?: Button]
  hover: [btn?: Button]
  out: [btn?: Button]
  press: [btn?: Button]
  up: [btn?: Button]
  upOut: [btn?: Button]
  render: [ButtonInst]
}

export type ButtonInst = Button & EventTarget

export type ButtonComponent = DefineComponent<
  ButtonProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof ButtonEvents)[],
  keyof ButtonEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<ButtonProps> & {
    [key in keyof ButtonEvents as `on${Capitalize<key>}`]?:
    | ((...args: ButtonEvents[key]) => any)
    | undefined;
  },
  {}
>
