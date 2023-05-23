import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { BlurFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface BlurFilterProps extends ExtractFilterProps<BlurFilter> {
  strength?: number
  resolution?: number
  kernelSize?: number
}

export interface BlurFilterEvents {
  render: [BlurFilterInst]
}

export type BlurFilterInst = BlurFilter

export type BlurFilterComponent = DefineComponent<
BlurFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof BlurFilterEvents)[],
  keyof BlurFilterEvents,
  VNodeProps & AllowedFilterProps,
  Readonly<BlurFilterProps> & {
    [key in keyof BlurFilterEvents as `on${Capitalize<key>}`]?:
    | ((...args: BlurFilterEvents[key]) => any)
    | undefined;
  },
  {}
>
