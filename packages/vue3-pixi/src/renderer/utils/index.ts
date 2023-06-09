/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { IBaseTextureOptions } from 'pixi.js'

import { Texture } from 'pixi.js'

export function setTextureOptions(texture: Texture, options: IBaseTextureOptions = {}) {
  for (const key in options)
    // @ts-expect-error
    texture.baseTexture[key] = options[key]
}

export function normalizeTexture(value: Texture | string): Texture {
  if (typeof value === 'string')
    return Texture.from(value)
  return value
}

export function isOn(props?: any) {
  return Object.keys(props || {}).some(p => p.startsWith('on'))
}
