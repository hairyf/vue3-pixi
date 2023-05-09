import { computed, inject, provide, ref, unref } from 'vue-demi'
import type { MaybeRef } from '@vueuse/core'
import { createSharedComposable } from '@vueuse/core'
import type { StageInst } from '../components'
import { applicationInjectionKey } from './internal'

function _useApplication(stageRef?: MaybeRef<StageInst>) {
  const app = inject(applicationInjectionKey, ref())

  if (stageRef)
    return computed(() => unref(stageRef).app)

  provide(applicationInjectionKey, app)

  return app
}

export const useApplication = createSharedComposable(_useApplication)
