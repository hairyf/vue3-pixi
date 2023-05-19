import type { Container2d } from 'pixi-projection'
import { Camera3d } from 'pixi-projection'
import { setPoint } from './setter'

const pointProps = ['position3d'] as const
const callProps = ['convertSubtreeTo2d', 'convertSubtreeTo2s', 'convertSubtreeTo3d', 'convertTo2d', 'convertTo2s', 'convertTo3d']
export function pathProp(el: any, key: string, prevValue: any, nextValue: any) {
  const patches = [
    { element: Camera3d, patch: patchCamera3dProps },
  ]

  for (const { element, patch } of patches) {
    if (el instanceof element && patch(el, key, prevValue, nextValue))
      return true
  }

  if (patchPointProps(el, key, prevValue, nextValue))
    return true

  if (patchAxisProps(el, key, prevValue, nextValue))
    return true

  if (patchCallProps(el, key, prevValue, nextValue))
    return true
}

export function patchPointProps(el: Container2d, key: string, prevValue: any, nextValue: any) {
  for (const name of pointProps) {
    if (key.startsWith(name))
      return setPoint(el, name, key, prevValue, nextValue)
  }
  return false
}

export function patchAxisProps(el: Container2d, key: string, _: any, nextValue: any) {
  if (key === 'axisY' && el.proj?.setAxisY) {
    el.proj.setAxisY(nextValue)
    return true
  }
  if (key === 'axisX' && el.proj?.setAxisX) {
    el.proj.setAxisX(nextValue)
    return true
  }

  return false
}

export function patchCamera3dProps(el: Camera3d, key: string, _: any, nextValue: any) {
  if (key === 'planes') {
    el.setPlanes(
      nextValue.focus,
      nextValue.near,
      nextValue.far,
      nextValue.orthographic,
    )
    return true
  }

  return false
}

export function patchCallProps(el: any, key: string, _: any, nextValue: any) {
  if (callProps.includes(key) && el[key] && nextValue) {
    el[key]()
    return true
  }

  return false
}
