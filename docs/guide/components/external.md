# External

Insert external elements in any Pixi Application, and they will be added below the canvas.

::: warning
You may not need this component, as you can simply insert DOM elements below `<Application>`. This component is usually used for document debugging, such as debugging display counts.
:::

<demo :width="400" src="./demo/external.vue" />

## API

### External Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| tag | ^[string] | `div` | The tag of the external element |

## External Slots

| Name | Types | Description |
| ---- | ---- | ---- |