import type { AnyFn } from '@vueuse/core'
import type { Container, Filter, ViewContainerOptions } from 'pixi.js'
import type { NormalizeTexture } from './attribute'
import type { OmitBy, Overwrite, Point } from './utils'

export type AllowedPointsAttributes = Point<'position'>
  & Point<'anchor'>
  & Point<'scale'>
  & Point<'skew'>
  & Point<'pivot'>

export interface OptionsOverrides {
  texture: NormalizeTexture
  textures: any
}

export type AllowedContainerAttributes = Overwrite<
  Container,
  AllowedPointsAttributes
>

export type AllowedContainerProps = ExtractProps<AllowedContainerAttributes>

export interface AllowedFilterProps extends Partial<Omit<Filter, 'destroy'>> {
  is?: (props: any) => Filter
}

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

export type ExtractFilterProps<T, U = {}> = ExtractProps<
  Partial<Omit<T, keyof AllowedFilterProps | 'destroy'>> & U,
  AllowedPointsAttributes
>

export type OmitContainerOptions<T> = Omit<T, keyof ViewContainerOptions>

export type ExtractContainerOptions<T> = OmitContainerOptions<{
  [K in keyof T]: K extends keyof OptionsOverrides ? OptionsOverrides[K] : T[K]
}>
