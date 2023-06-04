import { setPointProperty as _setPointProperty, setPropertyValue } from '@vue-pixi/renderer'

export function setPointProperty(inst: any, name: string, key: string, prevValue: any, nextValue: any) {
  if (_setPointProperty(inst, name, key, prevValue, nextValue))
    return true
  if (key === `${name}Z`)
    return setPropertyValue(inst[name], 'z', () => inst[name].z = nextValue)

  return true
}

