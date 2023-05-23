import type { AllowedPixiProps, MeshProps, PixiEvents } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { SimpleMesh2d } from 'pixi-projection'
import type { Allowed2dPixiProps } from './props'

export interface SimpleMesh2dProps extends MeshProps {

}

export interface SimpleMesh2dEvents extends PixiEvents {
  render: [SimpleMesh2dInst]
}

export type SimpleMesh2dInst = SimpleMesh2d & EventTarget

export type SimpleMesh2dComponent = DefineComponent<
SimpleMesh2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SimpleMesh2dEvents)[],
  keyof SimpleMesh2dEvents,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<SimpleMesh2dProps> & {
    [key in keyof SimpleMesh2dEvents as `on${Capitalize<key>}`]?:
    | ((...args: SimpleMesh2dEvents[key]) => any)
    | undefined;
  },
  {}
>
