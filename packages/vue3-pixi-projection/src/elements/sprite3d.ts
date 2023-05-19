import type { AllowedPixiProps, PixiEvents, SpriteProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed3dPixiProps } from './props'

export interface Sprite3dProps extends SpriteProps {

}

export interface Events extends PixiEvents {

}

export type Sprite3dComponent = DefineComponent<
Sprite3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<Sprite3dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
