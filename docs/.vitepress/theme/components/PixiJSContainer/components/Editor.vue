<script lang="ts" setup>
import { NScrollbar } from 'naive-ui'
defineProps<{
  highlightedHtml: string
  showHighlighted: boolean
}>()
</script>

<template>
  <ClientOnly v-if="showHighlighted">
    <NScrollbar
      v-bind="$attrs"
      :theme-overrides="{
        color: 'rgba(255, 255, 255, 0.6)',
        colorHover: ' rgba(255, 255, 255, 0.3)',
      }"
    >
      <div class="language-vue p0 m0!" v-html="highlightedHtml" />
    </NScrollbar>
  </ClientOnly>
</template>

