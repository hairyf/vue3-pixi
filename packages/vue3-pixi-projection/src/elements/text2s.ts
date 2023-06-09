import type { AllowedPixiProps, PixiEvents, TextProps } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Text2s } from 'pixi-projection'
import type { Allowed2sPixiProps } from './props'

export interface Text2sProps extends TextProps {

}

export interface Text2sEvents extends PixiEvents {
  render: [Text2sInst]
}

export type Text2sInst = Text2s & EventTarget

export type Text2sComponent = DefineComponent<
Text2sProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Text2sEvents)[],
  keyof Text2sEvents,
  VNodeProps & AllowedPixiProps & Allowed2sPixiProps,
  Readonly<Text2sProps> & {
    [key in keyof Text2sEvents as `on${Capitalize<key>}`]?:
    | ((...args: Text2sEvents[key]) => any)
    | undefined;
  },
  {}
>
