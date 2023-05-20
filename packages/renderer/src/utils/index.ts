/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { IBaseTextureOptions } from 'pixi.js'

import { Texture } from 'pixi.js'
import { camelize } from 'vue-demi'

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

export function encodeText(text: string) {
  return text.replace('\n', '&amp;')
}

export function isCustomFilter(prefix: string, name: string) {
  const isPrefix = name.startsWith(prefix)
  name = camelize(name)
  name = name.charAt(0).toUpperCase() + name.slice(1)
  return (
    isPrefix && name.slice(prefix.length) === 'Filter'
  ) || name === 'Filter'
}

export function isExistsEvent(props?: any) {
  return Object.keys(props || {}).some(p => p.startsWith('on'))
}
