import type { Application, ICanvas, IRenderer } from 'pixi.js'
import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export function useRenderer(app?: Ref<Application<ICanvas>>): Ref<IRenderer> {
  const useApp = app || useApplication()
  return computed(() => unref(useApp)?.renderer)
}
