import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import type { TickerCallback } from 'pixi.js'
import { Ticker } from 'pixi.js'

export function tryMountTicker(fn: TickerCallback<any>): any {
  function insert() {
    Ticker.shared.add(fn)
  }
  function remove() {
    Ticker.shared.remove(fn)
  }

  tryOnMounted(insert)
  tryOnBeforeUnmount(remove)

  return remove
}
