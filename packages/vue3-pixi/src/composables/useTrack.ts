/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ToRef } from 'vue-demi'
import { customRef } from 'vue-demi'
import { toValue, whenever } from '@vueuse/core'
import type { MaybeRefOrGetter } from '@vueuse/core'
export type OmitUndef<T> = Exclude<T, undefined>

export type TrackRef<T, K extends keyof OmitUndef<T>> = T extends undefined ? ToRef<OmitUndef<T>[K] | undefined> : ToRef<OmitUndef<T>[K]>

export function useTrack<T, K extends keyof OmitUndef<T>>(target: MaybeRefOrGetter<T>, key: K): TrackRef<T, K>
export function useTrack<T, K extends keyof OmitUndef<T>>(target: MaybeRefOrGetter<T>, key: K, defaultValue: OmitUndef<T>[K]): ToRef<OmitUndef<T>[K]>
export function useTrack<T, K extends keyof OmitUndef<T>>(target: MaybeRefOrGetter<T>, key: K, defaultValue?: OmitUndef<T>[K]) {
  const trackRef = customRef((track, trigger) => ({
    get: () => {
      track()
      const vtg_v = toValue(target)?.[key as keyof T]
      return vtg_v ?? defaultValue
    },
    set: (value: any) => {
      const vtg = toValue(target)
      vtg
        ? (vtg[key as keyof T] = value)
        : (defaultValue = value)
      trigger()
    },
  }))
  whenever(
    () => toValue(target),
    // @ts-expect-error
    target => (target[key] ??= defaultValue!),
  )
  return trackRef
}

