import type { AllowedPixiProps, MeshProps, PixiEvents } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Mesh2d } from 'pixi-projection'
import type { Allowed2dPixiProps } from './props'

export interface Mesh2dProps extends MeshProps {

}

export interface Mesh2dEvents extends PixiEvents {
  render: [Mesh2dInst]
}

export type Mesh2dInst = Mesh2d & EventTarget

export type Mesh2dComponent = DefineComponent<
Mesh2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Mesh2dEvents)[],
  keyof Mesh2dEvents,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<Mesh2dProps> & {
    [key in keyof Mesh2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Mesh2dEvents[key]) => any)
    | undefined;
  },
  {}
>
