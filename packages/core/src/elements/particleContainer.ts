import type { IParticleProperties, ParticleContainer } from 'pixi.js'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { PixiEvents } from './events'
import type { AllowedPixiProps } from './props'

export interface ParticleContainerProps {
  autoResize?: boolean
  blendMode?: number
  maxSize?: number
  properties?: IParticleProperties
}

export interface ParticleContainerEvents extends PixiEvents {
  render: [ParticleContainerInst]
}

export type ParticleContainerInst = ParticleContainer & EventTarget

export type ParticleContainerComponent = DefineComponent<
  ParticleContainerProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof ParticleContainerEvents)[],
  keyof ParticleContainerEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<ParticleContainerProps> & {
    [key in keyof ParticleContainerEvents as `on${Capitalize<key>}`]?:
    | ((...args: ParticleContainerEvents[key]) => any)
    | undefined;
  },
  {}
>
