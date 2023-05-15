import { useRafFn } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useCosineAmplitude(speed = 2, amplitude = 10) {
  const time = ref(0)
  const offset = computed(() =>
    Math.cos((time.value / 1000) * speed) * amplitude,
  )
  useRafFn(({ delta }) => (time.value += delta))
  return offset
}
