import type { PointData } from 'pixi.js'

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type OmitBy<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}

export type PickBy<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

export type Point<Key extends string>
  = { [K in Key]?: Partial<PointData> | number | [number, number]; }
    & { [K in `${Key}X`]?: number; }
    & { [K in `${Key}Y`]?: number }
