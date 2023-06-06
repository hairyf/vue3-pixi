# ParticleContainer

Creates a [ParticleContainer](https://pixijs.download/release/docs/PIXI.ParticleContainer.html)

A really fast version of the Container built solely for speed, so use when you need a lot of sprites or particles.

The tradeoff of the ParticleContainer is that most advanced functionality will not work. ParticleContainer implements the basic object transform (position, scale, rotation) and some advanced functionality like tint.

Other more advanced functionality like masking, filters, etc will not work on sprites in this batch.

## Usage

Note: when working with thousands of components, it is **much** more performant to create & update the Pixi instances directly instead of through components

<demo :width="400" src="./demo/basic.vue" />

## API

### ParticleContainer Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `BLEND_MODES.NORMAL` | The blend mode to be applied to the sprite. |