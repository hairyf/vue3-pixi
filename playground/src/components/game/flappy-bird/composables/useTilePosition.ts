import { tryOnScopeDispose } from '@vueuse/core'
import { Ticker } from 'pixi.js'
import { ref } from 'vue'

export function useTilePosition(speed = 1) {
  const x = ref(0)

  function update(dt: number) {
    x.value += dt * 3.5 * speed
  }

  Ticker.shared.add(update)

  tryOnScopeDispose(() => Ticker.shared.remove(update))

  return x
}
