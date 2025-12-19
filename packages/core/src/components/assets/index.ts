import type { AssetsManifest, AssetsBundle as PixiAssetsBundle } from 'pixi.js'
import type { PropType, SlotsType } from 'vue-demi'
import type { ResolvedSrc, UnresolvedAsset } from './types'
import { isString, toArray } from '@antfu/utils'
import { nanoid } from 'nanoid'

import { Assets as PixiAssets } from 'pixi.js'

import { defineComponent, onBeforeUnmount, ref, renderSlot, toRaw, watch } from 'vue-demi'

export const assetsProps = {
  basePath: String,

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
      if (Array.isArray(urls) && urls.length === 1)
        urls = urls[0]
      data.value = toRaw(await PixiAssets.load(urls, onProgress))
      props.onLoaded?.(data.value)
    }

    async function load() {
      if (isAsset(props.alias, props.entry)) {
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
      async () => {
        loading.value = true
        try {
          await load()
          props.background && PixiAssets.backgroundLoad(assets.value)
        }
        finally {
          loading.value = false
        }
      },
      { deep: true, immediate: true },
    )

    props.autounload && onBeforeUnmount(unload)

    return () => {
      if (!props.autoload || props.background)
        return renderSlot(slots, 'default')
      return loading.value
        ? renderSlot(slots, 'fallback', { progress: progress.value })
        : renderSlot(slots, 'default', { data: data.value })
    }
  },
})

export const assetsBundleProps = {
  /**
   * Assets manifest containing bundle definitions
   */
  manifest: [Object, String] as PropType<AssetsManifest | string>,

  /**
   * Bundle name(s) to load. Can be a string or array of strings.
   * When used with manifest, specifies which bundles to load.
   * When used without manifest, loads the specified bundle(s) directly.
   */
  entry: [String, Array, Object, Array] as PropType<string | string[] | PixiAssetsBundle['assets']>,

  /**
   * Bundle ID to load.
   */
  id: String,

  /**
   * Whether to automatically load via `Assets.loadBundle`
   * @default true
   */
  autoload: {
    type: Boolean,
    default: true,
  },

  autounload: Boolean,

  /**
   * PixiJS provides a background loader that allows you to load assets in the background while your application is running.
   */
  background: Boolean,

  /**
   * Callback when resources are loaded, only called when `autoload` is true
   */
  onLoaded: Function as PropType<(value: any) => void>,

  /**
   * Callback for resource loading progress update, only called when `autoload` is true
   */
  onProgress: Function as PropType<(progress: number) => void>,
} as const

/**
 * Loads a bundle of assets.
 * @example
 * ```vue
 * <assets-bundle manifest="assets/manifest.json" entry="bundle1" />
 * <assets-bundle :manifest="{...}" :entry="['bundle1', 'bundle2']" />
 *
 * <assets-bundle id="bundle1" :entry="[{ alias: 'flowerTop', src: 'assets/flowerTop.png' }]" />
 * <assets-bundle id="bundle2" :entry="{ flowerTop: 'assets/flowerTop.png' }" />
 * ```
 */
export const AssetsBundle = defineComponent({
  props: assetsBundleProps,
  slots: Object as SlotsType<{ default: { data: any }, fallback: { progress: number } }>,
  setup(props, { slots }) {
    const loading = ref(false)
    const progress = ref(0)
    const data = ref<any>()
    const bundles = ref<string[]>([])

    function onProgress(p: number) {
      progress.value = p
      props.onProgress?.(p)
    }

    async function loadBundles(bundleNames: string[]) {
      data.value = await PixiAssets.loadBundle(
        bundleNames.length === 1 ? bundleNames[0] : bundleNames,
        onProgress,
      )
      props.onLoaded?.(data.value)
    }

    async function load() {
      if (!props.entry)
        return
      let bundleNames: string[]

      if (props.id) {
        const id = props.id || nanoid(5)
        PixiAssets.addBundle(id, props.entry as PixiAssetsBundle['assets'])
        bundleNames = [id]
      }
      else {
        bundleNames = toArray(props.entry) as string[]
      }

      // If manifest is provided, initialize it first
      if (props.manifest)
        await PixiAssets.init({ manifest: props.manifest })

      if (props.autoload)
        await loadBundles(bundleNames)

      bundles.value = bundleNames
    }

    async function unload() {
      if (bundles.value.length > 0)
        await PixiAssets.unloadBundle(bundles.value).catch(() => undefined)
    }

    watch(
      () => [props.manifest, props.entry, props.autoload],
      async () => {
        loading.value = true
        try {
          await load()
          if (props.background && bundles.value.length > 0) {
            PixiAssets.backgroundLoadBundle(bundles.value)
          }
        }
        finally {
          loading.value = false
        }
      },
      { deep: true, immediate: true },
    )

    props.autounload && onBeforeUnmount(unload)

    return () => {
      if (!props.autoload || props.background)
        return renderSlot(slots, 'default')

      return loading.value
        ? renderSlot(slots, 'fallback', { progress: progress.value })
        : renderSlot(slots, 'default', { data: data.value })
    }
  },
})

function isAsset(alias: any, entry: any) {
  return alias && entry
}

function isStringArray(value: any) {
  return Array.isArray(value) && value.some(v => isString(v))
}
