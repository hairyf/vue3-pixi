import type { AllowedPixiProps, MeshProps, PixiEvents } from 'vue3-pixi'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { SimpleMesh3d2d } from 'pixi-projection'
import type { Allowed3dPixiProps } from './props'

export interface SimpleMesh3d2dProps extends MeshProps {

}

export interface SimpleMesh3d2dEvents extends PixiEvents {
  render: [SimpleMesh3d2dInst]
}

export type SimpleMesh3d2dInst = SimpleMesh3d2d & EventTarget

export type SimpleMesh3d2dComponent = DefineComponent<
SimpleMesh3d2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SimpleMesh3d2dEvents)[],
  keyof SimpleMesh3d2dEvents,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<SimpleMesh3d2dProps> & {
    [key in keyof SimpleMesh3d2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: SimpleMesh3d2dEvents[key]) => any)
    | undefined;
  },
  {}
>
