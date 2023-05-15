/* eslint-disable max-statements-per-line */
import type { Fn } from '@antfu/utils'
import { camelize } from 'vue-demi'

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function linear(p: number) {
  return p
}

export function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a)
}

export function ignore(fn: Fn<any>) {
  try { return fn() }
  catch {}
}

export type Deferred<T = void> = Promise<T> & { resolve: (value: T) => void; reject: Function }

export function createDeferred<T = void>(): Deferred<T> {
  let resolve: any, reject: any
  const promise = new Promise<any>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as any
  promise.resolve = (v: any) => {
    resolve(v)
  }
  promise.reject = reject
  return promise
}

export function resolveProps<T>(props: T) {
  const baseProps: any = {}
  for (const key in props)
    baseProps[camelize(key)] = props[key]
  return baseProps as T
}

