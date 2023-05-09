import { isNumber } from '@antfu/utils'
import { effectScope, nextTick, watchEffect } from 'vue-demi'

export function setPointObject(inst: any, key: string, prevValue: any, nextValue: any) {
  const scope = effectScope()
  function update() {
    if (prevValue && nextValue !== prevValue) {
      inst[`__${key}_scope`]?.stop()
      delete inst[`__${key}_scope`]
    }
    for (const [setKey, value] of Object.entries(nextValue))
      inst[key][setKey] = value
  }
  scope.run(() => {
    watchEffect(update)
    nextTick(update)
  })
  inst.on('destroyed', () => scope.stop())
  inst[`__${key}_scope`] = scope
  return true
}

export function setPointNumber(inst: any, key: string, value: any) {
  const initKey = `__${key}_init`
  function update() {
    return inst[key].set(value, value)
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

export function setPointField(inst: any, key: string, value: any) {
  const initKey = `__${key}_init`
  function update() {
    Reflect.set(inst, key, value)
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

export function setPointValue(inst: any, name: string, key: string, prevValue: any, nextValue: any) {
  switch (key) {
    case name:
      if (isNumber(nextValue))
        return setPointNumber(inst, name, nextValue)
      else
        return setPointObject(inst, name, prevValue, nextValue)
    case `${name}X`:
      return setPointField(inst[name], 'x', nextValue)
    case `${name}Y`:
      return setPointField(inst[name], 'y', nextValue)
  }
  return false
}
