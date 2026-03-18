# External

Insert external DOM elements in any Pixi Application, and they will be added below the canvas.

::: warning
You may not need this component, as you can simply insert DOM elements below `<Application>`. This component is usually used for document debugging, such as debugging display counts.
:::

<demo :width="400" src="../elements/demo/particle-container-demo.vue" />

## API

### External Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| tag | ^[string] | `div` | The HTML tag of the external element |
| root | ^[HTMLElement] | `undefined` | The root element to append to. Defaults to the canvas parent node. |

## External Slots

| Name | Types | Description |
| ---- | ---- | ---- |
| default | | Content to render inside the external DOM element. |
