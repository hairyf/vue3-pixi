import type { Container } from 'pixi.js'
import { isFunction, isObject } from '@antfu/utils'

import { effectScope, watchEffect } from 'vue-demi'
import { setters } from './internal'
import { normalizeTexture, setTextureOptions } from './utils'

const defaultBooleanProps = ['accessible', 'cullable', 'renderable', 'visible', 'isMask']
const pointProps = ['position', 'scale', 'pivot', 'skew', 'anchor', 'tilePosition', 'tileScale'] as const

export function patchProp(
  el: any,
  key: string,
  prevValue: any,
  nextValue: any,
) {

  if (patchRenderProp(el, key, prevValue, nextValue))
    return

  if (patchTextureProp(el, key, prevValue, nextValue))
    return

  if (defaultBooleanProps.includes(key) && setters.boolean(el, key, prevValue, nextValue))
    return

  if (patchPointProp(el, key, prevValue, nextValue))
    return

  if (patchEventProp(el, key, prevValue, nextValue))
    return

  isObject(nextValue)
    ? setters.object(el, key, prevValue, nextValue)
    : Reflect.set(el, key, nextValue)
}

export function patchTextureProp(el: any, key: string, _: any, nextValue: any): boolean {
  if (key === 'texture')
    return setters.unfirst(el, key, () => el.texture = normalizeTexture(nextValue))

  if (key === 'textureOptions') {
    setTextureOptions(el.texture, nextValue)
    return true
  }
  return false
}

export function patchRenderProp(el: any, key: string, prevValue: any, nextValue: any): boolean {
  if (key === 'onRender' && !prevValue && isFunction(nextValue)) {
    const scope = effectScope()
    scope.run(() => watchEffect(() => nextValue(el)))
    el.on('destroyed', () => scope.stop())
    return true
  }
  return false
}

export function patchPointProp(el: Container, key: string, prevValue: any, nextValue: any) {
  for (const name of pointProps) {
    if (key.startsWith(name))
      return setters.point(el, name, key, prevValue, nextValue)
  }
  return false
}

export function patchEventProp(el: any, key: string, prevValue: any, nextValue: any) {
  if (!key.startsWith('on'))
    return false

  const eventName = key.slice(2).toLowerCase()
  if (prevValue)
    el.off(eventName, prevValue)
  if (nextValue)
    el?.on(eventName, nextValue)

  return true
}


