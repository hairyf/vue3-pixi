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
  Texture,
  TilingSprite,
} from 'pixi.js'

const defaultBooleanProps = ['accessible', 'cullable', 'renderable', 'visible'] as const
const bitmapBooleanProps = ['dirty', 'roundPixels'] as const
const tilingSpriteProps = ['uvRespectAnchor'] as const
const animatedSpriteBooleanProps = ['loop', 'updateAnchor'] as const
const meshBooleanProps = ['roundPixels'] as const
const simplePlaneBooleanProps = ['roundPixels', 'autoResize'] as const

enum SpritePropKey {
  Texture = 'texture',
  Anchor = 'anchor',
  AnchorX = 'anchorX',
  AnchorY = 'anchorY',
}

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

  if (patchDefaultProps(el, key, prevValue, nextValue))
    return

  if (patchEventProps(el, key, prevValue, nextValue))
    return

  Reflect.set(el, key, nextValue)
}

export function patchSpriteProps(el: Sprite, key: string, prevValue: any, nextValue: any): boolean {
  switch (key) {
    case SpritePropKey.Texture: {
      el.texture = normalizeTexture(nextValue)
      return true
    }
    case SpritePropKey.Anchor: {
      if (typeof nextValue === 'number')
        el.anchor.set(nextValue, nextValue)
      else
        el.anchor.copyFrom(nextValue)
      return true
    }
    case SpritePropKey.AnchorX: {
      el.anchor.x = nextValue
      return true
    }
    case SpritePropKey.AnchorY: {
      el.anchor.y = nextValue
      return true
    }
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
  switch (key) {
    case 'anchor': {
      if (typeof nextValue === 'number')
        el.anchor.set(nextValue, nextValue)
      else
        el.anchor.copyFrom(nextValue)
      return true
    }
    case 'anchorX': {
      el.anchor.x = nextValue
      return true
    }
    case 'anchorY': {
      el.anchor.y = nextValue
      return true
    }
  }
  return patchBooleanProps(el, bitmapBooleanProps, key, nextValue)
}

export function patchTilingSpriteProps(el: TilingSprite, key: string, prevValue: any, nextValue: any): boolean {
  return patchBooleanProps(el, tilingSpriteProps, key, nextValue)
}

export function patchAnimatedSpriteProps(el: AnimatedSprite, key: string, prevValue: any, nextValue: any): boolean {
  return patchBooleanProps(el, animatedSpriteBooleanProps, key, nextValue)
}

export function patchMeshProps(el: Mesh, key: string, prevValue: any, nextValue: any): boolean {
  return patchBooleanProps(el, meshBooleanProps, key, nextValue)
}

export function patchSimplePlaneProps(el: SimplePlane, key: string, prevValue: any, nextValue: any): boolean {
  return patchBooleanProps(el, simplePlaneBooleanProps, key, nextValue)
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

export function patchDefaultProps<T extends Container>(el: T, key: string, prevValue: any, nextValue: any) {
  switch (key) {
    case 'position':
      el.position.copyFrom(nextValue)
      return true
    case 'scale':
      if (typeof nextValue === 'number')
        el.scale.set(nextValue, nextValue)
      else
        el.scale.copyFrom(nextValue)
      return true
    case 'scaleX':
      el.scale.x = nextValue
      return true
    case 'scaleY':
      el.scale.y = nextValue
      return true
    case 'pivot':
      if (typeof nextValue === 'number')
        el.pivot.set(nextValue, nextValue)
      else
        el.pivot.copyFrom(nextValue)
      return true
    case 'pivotX':
      el.pivot.x = nextValue
      return true
    case 'pivotY':
      el.pivot.y = nextValue
      return true
  }
  return false
}

export function patchEventProps<T extends Container>(el: T, key: string, prevValue: any, nextValue: any) {
  if (key.startsWith('on')) {
    const eventName = key.slice(2).toLowerCase()
    if (prevValue)
      el.off(eventName as any, prevValue)
    el.on(eventName as any, nextValue)
    return true
  }
  return false
}

export function normalizeTexture(value: Texture | string): Texture {
  if (typeof value === 'string')
    return Texture.from(value)
  return value
}
