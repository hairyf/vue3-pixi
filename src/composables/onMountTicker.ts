import type { Ref } from 'vue-demi'
import { onBeforeUnmount, onMounted } from 'vue-demi'

import type { TickerCallback } from 'pixi.js'
import type { StageInst } from '../components'
import { useApplication } from './useApplication'

export function onMountTicker(stageRef: Ref<StageInst | undefined> | StageInst | undefined, fn: TickerCallback<any>) {
  const app = useApplication(stageRef)

  function insert() {
    app.value?.ticker.add(fn)
  }
  function remove() {
    app.value?.ticker.remove(fn)
  }

  onMounted(insert)
  onBeforeUnmount(remove)

  return remove
}
