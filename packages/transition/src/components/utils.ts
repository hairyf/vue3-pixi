import { isFunction, isObject, isUndefined, noop, toArray } from '@antfu/utils'
import { Ticker } from 'pixi.js'
import type { Container } from 'pixi.js'
import type { Fn, TransitionTicker, TransitionVars } from '../types'
import {
  createDeferred,
  createEasingFunction,
  delay,
  getValue,
  ignore,
  lerp,
  linear,
  setProps,
  setValue,
} from '../utils'

export interface TransitionOptions {
  context: Record<string, number>
  done: Fn
}

export async function callSetterHook(instance: any, props: any, name: string) {
  const eventName = `on${name[0].toLocaleUpperCase()}${name.slice(1)}`
  const hook = props[name] || props[eventName]
  const filters = instance.filters || []

  if (!hook)
    return
  if (isFunction(hook)) {
    hook(instance)
    return
  }

  filters.forEach((filter: any) => callSetterHook(filter, filter, name))
  setProps(instance, toArray(hook))
}

export async function callAnimationHook(instance: any, props: any, name: string, done: Fn, context?: any) {
  const eventName = `on${name[0].toLocaleUpperCase()}${name.slice(1)}`
  const hook = props[name] || props[eventName]
  for (const filter of instance.filters || [])
    callAnimationHook(filter, filter, name, noop)

  if (!hook)
    return

  context = context || (instance._v_t_context ??= { id: 0, time: 0 })
  const id = ++context.id
  const abort = () => id !== context.id

  if (isFunction(hook)) {
    return name === 'enter'
      ? executeInTicker(hook(instance, done), done, abort, context)
      : executeOutTicker(hook(instance, done), done, abort, context)
  }

  const transitions = toArray(hook).filter(Boolean)

  const proceedings = transitions.map((transition) => {
    const duration = props.duration || transition.duration
    return executeTransition(
      instance, normalize(duration)?.[name] ?? 1000,
      transition, abort,
    )
  })

  await Promise.all(proceedings)

  done()
}

async function executeTransition(instance: Container, duration: number, transition: TransitionVars, abort?: Fn) {
  if (transition.delay)
    await delay(transition.delay)
  const optionsKeys = ['delay', 'duration', 'ease']
  const fields = Object.keys(transition).filter(i => !optionsKeys.includes(i))

  const startedAt = Date.now()
  const endAt = Date.now() + duration
  transition.ease ??= linear
  const ease = !isFunction(transition.ease)
    ? createEasingFunction(transition.ease)
    : transition.ease

  function exec(key: string) {
    const from = getValue(instance, key)
    const to = Number(transition[key])
    const deferred = createDeferred<void>()
    if (isNaN(to) || isUndefined(from))
      throw new Error(`Transition - {${key}} not valid field`)

    function tick() {
      if (abort?.())
        return deferred.resolve()

      const now = Date.now()
      const alpha = ease((now - startedAt) / duration)
      ignore(() => setValue(instance, key, lerp(from, to, alpha)))
      if (now > endAt)
        deferred.resolve()
    }
    Ticker.shared.add(tick)
    deferred.then(() => Ticker.shared.remove(tick))
    return deferred
  }

  await Promise.all(fields.map(exec))
}

async function executeInTicker(ticker: TransitionTicker | void, done: Fn, abort: Fn, context: TransitionOptions['context']) {
  if (!ticker)
    return
  const { duration, tick } = ticker
  const startedAt = Date.now() - context.time
  const endAt = Date.now() + duration - context.time
  const deferred = createDeferred<void>()
  function exec() {
    if (abort())
      return deferred.resolve()
    const now = Date.now()
    const progress = (now - startedAt) / duration
    context.time = now - startedAt
    tick(progress)
    endAt > now
      ? requestAnimationFrame(exec)
      : deferred.resolve()
  }
  exec()
  Ticker.shared.add(exec)
  deferred.then(() => Ticker.shared.remove(exec))
  deferred.then(() => done())
  return deferred
}

async function executeOutTicker(ticker: TransitionTicker | void, done: Fn, abort: Fn, context: TransitionOptions['context']) {
  if (!ticker)
    return
  const { duration, tick } = ticker
  const endAt = Date.now() + duration
  const deferred = createDeferred<void>()
  function exec() {
    if (abort?.())
      return deferred.resolve()
    const now = Date.now()
    const progress = (endAt - now) / duration
    context.time = endAt - now
    tick(progress)
    endAt > now
      ? requestAnimationFrame(exec)
      : deferred.resolve()
  }
  Ticker.shared.add(exec)
  deferred.then(() => Ticker.shared.remove(exec))
  deferred.then(() => done())
  return deferred
}

export function normalize(
  duration: number | { enter: number; leave: number },
): null | Record<string, number> {
  if (duration == null) {
    return null
  }
  else if (isObject(duration)) {
    return duration
  }
  else {
    const n = Number(duration)
    return { enter: n, leave: n }
  }
}
