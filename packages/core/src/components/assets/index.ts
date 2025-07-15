import type { ArrayOr, AssetsManifest, AssetsPreferences, BundleIdentifierOptions } from 'pixi.js'
import type { PropType, SlotsType } from 'vue-demi'
import type { AssetsBundleSrc, ResolvedSrc, UnresolvedAsset } from './types'
import { isString, toArray } from '@antfu/utils'
import { Assets as PixiAssets } from 'pixi.js'
import { defineComponent, onBeforeUnmount, ref, renderSlot, watch } from 'vue-demi'

export const assetsProps = {
  basePath: String,

  /**
   * Load resource manifest via Assets.init
   * @example
   * ```vue
   * <assets base-path="https://..." :manifest="{...}" />
   * <assets manifest="https://...manifest.json" />
   * ```
   */
  manifest: [String, Object] as PropType<string | AssetsManifest>,
  defaultSearchParams: [String, Object] as PropType<string | Record<string, any>>,
  bundleIdentifier: Object as PropType<BundleIdentifierOptions>,
  preferences: Object as PropType<Partial<AssetsPreferences>>,
  skipDetections: Boolean,
  texturePreference: Object as PropType<{
    /** the resolution order you prefer, can be an array (priority order - first is preferred) or a single resolutions  */
    resolution?: number | number[]
    /**
     * the formats you prefer, by default this will be:
     * ['avif', 'webp', 'png', 'jpg', 'jpeg', 'webm', 'mp4', 'm4v', 'ogv']
     */
    format?: ArrayOr<string>
  }>,

  alias: [String, Array] as PropType<string | string[]>,
  /**
   * Entry for loading resources, supports multiple formats
   *
   * @type {string | string[] | ResolvedSrc | ResolvedSrc[]} Used to specify the path of the resource (URL or file path)
   * @example
   * ```vue
   * <assets alias="myAsset" :entry="'path/to/asset'" />
   * <assets alias="myAsset" :entry="{{ src: 'path/to/asset', type: 'image' }}" />
   * ```
   *
   * @type {UnresolvedAsset | UnresolvedAsset[]} Used to specify the metadata of the resource
   * @example
   * ```vue
   * <assets :entry="{ alias: 'myAsset', src: 'path/to/asset' }" />
   * <assets
   *  :entry="[
   *   { alias: 'myAsset', src: 'path/to/asset' },
   *   { alias: 'myAsset2', src: 'path/to/asset2' }
   *  ]"
   * />
   * ```
   */
  entry: [String, Object, Array] as PropType<string | string[] | ResolvedSrc | ResolvedSrc[] | UnresolvedAsset | UnresolvedAsset[]>,

  /**
   * Whether to automatically load via `Assets.load`
   *
   * @default true
   */
  autoload: {
    type: Boolean,
    default: true,
  },

  /**
   * Destruction during component logout
   */
  autounload: Boolean,

  /**
   * Callback when resources are loaded, only called when `autoload` is true
   */
  onLoaded: Function as PropType<(value: any) => void>,
  /**
   * Callback for resource loading progress update, only called when `autoload` is true
   */
  onProgress: Function as PropType<(progress: number) => void>,

  /**
   * PixiJS provides a background loader that allows you to load assets in the background while your application is running.
   */
  background: Boolean,

} as const

export const Assets = defineComponent({
  props: assetsProps,
  slots: Object as SlotsType<{ default: { data: any }, fallback: { progress: number } }>,
  setup(props: any, { slots }) {
    const loading = ref(false)
    const progress = ref(0)
    const data = ref()
    const assets = ref<string[]>([])

    function onProgress(p: number) {
      progress.value = p
      props.onProgress?.(p)
    }
    async function loadUrls(urls: any) {
      data.value = props.background
        ? await PixiAssets.backgroundLoad(urls)
        : await PixiAssets.load(urls, onProgress)
      props.onLoaded?.(data.value)
    }

    async function load() {
      if (props.manifest) {
        await PixiAssets.init(props)
        return
      }

      if (isAsset(props)) {
        props.autoload
          ? await loadUrls({ alias: props.alias, src: props.entry })
          : PixiAssets.add({ alias: props.alias, src: props.entry })
        assets.value.push(...toArray(props.alias))
        return
      }

      if (isString(props.entry) || isStringArray(props.entry)) {
        const entry = isStringArray(props.entry)
          ? toArray(props.entry).map(src => ({ src }))
          : { src: props.entry }
        props.autoload
          ? await loadUrls(entry)
          : PixiAssets.add(entry)
        assets.value.push(...toArray(props.entry))
        return
      }

      if (!props.entry)
        return

      const entry = toArray(props.entry)
      const alias = entry.map(entry => toArray(entry?.alias || entry?.src)).flat()
      props.autoload
        ? await loadUrls(entry)
        : PixiAssets.add(entry)
      assets.value.push(...alias)
    }

    async function unload() {
      PixiAssets.unload(assets.value).catch(() => undefined)
    }

    watch(
      () => props,
      () => {
        loading.value = true
        load().finally(() => loading.value = false)
      },
      { deep: true, immediate: true },
    )

    props.autounload && onBeforeUnmount(unload)

    return () => {
      if (!props.autoload)
        return renderSlot(slots, 'default')
      return loading.value
        ? renderSlot(slots, 'fallback', { progress: progress.value })
        : renderSlot(slots, 'default', { data: data.value })
    }
  },
})

export const assetsBundleProps = {
  id: String,
  /**
   * Assets contained in the bundle. Can be an array of assets or a record mapping aliases to sources.
   *
   * @type {Record<string, UnresolvedAsset>}
   * @example
   * ```vue
   * <assets-bundle id="myBundle" :entry="{ [aliasName]: { src: 'path/to/asset' } }" />
   * ```
   *
   * @type {UnresolvedAsset[]}
   * @example
   * ```vue
   * <assets-bundle id="myBundle" :entry="[
   *   { alias: 'myAsset', src: 'path/to/asset' },
   *   { alias: 'myAsset2', src: 'path/to/asset2' }
   * ]" />
   * ```
   */
  entry: [Object, Array] as PropType<AssetsBundleSrc>,
  /**
   * Whether to automatically load via `Assets.loadBundle`
   * @default true
   */
  autoload: Boolean,
  /**
   * Callback when resources are loaded, only called when `autoload` is true
   */
  onLoaded: Function as PropType<(value: any) => void>,
  /**
   * Callback for resource loading progress update, only called when `autoload` is true
   */
  onProgress: Function as PropType<(progress: number) => void>,
} as const

export const AssetsBundle = defineComponent({
  props: assetsBundleProps,
  slots: Object as SlotsType<{ default: { data: any }, fallback: { progress: number } }>,
  setup(_props) {
  },
})

function isAsset(props: any) {
  return props.alias && props.entry
}
function isStringArray(value: any) {
  return Array.isArray(value) && value.some(v => isString(v))
}
