# useApplication

Returns a ref to the current PixiJS [Application](https://pixijs.download/release/docs/app.Application.html) instance.

```html
<script setup lang="ts">
import { useApplication } from "vue3-pixi";

const app = useApplication()

// set background color
app.value.renderer.background.color = 0x061639
</script>
```
