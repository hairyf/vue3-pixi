import type { Slider } from '@pixi/ui'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps, PixiEvents } from 'vue3-pixi'

export interface SliderProps {}

export interface SliderEvents extends PixiEvents {
  render: [SliderInst]
}

export type SliderInst = Slider & EventTarget

export type SliderComponent = DefineComponent<
  SliderProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SliderEvents)[],
  keyof SliderEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<SliderProps> & {
    [key in keyof SliderEvents as `on${Capitalize<key>}`]?:
    | ((...args: SliderEvents[key]) => any)
    | undefined;
  },
  {}
>
