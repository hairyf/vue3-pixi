import { computed, reactive } from 'vue-demi'
import { useApplication } from './useApplication'

export function useScreen() {
  const app = useApplication()
  return computed(() => reactive((app.value as any)?.__computed_screen))
}

