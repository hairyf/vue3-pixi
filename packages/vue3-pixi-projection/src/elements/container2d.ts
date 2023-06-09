import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Container2d } from 'pixi-projection'
import type { Allowed2dPixiProps } from './props'

export interface Container2dProps {

}

export interface Container2dEvents extends PixiEvents {
  render: [Container2dInst]
}

export type Container2dInst = Container2d & EventTarget

export type Container2dComponent = DefineComponent<
Container2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Container2dEvents)[],
  keyof Container2dEvents,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<Container2dProps> & {
    [key in keyof Container2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Container2dEvents[key]) => any)
    | undefined;
  },
  {}
>
