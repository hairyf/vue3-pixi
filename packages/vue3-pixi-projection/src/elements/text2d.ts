import type { AllowedPixiProps, PixiEvents, TextProps } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Text2d } from 'pixi-projection'
import type { Allowed2dPixiProps } from './props'

export interface Text2dProps extends TextProps {

}

export interface Text2dEvents extends PixiEvents {
  render: [Text2dInst]
}

export type Text2dInst = Text2d & EventTarget

export type Text2dComponent = DefineComponent<
Text2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Text2dEvents)[],
  keyof Text2dEvents,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<Text2dProps> & {
    [key in keyof Text2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Text2dEvents[key]) => any)
    | undefined;
  },
  {}
>
