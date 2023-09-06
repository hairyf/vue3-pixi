import type { ProgressBar, ProgressBarOptions } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface ProgressBarProps {
  options?: ProgressBarOptions
}

export interface ProgressBarEvents extends PixiEvents {
  render: [ProgressBarInst]
}

export type ProgressBarInst = ProgressBar & EventTarget

export type ProgressBarComponent = DefineComponent<
  ProgressBarProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof ProgressBarEvents)[],
  keyof ProgressBarEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<ProgressBarProps> & {
    [key in keyof ProgressBarEvents as `on${Capitalize<key>}`]?:
    | ((...args: ProgressBarEvents[key]) => any)
    | undefined;
  },
  {}
>
