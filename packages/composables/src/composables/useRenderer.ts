import type { IRenderer } from 'pixi.js'
import type { MaybeRef, Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export function useRenderer(stageRef?: MaybeRef<any>): Ref<IRenderer | undefined> {
  const useApp = useApplication(stageRef)
  return computed(() => unref(useApp)?.renderer)
}
