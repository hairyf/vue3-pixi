import type { AllowedPixiProps, MeshProps, PixiEvents } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed3dPixiProps } from './props'

export interface SimpleMesh3d2dProps extends MeshProps {

}

export interface Events extends PixiEvents {

}

export type SimpleMesh3d2dComponent = DefineComponent<
SimpleMesh3d2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed3dPixiProps,
  Readonly<SimpleMesh3d2dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
