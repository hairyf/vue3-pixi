/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable vue/one-component-per-file */
import { type ArrayOr, type AssetsManifest, type AssetsPreferences, type BundleIdentifierOptions, Assets as _PixiAssets } from 'pixi.js'
import { defineComponent } from 'vue-demi'
import type { PropType, SlotsType } from 'vue-demi'
import type { AssetsBundleSrc, ResolvedSrc, UnresolvedAsset } from './types'

export const assetsProps = {
  basePath: String,

  /**
   * 通过 Assets.init 加载资源清单
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
   * 用于加载资源的入口，支持多种格式
   *
   * @type {string | string[] | ResolvedSrc | ResolvedSrc[]} 用于指定资源的路径（地址或文件路径）
   * @example
   * ```vue
   * <assets alias="myAsset" :entry="'path/to/asset'" />
   * <assets alias="myAsset" :entry="{{ src: 'path/to/asset', type: 'image' }}" />
   * ```
   *
   * @type {UnresolvedAsset | UnresolvedAsset[]} 用于指定资源的元数据
   * @example
   * ```vue
   * <assets :entry="{ alias: 'myAsset', src: 'path/to/asset' }" />
   * <assets
   *  :entry="[
   *   { alias: 'myAsset', src: 'path/to/asset' },
   *   { alias: 'myAsset2', src: 'path/to/asset2' }
   *  ]"
   *
   * />
   * ```
   */
  entry: [String, Object, Array] as PropType<string | string[] | ResolvedSrc | ResolvedSrc[] | UnresolvedAsset | UnresolvedAsset[]>,

  /**
   * 是否通过 `Assets.load` 进行自动加载
   *
   * @default false
   */
  autoload: Boolean,

  /**
   * 资源加载完成时的回调，只有在 `autoload` 为 `true` 时才会被调用
   */
  onLoaded: Function as PropType<(value: any) => void>,
  /**
   * 资源加载进度更新时的回调，只有在 `autoload` 为 `true` 时才会被调用
   */
  onProgress: Function as PropType<(progress: number) => void>,
} as const

export const Assets = defineComponent({
  props: assetsProps,
  slots: Object as SlotsType<{ default: any; fallback: number }>,
  setup(_props) {
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
   * <assets-bundle id="myBundle" :entry="{ aliasName: { src: 'path/to/asset' } }" />
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
   * 是否通过 `Assets.loadBundle` 进行自动加载
   * @default false
   */
  autoload: Boolean,

  /**
    * 资源加载完成时的回调，只有在 `autoload` 为 `true` 时才会被调用
    */
  onLoaded: Function as PropType<(value: any) => void>,
  /**
    * 资源加载进度更新时的回调，只有在 `autoload` 为 `true` 时才会被调用
    */
  onProgress: Function as PropType<(progress: number) => void>,
} as const

export const AssetsBundle = defineComponent({
  props: assetsBundleProps,
  slots: Object as SlotsType<{ default: any; fallback: number }>,
  setup(_props) {
  },
})
