# useApplication

This composable hook is used to obtain the current Pixi [Application](https://svelte-pixi.com/docs/components/application) instance.

```html
<script setup lang="ts">
import { useApplication } from "vue3-pixi";

const app = useApplication()

// set background color
app.value.renderer.backgroundColor = 0x061639
</script>
```