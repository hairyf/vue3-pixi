import type { Container } from 'pixi.js'
import { effectScope, nextTick, watchEffect } from 'vue-demi'

export function setPointObject(el: Container, key: string, prevValue: any, nextValue: any) {
  const inst = el as any
  const scope = effectScope()
  function update() {
    if (prevValue && nextValue !== prevValue)
      inst[`__${key}_scope`]?.stop()
    if (typeof nextValue.x !== 'undefined')
      (el as any)[key].x = nextValue.x
    if (typeof nextValue.y !== 'undefined')
      (el as any)[key].y = nextValue.y
  }
  scope.run(() => {
    watchEffect(update)
    nextTick(update)
  })
  el.on('destroyed', () => scope.stop())
  inst[`__${key}_scope`] = scope
  return true
}

export function setPointNumber(el: Container, key: string, value: any) {
  const inst = el as any
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

export function setValueProp(inst: any, keys: string, value: any) {
  const initKey = `__${keys}_init`
  function update() {
    Reflect.set(inst, keys, value)
  }
  if (!(inst as any)[initKey]) {
    Reflect.set(inst, initKey, true)
    nextTick(update)
  }
  else {
    update()
  }
  return true
}
