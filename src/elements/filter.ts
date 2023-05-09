import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
} from 'vue-demi'

export type Props<T = {}> = { is: (props: any) => T } & T

export type PixiFilterComponent<T = {}> = DefineComponent<
  Props<T>,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  [],
  string,
  T & ComponentCustomProps,
  Readonly<Props<T>>,
  {}
>
