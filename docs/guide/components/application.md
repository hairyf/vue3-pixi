Translation:

# Application

Creates a [Application](https://pixijs.download/release/docs/PIXI.Application.html).

Creates a Pixi application where all Pixi elements and composite functions need to be inside the application to work properly.

<demo src="./demo/application.vue" :app="false" />

## Getting Instance Externally

You can obtain the Application instance by binding a ref externally, but it is generally recommended to use `useApplication` internally.

<demo src="./demo/application-render.vue" :app="false" />

## API

### Application Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| width | ^[number] | `800` | The width of the renderer |
| height | ^[number] | `600` | The height of the renderer |
| background | <api-color /> | | The background color of the renderer |
| backgroundColor | <api-color /> | `0x000000` | The background color of the renderer |
| backgroundAlpha | ^[number] | `1` | The background alpha of the renderer |
| resolution | ^[number] | `1` | The resolution / device pixel ratio of the renderer |

> more props in [PIXI.Application](https://pixijs.download/release/docs/PIXI.Application.html)

### Application Slots

| Name | Description |
| ---- | ---- |
| default | The default slot is where you put all your Pixi elements. |