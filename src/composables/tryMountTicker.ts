import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import type { TickerCallback } from 'pixi.js'
import { useApplication } from './useApplication'

export function tryMountTicker(fn: TickerCallback<any>) {
  const app = useApplication()

  function insert() {
    app.value?.ticker.add(fn)
  }
  function remove() {
    app.value?.ticker.remove(fn)
  }

  tryOnMounted(insert)
  tryOnBeforeUnmount(remove)

  return remove
}
