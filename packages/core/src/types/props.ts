import type { AnyFn } from '@vueuse/core'
import type { Container, Filter } from 'pixi.js'
import type { OmitBy, Overwrite, Point } from './utils'

export type ExtractContainerProps<T, U = {}> = ExtractProps<Overwrite<T, AllowedPointsAttributes>, U>

export type ExtractProps<T, U = {}> = Overwrite<
  Partial<
    Omit<
      OmitBy<
        Omit<
          T,
          `on${string}`
        >,
        AnyFn
      >,
      `_${string}`
    >
  >,
  U
>

export type AllowedPointsAttributes = Point<'position'>
& Point<'anchor'>
& Point<'scale'>
& Point<'skew'>

export type AllowedContainerAttributes = Overwrite<
  Container,
  AllowedPointsAttributes
>

export type AllowedContainerProps = ExtractProps<AllowedContainerAttributes>

export interface AllowedFilterProps extends Partial<Omit<Filter, 'destroy'>> {
  is?: (props: any) => Filter
}

export type ExtractFilterProps<T> = Partial<Omit<T, keyof AllowedFilterProps | 'destroy'>>
