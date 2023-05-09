import { Texture } from 'pixi.js'
import { camelize } from 'vue-demi'

export function normalizeTexture(value: Texture | string): Texture {
  if (typeof value === 'string')
    return Texture.from(value)
  return value
}

export function isCustomFilter(prefix: string, name: string) {
  const isPrefix = name.startsWith(prefix)
  name = camelize(name)
  name = name.charAt(0).toUpperCase() + name.slice(1)
  return (
    isPrefix && name.slice(prefix.length) === 'Filter'
  ) || name === 'Filter'
}
