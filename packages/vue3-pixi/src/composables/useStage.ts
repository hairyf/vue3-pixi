import type { Container } from 'pixi.js'
import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export type StageInst = Container & EventTarget

export function useStage(): Ref<StageInst> {
  const useApp = useApplication()
  return computed(() => unref(useApp).stage as any)
}
