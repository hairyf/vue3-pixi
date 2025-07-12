import { AnyFn } from '@vueuse/core'
import { Container, Filter } from 'pixi.js'
import { OmitBy, Overwrite, Point } from './utils'

export type ExtractContainerProps<T, U = {}> = Overwrite<
  Partial<
    Omit<
      OmitBy<
        Omit<T, `on${string}`>,
        AnyFn
      >,
      `_${string}`
    >
  >,
  U
>

export type AllowedContainerProps = ExtractContainerProps<
  Overwrite<
    Container,
    Point<'position'> &
    Point<'anchor'> &
    Point<'scale'> &
    Point<'skew'>
  >
>

export interface AllowedFilterProps extends Partial<Omit<Filter, 'destroy'>> {
  is?: (props: any) => Filter
}

export type ExtractFilterProps<T> = Partial<Omit<T, keyof AllowedFilterProps | 'destroy'>>


