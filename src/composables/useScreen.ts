import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import type { Application } from 'pixi.js'
import { Rectangle } from 'pixi.js'
import { useApplication } from './useApplication'

export function useScreen(app?: Ref<Application | undefined>): Ref<Rectangle> {
  const useApp = app || useApplication() as any
  const defaultRectangle = new Rectangle()
  return computed(() => unref(useApp.value?._v_screen) || defaultRectangle)
}

