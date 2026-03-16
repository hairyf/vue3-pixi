import type { TickerCallback } from 'pixi.js'
import { tryOnBeforeUnmount } from '@vueuse/core'
import { Ticker } from 'pixi.js'
import { inject } from 'vue-demi'
import { appInjectKey } from './internal'

export function onTick(fn: TickerCallback<any>): () => void {
  const app = inject(appInjectKey, undefined)
  const ticker = (app as any)?.ticker ?? Ticker.shared

  function insert() {
    ticker.add(fn)
  }
  function remove() {
    ticker.remove(fn)
  }

  insert()
  tryOnBeforeUnmount(remove)

  return remove
}
