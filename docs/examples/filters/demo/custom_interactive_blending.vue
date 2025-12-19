<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { Filter, GlProgram, Point, Rectangle } from 'pixi.js'
import { onReady, useScreen, useStage } from 'vue3-pixi'

const screen = useScreen()
const stage = useStage()

const fragment = `
 precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec2 uMouse;
uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform float uTime;

void main() {
    vec2 screenPos = vTextureCoord * uInputSize.xy + uOutputFrame.xy;
    if (length(uMouse - screenPos) < 25.0) {
        finalColor = vec4(1.0, 1.0, 0.0, 1.0) * 0.7; //yellow circle, alpha=0.7
    } else {
        // blend with underlying image, alpha=0.5
        finalColor = vec4( sin(uTime), (uMouse.xy - uOutputFrame.xy) / uOutputFrame.zw, 1.0) * 0.5;
    }
}
`

const vertex = `
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`

const filter = new Filter({
  glProgram: new GlProgram({ vertex, fragment }),
  resources: {
    localUniforms: {
      uMouse: { value: new Point(), type: 'vec2<f32>' },
    },
  },
})

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'mousemove', (event: any) => {
  filter.resources.localUniforms.uniforms.uMouse.copyFrom(event.global)
})
</script>

<template>
  <assets alias="bg_grass" entry="https://pixijs.com/assets/bg_grass.jpg">
    <sprite texture="bg_grass" :width="screen.width" :height="screen.height" />
    <container
      @effect="container => {
        container.filterArea = new Rectangle(
          100,
          100,
          screen.width - 200,
          screen.height - 200,
        );
      }"
    >
      <filter :is="filter" />
    </container>
  </assets>
</template>
