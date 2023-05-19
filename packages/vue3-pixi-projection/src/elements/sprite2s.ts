import type { AllowedPixiProps, PixiEvents, SpriteProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed2sPixiProps } from './props'

export interface Sprite2sProps extends SpriteProps {

}

export interface Events extends PixiEvents {

}

export type Sprite2sComponent = DefineComponent<
Sprite2sProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed2sPixiProps,
  Readonly<Sprite2sProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
