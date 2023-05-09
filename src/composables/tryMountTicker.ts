import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import type { Application, ICanvas, TickerCallback } from 'pixi.js'
import type { Ref } from 'vue-demi'
import { useApplication } from './useApplication'

export function tryMountTicker(app?: Ref<Application<ICanvas> | undefined>, fn?: TickerCallback<any>): () => void
export function tryMountTicker(fn?: TickerCallback<any>): () => void
export function tryMountTicker(...args: any[]): any {
  let fn: TickerCallback<any> = () => {}
  let app = useApplication()

  if (typeof args[0] === 'function') {
    fn = args[0]
  }
  else {
    app = args[0]
    fn = args[1]
  }

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
