import type { Ref } from 'vue-demi'
import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core'
import type { TickerCallback } from 'pixi.js'
import type { StageInst } from '../components'
import { useApplication } from './useApplication'

export function tryMountTicker(stageRef: Ref<StageInst | undefined> | StageInst | undefined, fn: TickerCallback<any>) {
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
