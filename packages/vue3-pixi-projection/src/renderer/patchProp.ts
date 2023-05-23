import type { Container2d } from 'pixi-projection'
import { Camera3d } from 'pixi-projection'
import { setSkipValue, setValue } from '@vue-pixi/renderer'
import { setPoint } from './setter'

const pointProps = ['position3d', 'euler'] as const
const projProps = ['affine']
export function pathProp(el: any, key: string, prevValue: any, nextValue: any) {
  const patches = [
    { element: Camera3d, patch: patchCamera3dProps },
  ]

  for (const { element, patch } of patches) {
    if (el instanceof element && patch(el, key, prevValue, nextValue))
      return true
  }

  if (patchProjProps(el, key, prevValue, nextValue))
    return true

  if (patchPointProps(el, key, prevValue, nextValue))
    return true
}

export function patchPointProps(el: Container2d, key: string, prevValue: any, nextValue: any) {
  for (const name of pointProps) {
    if (key.startsWith(name))
      return setPoint(el, name, key, prevValue, nextValue)
  }
  return false
}

export function patchCamera3dProps(el: any, key: string, _: any, nextValue: any) {
  const props = ['focus', 'near', 'far', 'orthographic']

  function setPlanes(config: any) {
    el.setPlanes(
      config.focus || el._focus,
      config.near || el.near,
      config.far || el.far,
      config.orthographic || el._orthographic,
    )
  }

  if (props.includes(key))
    return setSkipValue(el, key, () => setPlanes({ [key]: nextValue }))

  return false
}

export function patchProjProps(el: any, key: string, _: any, nextValue: any) {
  if (projProps.includes(key)) {
    setValue(el, key, () => el.proj[key] = nextValue)
    return true
  }

  return false
}
