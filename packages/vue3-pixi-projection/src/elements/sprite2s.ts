import type { AllowedPixiProps, PixiEvents, SpriteProps } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Sprite2s } from 'pixi-projection'
import type { Allowed2sPixiProps } from './props'

export interface Sprite2sProps extends SpriteProps {

}

export interface Sprite2sEvents extends PixiEvents {
  render: [Sprite2sInst]
}

export type Sprite2sInst = Sprite2s & EventTarget

export type Sprite2sComponent = DefineComponent<
Sprite2sProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Sprite2sEvents)[],
  keyof Sprite2sEvents,
  VNodeProps & AllowedPixiProps & Allowed2sPixiProps,
  Readonly<Sprite2sProps> & {
    [key in keyof Sprite2sEvents as `on${Capitalize<key>}`]?:
    | ((...args: Sprite2sEvents[key]) => any)
    | undefined;
  },
  {}
>
