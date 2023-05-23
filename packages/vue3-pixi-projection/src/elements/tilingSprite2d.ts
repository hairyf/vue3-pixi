import type { AllowedPixiProps, PixiEvents, TilingSpriteProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { TilingSprite2d } from 'pixi-projection'
import type { Allowed2dPixiProps } from './props'

export interface TilingSprite2dProps extends TilingSpriteProps {

}

export interface TilingSprite2dEvents extends PixiEvents {
  render: [TilingSprite2dInst]
}

export type TilingSprite2dInst = TilingSprite2d & EventTarget

export type TilingSprite2dComponent = DefineComponent<
TilingSprite2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof TilingSprite2dEvents)[],
  keyof TilingSprite2dEvents,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<TilingSprite2dProps> & {
    [key in keyof TilingSprite2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: TilingSprite2dEvents[key]) => any)
    | undefined;
  },
  {}
>
