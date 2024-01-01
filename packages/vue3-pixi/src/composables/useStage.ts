import type { Application, Container, ICanvas } from 'pixi.js'
import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export type StageInst = Container & EventTarget

export function useStage(app?: Ref<Application<ICanvas>>): Ref<StageInst> {
  const useApp = app || useApplication()
  return computed(() => unref(useApp).stage as any)
}
