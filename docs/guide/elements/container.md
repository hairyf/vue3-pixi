# Container

Creates a [Container](https://pixijs.download/release/docs/PIXI.Container.html)

A Container is the base component for all components that render to the screen. It can be used on its own, but components such as Sprite or Graphics will be composed of Containers

When child components are rendered inside, their coordinates become local to the parent Container.

<demo src="./demo/container.vue" />

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
| event-mode | ^[enum]`'auto' \| 'none' \| 'passive' \| 'static' \| 'dynamic'` | `'auto'` | The event mode of the Container |
| alpha | ^[number] | `1` | The opacity of the Container |
| mask | ^[object]`Container \| MaskData` | `undefined` | The mask of the Container |
| hit-area | ^[object]`IHitArea` | `undefined` | The hit area of the Container |

> more attributes in [PIXI.Container](https://pixijs.download/release/docs/PIXI.Container.html)

### Container Events

| Name | Type | Description |
| ---- | ---- | ---- |
| added | ^[function]`(el: Container): void` | when the Container is added to the stage |
| child-added | ^[function]`(child: DisplayObject, el: Container, index: number): void` | when a child is added to the Container |
| child-removed | ^[function]`(child: DisplayObject, el: Container, index: number): void` | when a child is removed from the Container |
| removed | ^[function]`(el: Container): void` | when the Container is removed from the stage |
| render | ^[function]`(el: Container): void` | custom rendering listener |
| ^[-click]`modifiers(left, right, midden)` | ^[function]`(event: FederatedPointerEvent):void` | when the Container is clicked |
| ^[-mousedown]`modifiers(left, right, midden)` | ^[function]`(event: FederatedPointerEvent):void` | when the mouse button is pressed down on the Container |
| ^[-mouseup]`modifiers(left, right, midden)` | ^[function]`(event: FederatedPointerEvent):void` | when the mouse button is released over the Container |
| ^[-mouseover]`modifiers(left, right, midden)` | ^[function]`(event: FederatedPointerEvent):void` | when the mouse cursor moves over the Container |
| ^[-mouseout]`modifiers(left, right, midden)` | ^[function]`(event: FederatedPointerEvent):void` | when the mouse cursor moves out of the Container |
| ^[-mousemove]`modifiers(left, right, midden)` | ^[function]`(event: FederatedPointerEvent):void` | when the mouse cursor moves while over the Container |
| ^[-mouseupoutside]`modifiers(left, right, midden)` | ^[function]`(event: FederatedPointerEvent):void` | when the mouse button is released outside the Container |
| pointercancel | ^[function]`(event: FederatedPointerEvent):void` | when a pointer event is canceled |
| pointerdown | ^[function]`(event: FederatedPointerEvent):void` | when a pointer down event is detected |
| pointermove | ^[function]`(event: FederatedPointerEvent):void` | when a pointer move event is detected |
| pointerout | ^[function]`(event: FederatedPointerEvent):void` | when a pointer leaves event is detected |
| pointerover | ^[function]`(event: FederatedPointerEvent):void` | when a pointer over event is detected |
| pointertap | ^[function]`(event: FederatedPointerEvent):void` | when a pointer tap event is detected |
| pointerup | ^[function]`(event: FederatedPointerEvent):void` | when a pointer up event is detected |
| pointerupoutside | ^[function]`(event: FederatedPointerEvent):void` | when a pointer up outside event is detected |
| tab | ^[function]`(event: FederatedPointerEvent):void` | when a tab event is detected |
| touchcancel | ^[function]`(event: FederatedPointerEvent):void` | when a touch cancel event is detected |
| touchend | ^[function]`(event: FederatedPointerEvent):void` | when a touch end event is detected |
| touchendoutside | ^[function]`(event: FederatedPointerEvent):void` | when a touch end outside event is detected |
| touchmove | ^[function]`(event: FederatedPointerEvent):void` | when a touch move event is detected |
| touchstart | ^[function]`(event: FederatedPointerEvent):void` | when a touch start event is detected |

> more events in [PIXI.Container](https://pixijs.download/release/docs/PIXI.Container.html)

### Graphics Slots

| Name | Description |
| --- | --- |
| default | The default slot is used to render the children of the Container element. |