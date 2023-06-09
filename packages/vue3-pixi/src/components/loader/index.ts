import { nanoid } from 'nanoid'
import { Assets } from 'pixi.js'
import type { ExtractPropTypes, PropType } from 'vue-demi'
import { defineComponent, onBeforeUnmount, ref, renderSlot, watch } from 'vue-demi'

import type { IBaseTextureOptions, Texture } from 'pixi.js'
import { isString } from '@antfu/utils'
import { setTextureOptions } from '../../renderer'

export type LoadAsset = string | { default: string } | Promise<string | { default: string }>
export type LoadAssets = Record<string, LoadAsset> | (LoadAsset | [string, LoadAsset])[]

export const loaderProps = {
  onResolved: Function as PropType<(textures: any) => void>,
  onProgress: Function as PropType<(progress: number) => void>,
  resources: {
    type: [Object, Array] as PropType<LoadAssets>,
    required: true as const,
  },
  options: {
    type: Object as PropType<IBaseTextureOptions>,
    default: () => ({}),
  },
  bundleIds: String,
}

export type LoaderProps = ExtractPropTypes<typeof loaderProps>

export const Loader = defineComponent({
  props: loaderProps,
  setup(props, { slots }) {
    const loading = ref(false)
    const textures = ref<Record<string, Texture>>()
    const progress = ref(0)
    const bundle = props.bundleIds || nanoid(5)

    function onProgress(p: number) {
      progress.value = p
      props.onProgress?.(p)
    }

    async function load() {
      Assets.addBundle(bundle, await resolveAssets(props.resources))
      const _textures = await Assets.loadBundle(bundle, onProgress)

      for (const key in _textures)
        setTextureOptions(_textures[key], props.options)

      textures.value = _textures
      props.onResolved?.(_textures)
    }

    async function unload() {
      const assetMap = (Assets.resolver as any)._assetMap
      for (const key in textures.value) {
        delete assetMap[key]
        delete assetMap[`${bundle}-${key}`]
      }
      await Assets.unloadBundle(bundle)
    }

    watch(
      () => [props.resources, props.bundleIds],
      () => {
        loading.value = true
        load().finally(() => loading.value = false)
      },
      { deep: true, immediate: true },
    )

    onBeforeUnmount(unload)

    return () => {
      return loading.value
        ? renderSlot(slots, 'fallback', { progress: progress.value })
        : renderSlot(slots, 'default', { textures: textures.value })
    }
  },
})

async function parseAsset(asset: LoadAsset) {
  const result = await asset
  return isString(result) ? result : result.default
}

async function resolveAssets(assets: LoadAssets) {
  const result: Record<string, string> = {}
  for (const key in assets) {
    let asset = (assets as any)[key]
    asset = asset.default || asset
    if (Array.isArray(asset)) {
      result[asset[0]] = await parseAsset(asset[1])
      continue
    }
    Array.isArray(assets)
      ? (result[asset] = await parseAsset(asset))
      : (result[key] = await parseAsset(asset))
  }
  return result
}

