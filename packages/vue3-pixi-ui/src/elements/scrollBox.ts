import type { ScrollBox, ScrollBoxOptions } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface ScrollBoxProps {
  options?: ScrollBoxOptions
}

export interface ScrollBoxEvents extends PixiEvents {
  render: [ScrollBoxInst]
}

export type ScrollBoxInst = ScrollBox & EventTarget

export type ScrollBoxComponent = DefineComponent<
  ScrollBoxProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof ScrollBoxEvents)[],
  keyof ScrollBoxEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<ScrollBoxProps> & {
    [key in keyof ScrollBoxEvents as `on${Capitalize<key>}`]?:
    | ((...args: ScrollBoxEvents[key]) => any)
    | undefined;
  },
  {}
>
