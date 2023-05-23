import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from '@vue-pixi/renderer'
import type { Camera3d } from 'pixi-projection'

export interface Camera3dProps {
  planes?: {
    focus: number
    near?: number
    far?: number
    orthographic?: boolean
  }
}

export interface Camera3dEvents extends PixiEvents {
  render: [Camera3dInst]
}

export type Camera3dInst = Camera3d & EventTarget

export type Camera3dComponent = DefineComponent<
  Camera3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Camera3dEvents)[],
  keyof Camera3dEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<Camera3dProps> & {
    [key in keyof Camera3dEvents as `on${Capitalize<key>}`]?:
    | ((...args: Camera3dEvents[key]) => any)
    | undefined;
  },
  {}
>
