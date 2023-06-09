import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Container3d } from 'pixi-projection'
import type { Allowed3dPixiProps } from './props'

export interface Container3dProps {

}

export interface Container3dEvents extends PixiEvents {
  render: [Container3dInst]
}

export type Container3dInst = Container3d & EventTarget

export type Container3dComponent = DefineComponent<
Container3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Container3dEvents)[],
  keyof Container3dEvents,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<Container3dProps> & {
    [key in keyof Container3dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Container3dEvents[key]) => any)
    | undefined;
  },
  {}
>
