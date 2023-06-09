import type { AllowedPixiProps, PixiEvents, SpriteProps } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Sprite2d } from 'pixi-projection'
import type { Allowed2dPixiProps } from './props'

export interface Sprite2dProps extends SpriteProps {

}

export interface Sprite2dEvents extends PixiEvents {
  render: [Sprite2dInst]
}

export type Sprite2dInst = Sprite2d & EventTarget

export type Sprite2dComponent = DefineComponent<
Sprite2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Sprite2dEvents)[],
  keyof Sprite2dEvents,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<Sprite2dProps> & {
    [key in keyof Sprite2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Sprite2dEvents[key]) => any)
    | undefined;
  },
  {}
>
