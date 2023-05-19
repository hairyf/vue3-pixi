import type { AllowedPixiProps, PixiEvents, TextProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed3dPixiProps } from './props'

export interface Text3dProps extends TextProps {

}

export interface Events extends PixiEvents {

}

export type Text3dComponent = DefineComponent<
Text3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<Text3dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
