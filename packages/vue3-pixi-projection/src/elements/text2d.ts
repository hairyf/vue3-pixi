import type { AllowedPixiProps, PixiEvents, TextProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed2dPixiProps } from './props'

export interface Text2dProps extends TextProps {

}

export interface Events extends PixiEvents {

}

export type Text2dComponent = DefineComponent<
Text2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<Text2dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
