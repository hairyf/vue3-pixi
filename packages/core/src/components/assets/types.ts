import type { ArrayOr, AssetsBundle, ResolvedAsset } from 'pixi.js'

/**
 * A fully resolved src, Glob patterns will not work here, and the src will be resolved to a single file.
 * @memberof assets
 * @property {string} src - The URL or relative path to the asset
 * @property {string} format - Format, usually the file extension
 * @property {string} loadParser - An override that will ensure that the asset is loaded with a specific parser
 * @property {any} data - Optional data
 */
export interface ResolvedSrc {
  src: string
  format: string
  loadParser: string
  data: any
}

/**
 * A valid asset src. This can be a string, or a [ResolvedSrc]{@link assets.ResolvedSrc},
 * or an array of either.
 * @memberof assets
 */
export type AssetSrc = ArrayOr<string> | (ArrayOr<ResolvedSrc>)

export interface UnresolvedAsset<T = any> extends Pick<ResolvedAsset<T>, 'data' | 'format' | 'loadParser'> {
  /** Aliases associated with asset */
  alias?: ArrayOr<string>
  /** The URL or relative path to the asset */
  src?: AssetSrc
}

export type AssetsBundleSrc = AssetsBundle['assets']
