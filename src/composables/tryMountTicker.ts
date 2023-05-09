import type { MaybeRef } from '@vueuse/core'
import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import type { TickerCallback } from 'pixi.js'
import type { StageInst } from '../../dist'
import { useApplication } from './useApplication'

export function tryMountTicker(stageRef?: MaybeRef<StageInst>, fn?: TickerCallback<any>): () => void
export function tryMountTicker(fn?: TickerCallback<any>): () => void
export function tryMountTicker(...args: any[]): any {
  let stageRef: MaybeRef<StageInst> | undefined
  let fn: TickerCallback<any> = () => {}
  if (typeof args[0] === 'function') {
    fn = args[0]
  }
  else {
    stageRef = args[0]
    fn = args[1]
  }

  const app = useApplication(stageRef)

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
