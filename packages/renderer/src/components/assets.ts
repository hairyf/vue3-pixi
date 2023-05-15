import { setTextureOptions } from '../utils'
import { nanoid } from 'nanoid'
import type { PropType } from 'vue-demi'
import { Fragment, defineComponent, h, onBeforeUnmount, ref, renderSlot, watch } from 'vue-demi'

import * as PIXI from 'pixi.js'

export type AssetsResolver = string | { default: string } | PIXI.ResolveAsset
export interface AssetsResolvers {
  [key: string]: AssetsResolver | Promise<AssetsResolver>
}

const Assets = defineComponent({
  props: {
    onResolved: Function as PropType<(textures: Record<string, PIXI.Texture>) => void>,
    onProgress: Function as PropType<(progress: number) => void>,
    resolves: {
      type: Object as PropType<AssetsResolvers>,
      required: true,
    },
    bundleIds: String,
    options: {
      type: Object as PropType<PIXI.IBaseTextureOptions>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const loading = ref(false)
    const bundle = props.bundleIds || nanoid(5)
    const textures = ref<Record<string, PIXI.Texture>>()
    const progress = ref(0)

    async function load() {
      PIXI.Assets.addBundle(bundle, await waitResolvesAssets(props.resolves))
      textures.value = await PIXI.Assets.loadBundle(bundle, onProgress)
      props.onResolved?.(textures.value!)
      loadOptions(textures.value)
    }

    async function unload() {
      const _assetMap = (PIXI.Assets.resolver as any)._assetMap
      for (const key in props.resolves) {
        delete _assetMap[key]
        delete _assetMap[`${bundle}-${key}`]
      }
      await PIXI.Assets.unloadBundle(bundle)
    }
    async function loadOptions(textures: any) {
      for (const key in textures)
        setTextureOptions(textures[key], props.options)
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

    return () => h(Fragment, [
      renderSlot(slots, 'default', { textures: textures.value, progress: progress.value }),
      loading.value
        ? renderSlot(slots, 'fallback', { progress: progress.value })
        : renderSlot(slots, 'resolved', { textures: textures.value }),
    ])
  },
})

async function waitResolvesAssets(resolves: AssetsResolvers): Promise<PIXI.ResolverAssetsObject> {
  const result: Record<string, any> = {}
  for (const key in resolves) {
    result[key] = await resolves[key]
    result[key] = result[key].default || result[key]
  }
  return result
}

export default Assets
