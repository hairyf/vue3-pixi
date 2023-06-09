import type { AllowedPixiProps, MeshProps, PixiEvents } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Mesh3d2d } from 'pixi-projection'
import type { Allowed3dPixiProps } from './props'

export interface Mesh3d2dProps extends MeshProps {

}

export interface Mesh3d2dEvents extends PixiEvents {
  render: [Mesh3d2dInst]
}

export type Mesh3d2dInst = Mesh3d2d & EventTarget

export type Mesh3d2dComponent = DefineComponent<
Mesh3d2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Mesh3d2dEvents)[],
  keyof Mesh3d2dEvents,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<Mesh3d2dProps> & {
    [key in keyof Mesh3d2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Mesh3d2dEvents[key]) => any)
    | undefined;
  },
  {}
>
