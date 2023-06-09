import type { AllowedPixiProps, PixiEvents, TextProps } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Text3d } from 'pixi-projection'
import type { Allowed3dPixiProps } from './props'

export interface Text3dProps extends TextProps {

}

export interface Text3dEvents extends PixiEvents {
  render: [Text3dInst]
}

export type Text3dInst = Text3d & EventTarget

export type Text3dComponent = DefineComponent<
Text3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Text3dEvents)[],
  keyof Text3dEvents,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<Text3dProps> & {
    [key in keyof Text3dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Text3dEvents[key]) => any)
    | undefined;
  },
  {}
>
