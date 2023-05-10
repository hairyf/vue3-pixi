import { isObject } from '@antfu/utils'
import { effectScope, nextTick, watchEffect } from 'vue-demi'

export function patchObject(inst: any, key: string, prevValue: any, nextValue: any) {
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

export function patchPointSet(inst: any, key: string, value: any | any[]) {
  const [v1, v2] = Array.isArray(value) ? value : [value, value]
  const initKey = `__${key}_init`
  function update() {
    return inst[key].set(v1, v2)
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

export function patchField(inst: any, key: string, value: any) {
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

export function patchPoint(inst: any, name: string, key: string, prevValue: any, nextValue: any) {
  switch (key) {
    case name:
      if (isObject(nextValue))
        return patchObject(inst, name, prevValue, nextValue)
      else
        return patchPointSet(inst, name, nextValue)
    case `${name}X`:
      return patchField(inst[name], 'x', nextValue)
    case `${name}Y`:
      return patchField(inst[name], 'y', nextValue)
  }
  return false
}
