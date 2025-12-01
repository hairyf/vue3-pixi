import type { Application } from 'pixi.js'
import type { Ref } from 'vue-demi'
import { computed, inject, onMounted, ref } from 'vue-demi'
import { appInjectKey } from './internal'

export function useApplication<T = Application>(): Ref<T> {
  const app = ref(inject(appInjectKey, undefined))
  const appComputed = computed({
    get: () => (app.value as any)?.app || app.value,
    set: (value: any) => app.value = value,
  })

  onMounted(() => {
    if (!app.value)
      console.warn('not found <Application />, you can use ref for referencing or create a new component to be used as a child element of <Application /> with PIXI composition API.')
  })

  return appComputed as any
}
