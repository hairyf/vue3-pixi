# Events

All events emitted by pixi objects are supported. Some of vue's event modifiers will work, like `@click.left`.

> adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

<demo src="./demo/events.vue" />

## Effect Events

All elements support the `@effect` event for manipulating elements directly. This is useful with `<graphics />` and `<particle-container />`.

This sets up a `watchEffect` internally that re-runs the handler whenever its reactive dependencies change.

<demo src="../demo/render-event.vue" />
