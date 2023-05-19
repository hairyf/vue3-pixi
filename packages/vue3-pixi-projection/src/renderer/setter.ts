import { isObject } from '@antfu/utils'
import { nextTick } from 'vue-demi'
import { setObject, setValue } from '@vue-pixi/renderer'

export function setPoint(inst: any, name: string, key: string, prevValue: any, nextValue: any) {
  switch (key) {
    case name:
      if (isObject(nextValue))
        return setObject(inst, name, prevValue, nextValue)
      else
        return callPoint(inst, name, nextValue)
    case `${name}X`:
      return setValue(inst[name], 'x', () => inst[name].x = nextValue)
    case `${name}Y`:
      return setValue(inst[name], 'y', () => inst[name].y = nextValue)
    case `${name}Z`:
      return setValue(inst[name], 'z', () => inst[name].y = nextValue)
  }

  return false
}

export function callPoint(inst: any, key: string, value: any | any[]) {
  const [v1, v2, v3] = Array.isArray(value) ? value : [value, value, value]
  const initKey = `__${key}_init`
  function update() {
    return inst[key].set(v1, v2, v3)
  }
  if (!inst[initKey]) {
    Reflect.set(inst, initKey, true)
    nextTick(update)
  }
  else {
    update()
  }
  return true
}
