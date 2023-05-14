/* eslint-disable @typescript-eslint/ban-ts-comment */
import { camelize, effectScope, watchEffect } from 'vue-demi'
import type { Container } from 'pixi.js'
import {
  AnimatedSprite,
  BitmapText,
  Graphics,
  Mesh,
  SimplePlane,
  Sprite,
  TilingSprite,
} from 'pixi.js'
import { setTextureOptions } from '../utils'
import { setPoint, setValue } from './setter'
import { normalizeTexture } from './utils'

const defaultBooleanProps = ['accessible', 'cullable', 'renderable', 'visible', 'isMask'] as const
const bitmapBooleanProps = ['dirty', 'roundPixels'] as const
const tilingSpriteProps = ['uvRespectAnchor'] as const
const animatedSpriteBooleanProps = ['loop', 'updateAnchor'] as const
const meshBooleanProps = ['roundPixels'] as const
const simplePlaneBooleanProps = ['roundPixels', 'autoResize'] as const
const pointProps = ['position', 'scale', 'pivot', 'skew', 'anchor', 'tilePosition', 'tileScale'] as const

export function patchProp(
  el: Container,
  key: string,
  prevValue: any,
  nextValue: any,
) {
  key = camelize(key)

  const patches = [
    { element: Sprite, patch: patchSpriteProps },
    { element: Graphics, patch: patchGraphicsProps },
    { element: BitmapText, patch: patchBitmapTextProps },
    { element: TilingSprite, patch: patchTilingSpriteProps },
    { element: AnimatedSprite, patch: patchAnimatedSpriteProps },
    { element: Mesh, patch: patchMeshProps },
    { element: SimplePlane, patch: patchSimplePlaneProps },
  ]

  for (const { element, patch } of patches) {
    if (el instanceof element && patch(el as any, key, prevValue, nextValue))
      return
  }

  if (patchBooleanProps(el, defaultBooleanProps, key, nextValue))
    return

  if (patchPointProps(el, key, prevValue, nextValue))
    return

  if (patchEventProps(el, key, prevValue, nextValue))
    return

  Reflect.set(el, key, nextValue)
}

export function patchSpriteProps(el: Sprite, key: string, prevValue: any, nextValue: any): boolean {
  if (key === 'texture') {
    el.texture = normalizeTexture(nextValue)
    return true
  }
  if (key === 'textureOptions') {
    setTextureOptions(el.texture, nextValue)
    return true
  }
  return false
}

export function patchGraphicsProps(el: Graphics, key: string, prevValue: any, nextValue: any): boolean {
  if (key === 'onDraw' && !prevValue && typeof nextValue === 'function') {
    const scope = effectScope()
    scope.run(() => watchEffect(() => nextValue(el)))
    el.on('destroyed', () => scope.stop())
    return true
  }
  return false
}

export function patchBitmapTextProps(el: BitmapText, key: string, prevValue: any, nextValue: any): boolean {
  return patchBooleanProps(el, bitmapBooleanProps, key, nextValue)
}

export function patchTilingSpriteProps(el: TilingSprite, key: string, prevValue: any, nextValue: any): boolean {
  if (key === 'texture') {
    el.texture = normalizeTexture(nextValue)
    return true
  }
  if (key === 'textureOptions') {
    setTextureOptions(el.texture, nextValue)
    return true
  }
  return patchBooleanProps(el, tilingSpriteProps, key, nextValue)
}

export function patchAnimatedSpriteProps(el: AnimatedSprite, key: string, prevValue: any, nextValue: any): boolean {
  if (key === 'play')
    return setValue(el, key, () => nextValue ? el.play() : el.stop())

  return patchBooleanProps(el, animatedSpriteBooleanProps, key, nextValue)
}

export function patchMeshProps(el: Mesh, key: string, prevValue: any, nextValue: any): boolean {
  return patchBooleanProps(el, meshBooleanProps, key, nextValue)
}

export function patchSimplePlaneProps(el: SimplePlane, key: string, prevValue: any, nextValue: any): boolean {
  return patchBooleanProps(el, simplePlaneBooleanProps, key, nextValue)
}

export function patchPointProps(el: Container, key: string, prevValue: any, nextValue: any) {
  for (const name of pointProps) {
    if (key.startsWith(name))
      return setPoint(el, name, key, prevValue, nextValue)
  }
  return false
}

export function patchEventProps(el: Container, key: string, prevValue: any, nextValue: any) {
  if (!key.startsWith('on'))
    return false

  const eventName = key.slice(2).toLowerCase()
  if (prevValue)
    el.off(eventName as any, prevValue)
  if (nextValue)
    el?.on(eventName as any, nextValue)

  return true
}

export function patchBooleanProps<T extends Container>(
  el: T,
  props: readonly (keyof T)[],
  key: string,
  nextValue: any,
): boolean {
  if (props.includes(key as keyof T) && nextValue === '') {
    // @ts-expect-error
    el[key] = true
    return true
  }
  return false
}
