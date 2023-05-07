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

const defaultBooleanProps = [
  'accessible',
  'cullable',
  'renderable',
  'visible',
] as const

export function patchProp(
  el: Container,
  key: string,
  prevValue: any,
  nextValue: any,
) {
  key = camelize(key)

  if (el instanceof Sprite && patchSpriteProp(el, key, prevValue, nextValue))
    return
  else if (
    el instanceof Graphics
    && patchGraphicsProps(el, key, prevValue, nextValue)
  )
    return
  else if (
    el instanceof BitmapText
    && patchBitmapTextProps(el, key, prevValue, nextValue)
  )
    return
  else if (
    el instanceof TilingSprite
    && patchTilingSpriteProps(el, key, prevValue, nextValue)
  )
    return
  else if (
    el instanceof AnimatedSprite
    && patchAnimatedSpriteProps(el, key, prevValue, nextValue)
  )
    return
  else if (el instanceof Mesh && patchMeshProps(el, key, prevValue, nextValue))
    return
  else if (
    el instanceof SimplePlane
    && patchSimplePlaneProps(el, key, prevValue, nextValue)
  )
    return

  if (setBooleanProp(el, defaultBooleanProps, key, nextValue))
    return

  switch (key) {
    case 'position':
      el.position.copyFrom(nextValue)
      break
    case 'scale':
      if (typeof nextValue === 'number')
        el.scale.set(nextValue, nextValue)
      else el.scale.copyFrom(nextValue)
      break
    case 'scaleX':
      el.scale.x = nextValue
      break
    case 'scaleY':
      el.scale.y = nextValue
      break
    case 'pivot':
      if (typeof nextValue === 'number')
        el.pivot.set(nextValue, nextValue)
      else el.pivot.copyFrom(nextValue)
      break
    case 'pivotX':
      el.pivot.x = nextValue
      break

    case 'pivotY':
      el.pivot.y = nextValue
      break
    default: {
      if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase()
        if (prevValue)
          el.off(eventName as any, prevValue)
        el.on(eventName as any, nextValue)
        return
      }

      Reflect.set(el, key, nextValue)
    }
  }
}

export function patchSpriteProp(
  el: Sprite,
  key: string,
  prevValue: any,
  nextValue: any,
): boolean {
  switch (key) {
    case 'texture': {
      el.texture = normalizeTexture(nextValue)
      return true
    }
    case 'anchor': {
      if (typeof nextValue === 'number')
        el.anchor.set(nextValue, nextValue)
      else el.anchor.copyFrom(nextValue)
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

  return false
}

export function patchGraphicsProps(
  el: Graphics,
  key: string,
  prevValue: any,
  nextValue: any,
): boolean {
  if (key === 'onDraw' && !prevValue && typeof nextValue === 'function') {
    /*
      Sets up a watchEffect that will automatically re-render the content if any deps change
    */
    const scope = effectScope()
    scope.run(() => {
      watchEffect(() => nextValue(el))
    })

    el.on('destroyed', () => scope.stop())

    return true
  }

  return false
}

const bitmapBooleanProps = ['dirty', 'roundPixels'] as const

export function patchBitmapTextProps(
  el: BitmapText,
  key: string,
  prevValue: any,
  nextValue: any,
): boolean {
  switch (key) {
    case 'anchor': {
      if (typeof nextValue === 'number')
        el.anchor.set(nextValue, nextValue)
      else el.anchor.copyFrom(nextValue)
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

  return setBooleanProp(el, bitmapBooleanProps, key, nextValue)
}

const tilingSpriteProps = ['uvRespectAnchor'] as const

export function patchTilingSpriteProps(
  el: TilingSprite,
  key: string,
  prevValue: any,
  nextValue: any,
): boolean {
  return setBooleanProp(el, tilingSpriteProps, key, nextValue)
}

const animatedSpriteBooleanProps = ['loop', 'updateAnchor'] as const

export function patchAnimatedSpriteProps(
  el: AnimatedSprite,
  key: string,
  prevValue: any,
  nextValue: any,
): boolean {
  return setBooleanProp(el, animatedSpriteBooleanProps, key, nextValue)
}

const meshBooleanProps = ['roundPixels'] as const

export function patchMeshProps(
  el: Mesh,
  key: string,
  prevValue: any,
  nextValue: any,
): boolean {
  return setBooleanProp(el, meshBooleanProps, key, nextValue)
}

const simplePlaneBooleanProps = ['roundPixels', 'autoResize'] as const

export function patchSimplePlaneProps(
  el: SimplePlane,
  key: string,
  prevValue: any,
  nextValue: any,
): boolean {
  return setBooleanProp(el, simplePlaneBooleanProps, key, nextValue)
}

function setBooleanProp<T extends Container>(
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

export function normalizeTexture(value: Texture | string): Texture {
  if (typeof value === 'string')
    return Texture.from(value)
  return value
}
