import type { AllowedPixiProps, PixiEvents, SpriteProps } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Sprite3d } from 'pixi-projection'
import type { Allowed3dPixiProps } from './props'

export interface Sprite3dProps extends SpriteProps {

}

export interface Sprite3dEvents extends PixiEvents {
  render: [Sprite3dInst]
}

export type Sprite3dInst = Sprite3d & EventTarget

export type Sprite3dComponent = DefineComponent<
Sprite3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Sprite3dEvents)[],
  keyof Sprite3dEvents,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<Sprite3dProps> & {
    [key in keyof Sprite3dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Sprite3dEvents[key]) => any)
    | undefined;
  },
  {}
>
