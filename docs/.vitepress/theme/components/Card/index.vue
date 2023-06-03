<template>
  <div class="rounded-lg overflow-hidden bg-[var(--vp-code-block-bg)]">
    <div class="flex justify-between items-center p4 text-white">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

