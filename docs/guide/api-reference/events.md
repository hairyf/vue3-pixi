# Events

All events emitted by pixi objects are supported. Some of vue's event modifiers will work, like `@click.left`.

> adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

<demo src="./demo/events.vue" />


## Render Events

all elements support render event, which allows for flexible manipulation of elements, For example, using on `<grahpics />` and `<particle-container />`

This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the render method have changed.

<demo src="../demo/render-event.vue" />