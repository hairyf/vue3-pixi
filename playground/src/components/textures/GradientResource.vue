<script lang="ts" setup>
import { BaseTexture, Resource, Texture } from 'pixi.js'

class GradientResource extends Resource {
  constructor() {
    // pass width and height. (0,0) if we dont know yet
    // gradient needs only 1 pixel height
    super(256, 1)
  }

  upload(renderer: any, baseTexture: any, glTexture: any) {
    const { width } = this // default size or from baseTexture?
    const { height } = this // your choice.

    // temporary canvas, we dont need it after texture is uploaded to GPU
    const canvas = document.createElement('canvas')

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')!

    const grd = ctx.createLinearGradient(0, 0, width, 0)

    grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)')
    grd.addColorStop(0.3, 'cyan')
    grd.addColorStop(0.7, 'red')
    grd.addColorStop(1, 'green')

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, width, height)

    // This info ios usseful if upload happens second time
    // Some people use that to track used memory
    glTexture.width = width
    glTexture.height = height

    // PURE WEBGL CALLS - that's what its all about.
    // PixiJS cant wrap all that API, we give you acceess to it!
    const { gl } = renderer

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.premultiplyAlpha)
    gl.texImage2D(baseTexture.target, 0, baseTexture.format, baseTexture.format, baseTexture.type, canvas)

    return true
  }
}

const gradBaseTexture = new BaseTexture(new GradientResource())

const texture = new Texture(gradBaseTexture)
</script>

<template>
  <sprite :position="100" :rotation="Math.PI / 8" :width="500" :height="50" :texture="texture" />
</template>

<style lang="scss" scoped></style>
