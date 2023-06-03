<template>
  <div class="bg-white rounded-lg overflow-hidden border-1 border-[rgb(239,239,245)] border-solid dark:bg-[#1e1e1e] dark:border-[rgba(255,255,255,0.09)] relative">
    <div class="flex justify-between pt4 px4">
      <slot name="header" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-4 border-t-solid border-t border-[rgb(239,239,245)] dark:border-[rgba(255,255,255,0.09)]">
      <slot name="footer" />
    </div>
  </div>
</template>
