import type { MaskedFrame, MaskedFrameOptions } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface MaskedFrameProps {
  options?: MaskedFrameOptions
}

export interface MaskedFrameEvents extends PixiEvents {
  render: [MaskedFrameInst]
}

export type MaskedFrameInst = MaskedFrame & EventTarget

export type MaskedFrameComponent = DefineComponent<
  MaskedFrameProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof MaskedFrameEvents)[],
  keyof MaskedFrameEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<MaskedFrameProps> & {
    [key in keyof MaskedFrameEvents as `on${Capitalize<key>}`]?:
    | ((...args: MaskedFrameEvents[key]) => any)
    | undefined;
  },
  {}
>
