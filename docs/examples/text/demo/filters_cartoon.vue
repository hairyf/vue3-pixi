<script lang="ts" setup>
import { Color, Filter, GlProgram, GpuProgram, UniformGroup } from 'pixi.js'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

// GLSL vertex shader
const vertex = `
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vOut;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
vec4 filterVertexPosition( void ) {
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
    return vec4(position, 0.0, 1.0);
}
vec2 filterTextureCoord( void ) {
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}
void main(void) {
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    vOut = aPosition;
}
`

// GLSL fragment shader
const fragment = `
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uThickness;
uniform vec3 uBorderColor;
uniform vec3 uTopColor;
uniform vec3 uBottomColor;

in vec2 vOut;

uniform vec4 uInputClamp;
uniform vec4 uInputSize;

const float DOUBLE_PI = 6.28318530718;
const float ANGLE_STEP = 0.0628319;

float outlineMaxAlphaAtPos(vec2 pos) {
    vec2 thickness = vec2(uThickness) / uInputSize.xy;
    float maxAlpha = 0.0;

    for (float angle = 0.0; angle <= DOUBLE_PI; angle += ANGLE_STEP) {
        vec2 displacedPos = pos + thickness * vec2(cos(angle), sin(angle));
        vec4 displacedColor = texture(uTexture, clamp(displacedPos, uInputClamp.xy, uInputClamp.zw));
        maxAlpha = max(maxAlpha, displacedColor.a);
    }

    return maxAlpha;
}

void main(void) {
    vec4 contentColor = texture(uTexture, vTextureCoord);
    vec2 thickness = uThickness / uInputSize.xy;
    vec2 offset = vec2(0.0, thickness.y * 0.6);

    float outlineAlpha = outlineMaxAlphaAtPos(vTextureCoord) * (1.0 - contentColor.a);
    vec4 outlineColor = vec4(uBorderColor * outlineAlpha, outlineAlpha);

    float outlineBaseAlpha = outlineMaxAlphaAtPos(vTextureCoord - offset);
    vec4 outlineBaseColor = vec4(mix(uBorderColor, vec3(0.0), 0.35) * outlineBaseAlpha, outlineBaseAlpha);
    outlineBaseColor *= (1.0 - outlineAlpha) * (1.0 - contentColor.a);

    float outlineDropShadowAlpha = outlineMaxAlphaAtPos(vTextureCoord - (offset * 2.0));
    vec4 outlineDropShadowColor = vec4(vec3(0.0) * outlineDropShadowAlpha, outlineDropShadowAlpha) * 0.3;
    outlineDropShadowColor *= (1.0 - outlineAlpha) * (1.0 - contentColor.a);

    vec4 innerShadowAlpha = texture(uTexture, vTextureCoord + vec2(0.0, -thickness.y * 0.35));
    innerShadowAlpha.a = (1.0 - innerShadowAlpha.a) * contentColor.a;
    vec4 innerShadowColor = vec4(vec3(0.0) * innerShadowAlpha.a, innerShadowAlpha.a) * 0.3;

    float curveAmount = -0.05;
    float horizonY = 0.54 + curveAmount * sin(vOut.x * 3.14159);
    float gradientStart = horizonY - 0.005;
    float gradientEnd = horizonY + 0.005;
    float gradientRatio = smoothstep(gradientStart, gradientEnd, vOut.y);

    vec4 gradientColor = mix(vec4(uTopColor, 1.0), vec4(uBottomColor, 1.0), gradientRatio);
    gradientColor *= contentColor.a;

    finalColor = mix(gradientColor, innerShadowColor, innerShadowColor.a) + outlineColor + outlineBaseColor + outlineDropShadowColor;
}
`

// WGSL shader
const wgslSource = `
struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct CartoonTextUniforms {
  uThickness:f32,
  uBorderColor:vec3<f32>,
  uTopColor:vec3<f32>,
  uBottomColor:vec3<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> cartoonTextUniforms : CartoonTextUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) vOut : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;
    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;
    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   aPosition,
  );
}

const DOUBLE_PI: f32 = 6.28318530718;
const ANGLE_STEP: f32 = 0.0628319;

fn outlineMaxAlphaAtPos(pos: vec2<f32>) -> f32 {
    let thickness = vec2<f32>(cartoonTextUniforms.uThickness) / gfu.uInputSize.xy;
    var maxAlpha: f32 = 0.0;

    for (var angle: f32 = 0.0; angle <= DOUBLE_PI; angle += ANGLE_STEP) {
        let displacedPos = pos + thickness * vec2<f32>(cos(angle), sin(angle));
        let displacedColor = textureSample(uTexture, uSampler, clamp(displacedPos, gfu.uInputClamp.xy, gfu.uInputClamp.zw));
        maxAlpha = max(maxAlpha, displacedColor.a);
    }

    return maxAlpha;
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) vOut: vec2<f32>,
) -> @location(0) vec4<f32> {

    let contentColor = textureSample(uTexture, uSampler, uv);
    let thickness = cartoonTextUniforms.uThickness / gfu.uInputSize.xy;
    let offset = vec2<f32>(0.0, thickness.y * 0.6);

    let outlineAlpha = outlineMaxAlphaAtPos(uv) * (1.0 - contentColor.a);
    let outlineColor = vec4<f32>(cartoonTextUniforms.uBorderColor * outlineAlpha, outlineAlpha);

    let outlineBaseAlpha = outlineMaxAlphaAtPos(uv - offset);
    var outlineBaseColor = vec4<f32>(mix(cartoonTextUniforms.uBorderColor, vec3<f32>(0.0), 0.35) * outlineBaseAlpha, outlineBaseAlpha);
    outlineBaseColor *= (1.0 - outlineAlpha) * (1.0 - contentColor.a);

    let outlineDropShadowAlpha = outlineMaxAlphaAtPos(uv - (offset * 2.0));
    var outlineDropShadowColor = vec4<f32>(vec3<f32>(0.0) * outlineDropShadowAlpha, outlineDropShadowAlpha) * 0.3;
    outlineDropShadowColor *= (1.0 - outlineAlpha) * (1.0 - contentColor.a);

    let innerShadowAlpha = textureSample(uTexture, uSampler, uv + vec2<f32>(0.0, -thickness.y * 0.35));
    let innerShadowAlphaValue = (1.0 - innerShadowAlpha.a) * contentColor.a;
    let innerShadowColor = vec4<f32>(vec3<f32>(0.0) * innerShadowAlphaValue, innerShadowAlphaValue) * 0.3;

    let curveAmount: f32 = -0.05;
    let horizonY = 0.54 + curveAmount * sin(vOut.x * 3.14159);
    let gradientStart = horizonY - 0.005;
    let gradientEnd = horizonY + 0.005;
    let gradientRatio = smoothstep(gradientStart, gradientEnd, vOut.y);

    var gradientColor = mix(vec4<f32>(cartoonTextUniforms.uTopColor, 1.0), vec4<f32>(cartoonTextUniforms.uBottomColor, 1.0), gradientRatio);
    gradientColor *= contentColor.a;

    return mix(gradientColor, innerShadowColor, innerShadowColor.a) + outlineColor + outlineBaseColor + outlineDropShadowColor;
}
`

const thickness = 7

const gpuProgram = GpuProgram.from({
  vertex: {
    source: wgslSource,
    entryPoint: 'mainVertex',
  },
  fragment: {
    source: wgslSource,
    entryPoint: 'mainFragment',
  },
})

const glProgram = GlProgram.from({
  vertex,
  fragment,
  name: 'cartoon-text-filter',
})

const cartoonFilter = new Filter({
  gpuProgram,
  glProgram,
  padding: thickness * 2.1,
  resources: {
    cartoonTextUniforms: new UniformGroup({
      uThickness: { value: thickness, type: 'f32' },
      uBorderColor: { value: new Color(0xFFFFFF), type: 'vec3<f32>' },
      uTopColor: { value: new Color(0xED427C), type: 'vec3<f32>' },
      uBottomColor: { value: new Color(0xE91E63), type: 'vec3<f32>' },
    }),
  },
})
</script>

<template>
  <assets
    alias="Grandstander"
    entry="https://pixijs.com/assets/webfont-loader/Grandstander-ExtraBold.ttf"
  >
    <text
      :x="screen.width / 2"
      :y="screen.height / 2"
      :anchor="0.5"
      :style="{
        fontFamily: 'Grandstander ExtraBold',
        fontSize: 70,
        fill: 0xFFFFFF,
        padding: 0,
        filters: [cartoonFilter],
        fontWeight: '800',
      }"
    >
      Hello World!
    </text>
  </assets>
</template>
