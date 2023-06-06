# Container

Creates a [Container](https://pixijs.download/release/docs/PIXI.Container.html)

A Container is the base component for all components that render to the screen. It can be used on its own, but components such as Sprite or Graphics will be composed of Containers

When child components are rendered inside, their coordinates become local to the parent Container.

<demo src="./demo/basic.vue" />

## API

### Container Attributes

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| width | ^[number] | | The width of the Container |
| height | ^[number] | | The height of the Container |
| position | <api-point /> | `0` | The position of the Container |
| x | ^[number] | `0` | The x coordinate of the Container |
| y | ^[number] | `0` | The y coordinate of the Container |
| pivot | <api-point /> | `0` | The pivot point of the Container that it rotates around. |
| pivot-x | ^[number] | `0` | The x pivot point of the Container that it rotates around. |
| pivot-y | ^[number] | `0` | The y pivot point of the Container that it rotates around. |
| scale | <api-point /> | `1` | The scale of the Container |
| scale-x | ^[number] | `1` | The x scale of the Container |
| scale-y | ^[number] | `1` | The y scale of the Container |
| skew | <api-point /> | `0` | The skew of the Container |
| skew-x | ^[number] | `0` | The x skew of the Container |
| skew-y | ^[number] | `0` | The y skew of the Container |
| rotation | ^[number] | `0` | The rotation of the Container |
| event-mode | ^[enum]`'auto' \| 'none' \| 'passive' \| 'static' \| 'dynamic'` | The event mode of the Container |
| alpha | ^[number] | `1` | The opacity of the Container |
| mask | ^[object]`Container \| MaskData` | `undefined` | The mask of the Container |
| hit-area ^[object]`IHitArea` | `undefined` | The hit area of the Container |

> more attributes in [PIXI.Container](https://pixijs.download/release/docs/PIXI.Container.html)