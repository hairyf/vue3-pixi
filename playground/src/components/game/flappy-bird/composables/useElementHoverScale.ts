import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'

export function useElementHoverScale(el: MaybeRefOrGetter<EventTarget | null | undefined>) {
  const hovering = useElementHover(el)
  const scale = useTransition(
    () => (hovering.value ? 1.1 : 1),
    {
      transition: TransitionPresets.easeOutBack,
      duration: 150,
    },
  )
  return scale
}
