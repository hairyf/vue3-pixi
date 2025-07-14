import type { TextureOptions } from 'pixi.js'

import { Texture } from 'pixi.js'

export function setTextureOptions(texture: Texture, options: TextureOptions = {}) {
  for (const key in options)
    // eslint-disable-next-line ts/ban-ts-comment
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

export function withThisRender(props: any) {
  if (!props.onRender)
    return
  const source = props.onRender
  // eslint-disable-next-line style/max-statements-per-line
  props.onRender = function (this, renderer: any) { source(this, renderer) }
}
