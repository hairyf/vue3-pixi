import { setPoint as _setPoint, setValue } from '@vue-pixi/renderer'

export function setPoint(inst: any, name: string, key: string, prevValue: any, nextValue: any) {
  if (_setPoint(inst, name, key, prevValue, nextValue))
    return true
  if (key === `${name}Z`)
    return setValue(inst[name], 'z', () => inst[name].z = nextValue)

  return true
}

