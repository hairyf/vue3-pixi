import type { Switcher } from '@pixi/ui'
import type { Container } from 'pixi.js'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface SwitcherProps {
  views: Container[]
}

export interface SwitcherEvents extends PixiEvents {
  change: [state: string | boolean]
  render: [SwitcherInst]
}

export type SwitcherInst = Switcher & EventTarget

export type SwitcherComponent = DefineComponent<
  SwitcherProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SwitcherEvents)[],
  keyof SwitcherEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<SwitcherProps> & {
    [key in keyof SwitcherEvents as `on${Capitalize<key>}`]?:
    | ((...args: SwitcherEvents[key]) => any)
    | undefined;
  },
  {}
>
