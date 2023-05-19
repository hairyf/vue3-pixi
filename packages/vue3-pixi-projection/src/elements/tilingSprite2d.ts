import type { AllowedPixiProps, PixiEvents, TilingSpriteProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed2dPixiProps } from './props'

export interface TilingSprite2dProps extends TilingSpriteProps {

}

export interface Events extends PixiEvents {

}

export type TilingSprite2dComponent = DefineComponent<
TilingSprite2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<TilingSprite2dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
