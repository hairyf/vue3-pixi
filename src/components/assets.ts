import { nanoid } from 'nanoid'
import type { PropType } from 'vue-demi'
import { defineComponent, onBeforeUnmount, ref, renderSlot, watch } from 'vue-demi'

import * as PIXI from 'pixi.js'

export interface AssetsResolvers {
  [key: string]: any | Promise<any>
}

const Assets = defineComponent({
  props: {
    resolves: {
      type: Object as PropType<AssetsResolvers>,
      required: true,
    },
    bundleIds: String,
    onProgress: Function as PropType<(progress: number) => void>,
  },
  setup(props, { slots }) {
    const loading = ref(false)
    const bundle = props.bundleIds || nanoid(5)
    const textures = ref<any>()
    const progress = ref(0)

    async function load() {
      PIXI.Assets.addBundle(bundle, await waitResolves(props.resolves))
      textures.value = await PIXI.Assets.loadBundle(bundle, onProgress)
    }

    async function unload() {
      const _assetMap = (PIXI.Assets.resolver as any)._assetMap
      for (const key in props.resolves) {
        delete _assetMap[key]
        delete _assetMap[`${bundle}-${key}`]
      }
      await PIXI.Assets.unloadBundle(bundle)
    }

    function onProgress(p: number) {
      progress.value = p
      props.onProgress?.(p)
    }

    watch(
      () => [props.resolves, props.bundleIds],
      () => {
        loading.value = true
        load().finally(() => loading.value = false)
      },
      { deep: true, immediate: true },
    )
    onBeforeUnmount(unload)

    return () => loading.value
      ? renderSlot(slots, 'fallback', { progress: progress.value })
      : renderSlot(slots, 'default', { textures: textures.value })
  },
})

async function waitResolves(resolves: AssetsResolvers) {
  const result: Record<string, PIXI.ResolveAsset | string> = {}
  for (const key in resolves) {
    result[key] = await resolves[key]
    result[key] = (result as any)[key].default || result[key]
  }
  return result
}

export default Assets
