import type { Container } from 'pixi.js'
import type { MaybeRef, Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export function useStage(stageRef?: MaybeRef<any>): Ref<Container & EventTarget | undefined> {
  const useApp = useApplication(stageRef)
  return computed(() => unref(useApp)?.stage) as any
}
