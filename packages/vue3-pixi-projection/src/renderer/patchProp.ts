import type { Container2d } from 'pixi-projection'
import { patchProp as defuPatchProp, setPropertyValue } from 'vue3-pixi'
import { setPointProperty } from './internal'

const pointProps = ['position3d', 'euler'] as const
const projProps = ['affine']

export function patchProp(el: any, key: string, prevValue: any, nextValue: any) {
  if (patchProjProps(el, key, prevValue, nextValue))
    return true

  if (patchPointProps(el, key, prevValue, nextValue))
    return true

  return defuPatchProp(el, key, prevValue, nextValue)
}

export function patchPointProps(el: Container2d, key: string, prevValue: any, nextValue: any) {
  for (const name of pointProps) {
    if (key.startsWith(name))
      return setPointProperty(el, name, key, prevValue, nextValue)
  }
  return false
}

export function patchProjProps(el: any, key: string, _: any, nextValue: any) {
  if (projProps.includes(key)) {
    setPropertyValue(el, key, () => el.proj[key] = nextValue)
    return true
  }

  return false
}
