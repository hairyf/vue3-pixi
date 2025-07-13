import type { AnyFn } from '@vueuse/core'
import type { Container, Filter, ViewContainerOptions } from 'pixi.js'
import type { OmitBy, Overwrite, Point } from './utils'
import { NormalizeTexture } from './attribute'

export type AllowedPointsAttributes = Point<'position'>
& Point<'anchor'>
& Point<'scale'>
& Point<'skew'>

export interface OptionsOverrides {
  texture: NormalizeTexture
  textures: NormalizeTexture[]
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

export type ExtractFilterProps<T, U = {}> = Partial<Omit<T, keyof AllowedFilterProps | 'destroy'>> & U

export type OmitContainerOptions<T> = Omit<T, keyof ViewContainerOptions>

export type ExtractContainerOptions<T> = OmitContainerOptions<{
  [K in keyof T]: K extends keyof OptionsOverrides ? OptionsOverrides[K] : T[K]
}>