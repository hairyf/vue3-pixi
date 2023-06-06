<script lang="ts" setup>
import { NButton, NPopover } from 'naive-ui'
import { BLEND_MODES } from 'pixi.js'
defineProps<{
  type: string
  details: string
}>()
</script>

<template>
  <span class="inline-flex items-center">
    <div v-if="type.startsWith('-')" class="mr-1 line-height-16px">
      {{ type.slice(1) }}
    </div>
    <code v-else-if="type" class="mr-1 line-height-16px">
      {{ type }}
    </code>
    <ClientOnly>
      <n-popover v-if="details" trigger="hover">
        <template #trigger>
          <NButton
            text
            :theme-overrides="{
              textColorTextHover: 'var(--vp-button-brand-hover-bg)',
              textColorTextPressed: 'var(--vp-button-brand-bg)',
            }"
          >
            <div class="i-solar-info-circle-broken" />
          </NButton>
        </template>
        <slot>
          <code class="p3px text-12px color-[var(--vp-c-text-code)] bg-[var(--vp-c-mute)]">
            {{ details }}
          </code>
        </slot>
      </n-popover>
    </ClientOnly>
  </span>
</template>
