import type { Ref } from 'vue-demi'
import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue-demi'
import type { MaybeRef } from '@vueuse/core'
import type { Application } from 'pixi.js'
import type { StageInst } from '../components'
import { applicationInjectionKey } from './internal'

export function useApplication(stageRef?: MaybeRef<StageInst>): Ref<Application | undefined> {
  const inst = getCurrentInstance() as any

  if (inst.pixi_app)
    return inst.pixi_app
  if (stageRef)
    return computed(() => unref(stageRef).app)

  const app = inject(applicationInjectionKey, ref())

  // not found, search down
  if (app.value) {
    provide(applicationInjectionKey, app)
    inst.pixi_app = app
  }

  return app
}

