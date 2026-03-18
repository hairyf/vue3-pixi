import type { Application } from 'pixi.js'
import type { Ref } from 'vue-demi'

import { computedWithControl, useResizeObserver } from '@vueuse/core'
import { Rectangle } from 'pixi.js'

import { computed, unref, watch } from 'vue-demi'

import { useApplication } from './useApplication'

export function useScreen(app?: Ref<Application>): Ref<Rectangle> {
  const useApp = app || useApplication()
  const view = computed(() => unref(useApp)?.canvas)
  const defaultRectangle = new Rectangle()

  const screen = computedWithControl(
    () => view.value,
    () => useApp.value?.screen || defaultRectangle,
  )

  // Watch for canvas availability to handle async app.init()
  watch(view, (canvas) => {
    if (canvas instanceof HTMLCanvasElement)
      useResizeObserver(canvas, screen.trigger)
  }, { immediate: true })

  return screen
}
