/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { IBaseTextureOptions, Texture } from 'pixi.js'

export function setTextureOptions(texture: Texture, options: IBaseTextureOptions = {}) {
  for (const key in options)
    // @ts-expect-error
    texture.baseTexture[key] = options[key]
}
