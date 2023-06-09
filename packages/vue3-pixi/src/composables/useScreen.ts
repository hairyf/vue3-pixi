import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { Rectangle } from 'pixi.js'

import { computedWithControl, useResizeObserver } from '@vueuse/core'
import { useApplication } from './useApplication'

export function useScreen(): Ref<Rectangle> {
  const useApp = useApplication()
  const view = computed(() => unref(useApp).view as HTMLCanvasElement)
  const defaultRectangle = new Rectangle()

  const screen = computedWithControl(
    () => view.value,
    () => useApp.value?.screen || defaultRectangle,
  )

  useResizeObserver(view, screen.trigger)

  return screen
}

