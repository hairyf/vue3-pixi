# ParticleContainer

Creates a [ParticleContainer](https://pixijs.download/release/docs/scene.ParticleContainer.html)

A really fast version of the Container built solely for speed, so use when you need a lot of sprites or particles.

The tradeoff of the ParticleContainer is that most advanced functionality will not work. ParticleContainer implements the basic object transform (position, scale, rotation) and some advanced functionality like tint.

Other more advanced functionality like masking, filters, etc will not work on sprites in this batch.

::: warning Imperative Usage Only
In PixiJS v8, `ParticleContainer` uses `Particle` objects which are **not** Containers. They cannot be added via `addChild()` — you must use `addParticle()` instead. This means declarative `<particle>` children inside `<particle-container>` will not work.

Use the imperative approach shown below for particle management.
:::

## Usage

Note: when working with thousands of components, it is **much** more performant to create & update the Pixi instances directly instead of through components

<demo :width="400" src="./demo/particle-container-demo.vue" />

## API

### ParticleContainer Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `'normal'` | The blend mode to be applied to the container. |

> more props in [Container Props](/guide/elements/container#container-props) and [ParticleContainer](https://pixijs.download/release/docs/scene.ParticleContainer.html)

### ParticleContainer Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: ParticleContainer): void` | custom render function |

> more events in [Container Events](/guide/elements/container#container-events)
