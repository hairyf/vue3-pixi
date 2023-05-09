import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import type { Application } from 'pixi.js'
import { Rectangle } from 'pixi.js'
import { useApplication } from './useApplication'

export function useScreen(app?: Ref<Application | undefined>): Ref<Rectangle> {
  const useApp = app || useApplication()
  const defaultRectangle = new Rectangle()
  const screenRef = computed(() =>
    unref((useApp.value as any)?._v_screen),
  )
  return computed(() => unref(screenRef) || defaultRectangle)
}

