import type { TickerCallback } from 'pixi.js'
import { tryOnBeforeUnmount } from '@vueuse/core'
import { Ticker } from 'pixi.js'

export function onTick(fn: TickerCallback<any>): () => void {
  function insert() {
    Ticker.shared.add(fn)
  }
  function remove() {
    Ticker.shared.remove(fn)
  }

  insert()
  tryOnBeforeUnmount(remove)

  return remove
}
