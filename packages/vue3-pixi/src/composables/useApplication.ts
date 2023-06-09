import type { Ref } from 'vue-demi'
import { inject, ref } from 'vue-demi'
import type { Application } from 'pixi.js'
import { appInjectKey } from './internal'

export function useApplication<T = Application>(): Ref<T> {
  const app = ref(inject(appInjectKey))
  if (!app.value)
    throw new Error('No PIXI Application found. Make sure to create one before using any other composable.')
  return app as any
}

