import type { AllowedPixiProps, PixiEvents } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed3dPixiProps } from './props'

export interface Container3dProps {

}

export interface Events extends PixiEvents {

}

export type Container3dComponent = DefineComponent<
Container3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<Container3dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
