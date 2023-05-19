import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from '@vue-pixi/renderer'

export interface Camera3dProps {
  planes?: {
    focus: number
    near?: number
    far?: number
    orthographic?: boolean
  }
}

type Events = PixiEvents

export type Camera3dComponent = DefineComponent<
  Camera3dProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps,
  Readonly<Camera3dProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
