import type { Application } from 'pixi.js'
import type { Ref } from 'vue-demi'

import { computedWithControl, useResizeObserver } from '@vueuse/core'
import { Rectangle } from 'pixi.js'

import { computed, unref } from 'vue-demi'

import { useApplication } from './useApplication'

export function useScreen(app?: Ref<Application>): Ref<Rectangle> {
  const useApp = app || useApplication()
  const view = computed(() => unref(useApp)?.canvas)
  const defaultRectangle = new Rectangle()

  const screen = computedWithControl(
    () => view.value,
    () => useApp.value?.screen || defaultRectangle,
  )

  if (view?.value instanceof HTMLCanvasElement)
    useResizeObserver(view, screen.trigger)

  return screen
}
