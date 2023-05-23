import type { Container } from 'pixi.js'
import type { MaybeRef, Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export type StageInst = Container & EventTarget

export function useStage(stageRef?: MaybeRef<any>): Ref<StageInst | undefined> {
  const useApp = useApplication(stageRef)
  return computed(() => unref(useApp)?.stage) as any
}
