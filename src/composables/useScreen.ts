import type { Ref } from 'vue-demi'
import { computed, unref } from 'vue-demi'

import { Rectangle } from 'pixi.js'
import { useApplication } from './useApplication'

export function useScreen(): Ref<Rectangle> {
  const app = useApplication()
  const defaultRectangle = new Rectangle()
  const screenRef = computed(() =>
    unref((app.value as any)?._v_screen),
  )
  return computed(() => unref(screenRef) || defaultRectangle)
}

