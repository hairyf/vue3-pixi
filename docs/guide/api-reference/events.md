# Events

All events emitted by PixiJS objects are supported. Some of Vue's event modifiers will work, like `@click.left`.

> Adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

<demo src="./demo/events.vue" />

## Effect Events

All elements support the `@effect` event for manipulating elements directly. This is useful with `<graphics />` and other elements that need imperative drawing.

This sets up a `watchEffect` internally that re-runs the handler whenever its reactive dependencies change.

<demo src="../demo/render-event.vue" />

::: tip
In previous versions this event was called `@render`. It has been renamed to `@effect` to avoid confusion with the PixiJS render cycle.
:::
