import type {
  Container,
  EventMode,
  Filter,
  IHitArea,
  IPointData,
  MaskData,
  Rectangle,
} from 'pixi.js'

export interface AllowedPixiProps {
  accessible?: boolean
  accessibleChildren?: number
  accessibleHint?: string
  accessiblePointerEvents?: string
  accessibleTitle?: string
  accessibleType?: string
  alpha?: number

  cacheAsBitmap?: number
  cacheAsBitmapMultisample?: number | unknown
  cacheAsBitmapResolution?: number | unknown

  cullable?: boolean
  cullArea?: Rectangle

  filterArea?: Rectangle
  filters?: Filter[]

  hitArea?: IHitArea
  eventMode?: EventMode

  mask?: Container | MaskData | null

  name?: string

  x?: number
  y?: number
  position?: Partial<IPointData> | number | [number, number]
  positionY?: number
  positionX?: number

  anchor?: Partial<IPointData> | number | [number, number]
  anchorX?: number
  anchorY?: number

  pivot?: Partial<IPointData> | number | [number, number]
  pivotX?: number
  pivotY?: number

  renderable?: boolean

  rotation?: number
  angle?: number

  scale?: Partial<IPointData> | number | [number, number]
  scaleX?: number
  scaleY?: number
  width?: number
  height?: number

  skew?: Partial<IPointData> | number | [number, number]
  skewX?: number
  skewY?: number

  visible?: boolean

  zIndex?: number
}

export interface AllowedFilterProps extends Partial<Omit<Filter, 'destroy'>> {
  is?: (props: any) => Filter
}

export type ExtractFilterProps<T> = Partial<Omit<T, keyof AllowedFilterProps | 'destroy'>>
