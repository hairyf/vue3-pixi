import type { AllowedPixiProps, MeshProps, PixiEvents } from '@vue-pixi/renderer'
import type { ComponentOptionsMixin, DefineComponent, VNodeProps } from 'vue-demi'
import type { Allowed2dPixiProps } from './props'

export interface SimpleMesh2dProps extends MeshProps {

}

export interface Events extends PixiEvents {

}

export type SimpleMesh2dComponent = DefineComponent<
SimpleMesh2dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & Allowed2dPixiProps,
  Readonly<SimpleMesh2dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
