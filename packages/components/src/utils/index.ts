/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { IBaseTextureOptions, Texture } from 'pixi.js'
import type { App, AppContext } from 'vue'

export function setTextureOptions(texture: Texture, options: IBaseTextureOptions = {}) {
  for (const key in options)
    // @ts-expect-error
    texture.baseTexture[key] = options[key]
}

export function inheritParent(app: App<Element>, appContext?: AppContext) {
  const parent = appContext?.app
  if (parent) {
    app.config.globalProperties = parent.config.globalProperties
    Object.assign(app._context, parent._context)
  }
}
