# Graphics

Creates a [Graphics](https://pixijs.download/release/docs/PIXI.Graphics.html)

Graphics can be used for any kind of drawing. Use the `draw` prop to interact with the PIXI.Graphics API.

This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the render method have changed.

<demo src="./demo/basic.vue" />