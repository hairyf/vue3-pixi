<script lang="ts" setup>
import { Filter, GlProgram } from 'pixi.js'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

// Fragment shader with time-based animation
const fragment = `
in vec2 vTextureCoord;
in vec4 vColor;

uniform sampler2D uTexture;
uniform float uTime;

void main(void)
{
    vec2 uvs = vTextureCoord.xy;

    vec4 fg = texture2D(uTexture, vTextureCoord);


    fg.r = uvs.y + sin(uTime);


    gl_FragColor = fg;

}
`
// Vertex shader
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
  glProgram: new GlProgram({
    fragment,
    vertex,
  }),
  resources: {
    timeUniforms: {
      uTime: { value: 0.0, type: 'f32' },
    },
  },
})

// Animate the filter
onTick(ticker => filter.resources.timeUniforms.uniforms.uTime += 0.04 * ticker.deltaTime)
</script>

<template>
  <assets alias="bg_grass" entry="https://pixijs.com/assets/bg_grass.jpg">
    <sprite
      texture="bg_grass"
      :width="screen.width"
      :height="screen.height"
    >
      <filter :is="filter" />
      <!-- or -->
      <!-- <filter ref="filterRef" :gl-program="glProgram" :resources="resources" /> -->
    </sprite>
  </assets>
</template>
