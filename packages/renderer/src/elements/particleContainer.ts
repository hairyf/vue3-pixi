import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface ParticleContainerProps {

}

type Events = PixiEvents

export type ParticleContainerComponent = DefineComponent<
  ParticleContainerProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps,
  Readonly<ParticleContainerProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
