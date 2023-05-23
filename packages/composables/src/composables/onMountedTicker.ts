import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import type { TickerCallback } from 'pixi.js'
import { Ticker } from 'pixi.js'

export function onMountedTicker(fn: TickerCallback<any>): () => void {
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
