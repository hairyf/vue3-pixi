import type { Ref } from 'vue-demi'
import { computed, unref, watch } from 'vue-demi'

import { Rectangle } from 'pixi.js'
import type { Application } from 'pixi.js'

import { computedWithControl, useEventListener, useResizeObserver } from '@vueuse/core'
import { useApplication } from './useApplication'

export function useScreen(app?: Ref<Application | undefined>): Ref<Rectangle> {
  const useApp = app || useApplication()
  const view = computed(() => unref(useApp)?.view as HTMLCanvasElement)
  const resizeTo = computed(() => unref(useApp)?.resizeTo)
  const defaultRectangle = new Rectangle()

  const screen = computedWithControl(
    () => view.value,
    () => useApp.value?.screen || defaultRectangle,
  )

  const watchElement = computed(() => resizeTo.value || view.value)

  let stop = () => {}
  watch(watchElement, (element) => {
    stop()
    if (isWindow(element))
      stop = useEventListener('resize', screen.trigger)
    else
      stop = useResizeObserver(element, screen.trigger).stop
  })

  return screen
}

function isWindow(obj: any): obj is Window {
  return obj != null && obj.window === obj
}

