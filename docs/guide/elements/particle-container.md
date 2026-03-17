# ParticleContainer

Creates a [ParticleContainer](https://pixijs.download/release/docs/scene.ParticleContainer.html)

A highly optimized container built for rendering large numbers of sprites. The tradeoff is that advanced features like masking, filters, and nested containers are not supported for particles.

::: warning Imperative Usage Only
In PixiJS v8, `ParticleContainer` uses `Particle` objects, not Containers. Particles must be added via `addParticle()` and removed via `removeParticle()`. Declarative `<particle>` children inside `<particle-container>` will not work.

Use the imperative approach shown below.
:::

## Usage

Create `Particle` instances imperatively and manage them through the `ParticleContainer` ref:

<demo :width="400" src="./demo/particle-container-demo.vue" />

### Creating Particles

```vue
<script setup>
import { Particle, Texture } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const containerRef = ref()

function onEffect(pc) {
  const particles = Array.from({ length: 100 }, () => {
    const p = new Particle({ texture: Texture.from('mySprite') })
    p.x = Math.random() * 400
    p.y = Math.random() * 300
    return p
  })
  pc.addParticle(...particles)
}

onTick(() => {
  if (!containerRef.value)
    return
  for (const p of containerRef.value.particleChildren) {
    p.y += 1
  }
})
</script>

<template>
  <particle-container ref="containerRef" @effect="onEffect" />
</template>
```

### Particle Properties

Particles support a limited set of properties for performance. Set them directly on the `Particle` instance:

| Property | Type | Description |
| --- | --- | --- |
| `x`, `y` | ^[number] | Position |
| `scaleX`, `scaleY` | ^[number] | Scale on each axis |
| `rotation` | ^[number] | Rotation in radians |
| `anchorX`, `anchorY` | ^[number] | Anchor point (0 to 1) |
| `tint` | ^[number] | Tint color |
| `alpha` | ^[number] | Opacity (0 to 1) |
| `texture` | ^[object]`Texture` | The particle's texture |

### Dynamic Properties

`ParticleContainer` accepts a `dynamicProperties` option at creation to control which properties can be updated after the initial render. This improves performance by skipping upload of static properties:

```vue
<template>
  <particle-container
    :dynamic-properties="{
      vertex: true,
      position: true,
      rotation: false,
      uvs: false,
      tint: false,
    }"
    @effect="onEffect"
  />
</template>
```

## API

### ParticleContainer Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `'normal'` | The blend mode to be applied to the container. |
| round-pixels | ^[boolean] | `false` | Whether to round particle positions to whole pixels. |
| dynamic-properties | ^[object] | `undefined` | Controls which properties can update after creation (`vertex`, `position`, `rotation`, `uvs`, `tint`). |

> more props in [Container Props](/guide/elements/container#container-props) and [ParticleContainer](https://pixijs.download/release/docs/scene.ParticleContainer.html)

### ParticleContainer Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: ParticleContainer): void` | Custom render function. Use this to add particles imperatively. |

> more events in [Container Events](/guide/elements/container#container-events)

### Instance Methods

| Name | Signature | Description |
| --- | --- | --- |
| addParticle | `(...particles: Particle[]): void` | Add particles to the container. |
| removeParticle | `(...particles: Particle[]): void` | Remove particles from the container. |

### Instance Properties

| Name | Type | Description |
| --- | --- | --- |
| particleChildren | ^[array]`Particle[]` | Array of all particles in the container. |
