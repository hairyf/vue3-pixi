import type { Container } from 'pixi.js'
import { isFunction } from '@antfu/utils'
import { effectScope, watchEffect } from 'vue-demi'
import { setters } from './setters'
import { normalizeTexture } from './util'

const booleanProps = ['accessible', 'cullable', 'renderable', 'visible', 'isMask']
const pointProps = ['position', 'scale', 'pivot', 'skew', 'anchor', 'tilePosition', 'tileScale'] as const
const skipProps = ['onRender']

export const patchs = {
  skip(key: string) {
    return skipProps.includes(key)
  },
  texture(el: any, key: string, _: any, nextValue: any) {
    if (key === 'texture')
      return setters.unfirst(el, key, () => el.texture = normalizeTexture(nextValue))

    if (key === 'textureOptions') {
      setters.texture.options(el.texture, nextValue)
      return true
    }
    return false
  },
  point(el: Container, key: string, prevValue: any, nextValue: any) {
    for (const name of pointProps) {
      if (key.startsWith(name))
        return setters.point(el, name, key, prevValue, nextValue)
    }
  },
  boolean(el: any, key: string, prevValue: any, nextValue: any) {
    return booleanProps.includes(key) && setters.boolean(el, key, prevValue, nextValue)
  },
  default(el: any, key: string, _prevValue: any, nextValue: any) {
    Reflect.set(el, key, nextValue)
  },
  events: {
    general(el: any, key: string, prevValue: any, nextValue: any) {
      if (!key.startsWith('on'))
        return false
      const eventName = key.slice(2).toLowerCase()
      if (prevValue)
        el.off(eventName, prevValue)
      if (nextValue)
        el?.on(eventName, nextValue)
      return true
    },
    effect(el: any, key: string, prevValue: any, nextValue: any) {
      if (key === 'onEffect' && !prevValue && isFunction(nextValue)) {
        let scope = effectScope()
        scope.run(() => watchEffect(() => nextValue(el)))

        const onDestroy = () => {
          scope.stop()
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-ignore
          scope = null
          el.off('destroyed', onDestroy)
        }

        el.on('destroyed', onDestroy)

        el.on('destroyed', () => scope?.stop?.())
        return true
      }
    },
  },
}
