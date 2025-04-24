<script lang="ts" setup>
import { NScrollbar } from 'naive-ui'
defineProps<{
  showHighlighted: boolean
}>()
</script>

<template>
  <ClientOnly v-if="showHighlighted">
    <NScrollbar
      v-bind="$attrs"
      style="background-color: var(--vp-code-block-bg);"
      :theme-overrides="{
        color: 'rgba(255, 255, 255, 0.6)',
        colorHover: ' rgba(255, 255, 255, 0.3)',
      }"
    >
      <slot />
    </NScrollbar>
  </ClientOnly>
</template>

