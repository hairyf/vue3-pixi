import { patchProp as defuPatchProp } from 'vue3-pixi'

export function patchProp(
  el: any,
  key: string,
  prevValue: any,
  nextValue: any,
) {
  if (patchEventProp(el, key, prevValue, nextValue))
    return

  return defuPatchProp(el, key, prevValue, nextValue)
}

const SignalEvents = [
  'onChange',
  'onDown',
  'onHover',
  'onOut',
  'onPress',
  'onUp',
  'onUpOut',
  'onCheck',
  'onEnter',
  'onSelect',
  'onUpdate',
]

export function patchEventProp(el: any, key: string, prevValue: any, nextValue: any) {
  if (!SignalEvents.some(event => key.startsWith(event)))
    return false

  const [eventName, eventType] = key.includes(':')
    ? key.split(':')
    : `${key}:connect`

  if (prevValue)
    el[eventName][`${eventType}__ctn`] = el[eventName][eventType](prevValue)

  if (nextValue) {
    el[eventName][`${eventType}__ctn`].disconnect()
    el[eventName][`${eventType}__ctn`] = el[eventName][eventType](nextValue)
  }

  return true
}
