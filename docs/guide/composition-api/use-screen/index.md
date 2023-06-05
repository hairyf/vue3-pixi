# useScreen

obtain responsive `screen` information of `pixiApp.screen`

```html
<script setup lang="ts">
const screen = useScreen()
</script>

<template>
  <sprite :x="screen.width / 2" :texture="textures.flowerTop" />
</template>
```