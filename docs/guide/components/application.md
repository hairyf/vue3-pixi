# Application

Creates a PixiJS [Application](https://pixijs.download/release/docs/app.Application.html).

Creates a Pixi application where all Pixi elements and composition functions need to be inside the application to work properly. In v8, the application is initialized asynchronously via `app.init()`.

<demo src="./demo/application.vue" :app="false" />

## Getting Instance Externally

You can obtain the Application instance by binding a ref externally, but it is generally recommended to use `useApplication` internally.

<demo src="./demo/application-render.vue" :app="false" />

## API

### Application Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| width | ^[number] | `undefined` | The width of the renderer |
| height | ^[number] | `undefined` | The height of the renderer |
| background | <api-color /> | | The background color of the renderer |
| backgroundColor | <api-color /> | `0x000000` | The background color of the renderer |
| backgroundAlpha | ^[number] | `1` | The background alpha of the renderer |
| resolution | ^[number] | `1` | The resolution / device pixel ratio of the renderer |
| preference | ^[string]`'webgl' \| 'webgpu'` | `'webgl'` | Which rendering backend to prefer |
| antialias | ^[boolean] | `undefined` | Whether to enable antialiasing |
| autoDensity | ^[boolean] | `undefined` | Whether to resize the CSS dimensions of the canvas to match the resolution |
| autoStart | ^[boolean] | `true` | Whether to automatically start the ticker |
| clearBeforeRender | ^[boolean] | `undefined` | Whether to clear the canvas before each render |
| hello | ^[boolean] | `undefined` | Whether to log the PixiJS version to the console |
| preserveDrawingBuffer | ^[boolean] | `undefined` | Whether to preserve the drawing buffer |
| roundPixels | ^[boolean] | `undefined` | Whether to round pixel values |
| resizeTo | ^[HTMLElement] ^[Window] | `undefined` | Element to auto-resize the renderer to |

> more props in [PixiJS ApplicationOptions](https://pixijs.download/release/docs/app.Application.html)

### Application Slots

| Name | Description |
| ---- | ---- |
| default | The default slot is where you put all your Pixi elements. |
