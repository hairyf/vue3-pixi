import { patchs } from './utils'

export function patchProp(
  el: any,
  key: string,
  prevValue: any,
  nextValue: any,
) {
  if (patchs.skip(key))
    return

  if (patchs.events.effect(el, key, prevValue, nextValue))
    return
  if (patchs.events.general(el, key, prevValue, nextValue))
    return
  if (patchs.texture(el, key, prevValue, nextValue))
    return

  if (patchs.boolean(el, key, prevValue, nextValue))
    return

  if (patchs.point(el, key, prevValue, nextValue))
    return

  patchs.default(el, key, prevValue, nextValue)
}
