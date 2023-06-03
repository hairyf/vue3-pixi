import type { IRenderer } from 'pixi.js'
import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export function useRenderer(): Ref<IRenderer> {
  const useApp = useApplication()
  return computed(() => unref(useApp).renderer)
}
