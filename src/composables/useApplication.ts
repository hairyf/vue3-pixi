import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'
import type { StageInst } from '../components'

export function useApplication(stageRef: Ref<StageInst | undefined> | StageInst | undefined) {
  return computed(() => unref(stageRef)?.app)
}
