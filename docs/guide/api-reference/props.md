# Props

By default, the props of custom elements will be mapped to PIXI elements, while some special attributes will be handled separately.

## Set

Most props will work just like the properties on the corresponding PixiJS objects. In addition, they can also be used with the `x/y` suffix.

```html
<container :scale-x="10" :skew-y="0.5" />
```

Furthermore, you can also set properties in the form of arrays/objects:

```html
<container :anchor="[0.5, 0.8]" :pivot="{ x: 100, y: 200 }" />
```

## Scalar

Another shortcut you can use is to pass a scalar value to a property that expects an object, using the same value for the rest of the properties:

```html
<container :position="0.5" /> ✅
<container :position="[0.5, 0.5]" /> ✅
```