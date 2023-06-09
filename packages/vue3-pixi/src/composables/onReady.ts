import type { Application } from 'pixi.js'
import { onMounted } from 'vue-demi'
import { useApplication } from './useApplication'

export function onReady(callback: (app: Application) => void) {
  const app = useApplication()
  if (app.value) {
    callback(app.value)
  }
  else {
    onMounted(() => {
      if (app.value)
        callback(app.value)
    })
  }
}
