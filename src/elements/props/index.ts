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
  position?: IPointData

  pivot?: IPointData
  pivotX?: number
  pivotY?: number

  renderable?: boolean

  rotation?: number
  angle?: number

  scale?: number | IPointData
  scaleX?: number
  scaleY?: number
  width?: number
  height?: number

  skew?: IPointData
  skewX?: number
  skewY?: number

  visible?: boolean

  zIndex?: number
}
