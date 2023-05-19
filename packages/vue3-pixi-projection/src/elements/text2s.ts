import type { AllowedPixiProps, PixiEvents, TextProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed2sPixiProps } from './props'

export interface Text2sProps extends TextProps {

}

export interface Events extends PixiEvents {

}

export type Text2sComponent = DefineComponent<
Text2sProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed2sPixiProps,
  Readonly<Text2sProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
