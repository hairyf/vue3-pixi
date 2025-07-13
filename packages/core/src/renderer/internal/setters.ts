
import { isObject } from '@antfu/utils'
import { effectScope, nextTick, watchEffect } from 'vue-demi'

export const setters = {
  object(el: any, key: string, prevValue: any, nextValue: any) {
    const scope = effectScope()
    function update() {
      if (prevValue && nextValue !== prevValue)
        el[`__vp_scope_${key}`]?.stop()
      for (const [setKey, value] of Object.entries(nextValue))
        el[key][setKey] = value
    }
    scope.run(() => {
      watchEffect(update)
      nextTick(update)
    })
    el.on?.('destroyed', () => scope.stop())
    el[`__vp_scope_${key}`] = scope
    return true
  },
  unfirst(inst: any, key: string, setters: () => void) {
    if (inst[`_vp_skip_first_set_${key}`])
      this.call(inst, key, setters)
    else
      inst[`_vp_skip_first_set_${key}`] = true
    return true
  },
  point(inst: any, name: string, key: string, prevValue: any, nextValue: any) {
    switch (key) {
      case name:
        if (isObject(nextValue))
          return this.object(inst, name, prevValue, nextValue)
        else
          return callInstanceSetter(inst, name, nextValue)
      case `${name}X`:
        return this.call(inst[name], 'x', () => inst[name].x = nextValue)
      case `${name}Y`:
        return this.call(inst[name], 'y', () => inst[name].y = nextValue)
    }

    return false
  },
  boolean(_el: any,
    _key: string,
    _prevValue: any,
    nextValue: any,) {
    _el[_key] = nextValue === '' || !!nextValue

    return true
  },
  call(inst: any, key: string, setter: () => void) {
    const initKey = `_vp_initkey_${key}`
    function update() {
      setter()
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
}


function callInstanceSetter(inst: any, key: string, value: any | any[]) {
  const [v1, v2, v3] = Array.isArray(value) ? value : [value, value, value]
  setters.call(inst[key], key, () => inst[key]?.set(v1, v2, v3))
  return true
}