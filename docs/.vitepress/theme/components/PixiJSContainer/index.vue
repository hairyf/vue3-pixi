<script lang="ts" setup>
import Card from '../Card/index.vue'
const props = withDefaults(
  defineProps<{
    sfcTsCode: string
    // if using ts, sfcJsCode will transform the to js
    sfcJsCode: string
    sfcTsHtml: string
    sfcJsHtml: string
    title: string
    metadata: Record<string, any>
    expand?: boolean
  }>(),
  {
    expand: true,
  },
)
</script>

<template>
  <Card>---</Card>
</template>

<style lang="scss" scoped></style>
