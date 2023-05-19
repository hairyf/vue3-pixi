import type { AFFINE, Surface } from 'pixi-projection'
import type { IPointData3d } from '../../types'

export interface Allowed2dPixiProps {
  affine?: AFFINE
}

export interface Allowed2sPixiProps {
  surface?: Surface
}

export interface Allowed3dPixiProps {
  position3d?: Partial<IPointData3d> | number | [number, number, number]
  position3dY?: number
  position3dX?: number
  position3dZ?: number

  scale3d?: Partial<IPointData3d> | number | [number, number, number]
  scale3dY?: number
  scale3dX?: number
  scale3dZ?: number

  pivot3d?: Partial<IPointData3d> | number | [number, number, number]
  pivot3dY?: number
  pivot3dX?: number
  pivot3dZ?: number

  euler?: Partial<IPointData3d> | number | [number, number, number]
  eulerY?: number
  eulerX?: number
  eulerZ?: number
}
