<script lang="ts" setup>
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Application } from 'vue3-pixi'
const props = defineProps<{
  width?: number
  height?: number
  background?: string
  backgroundColor?: string
  backgroundAlpha?: number
  app?: boolean
  full?: boolean
}>()

const containerViewRef = ref<HTMLElement>()
const { width: viewWidth, height: viewHeight } = useElementSize(containerViewRef)

const size = computed(() => {
  if (props.full)
    return { width: viewWidth.value || 629, height: viewHeight.value || 550 }
  else
    return { width: props.width, height: props.height }
})
</script>

<template>
  <div ref="containerViewRef" class="container-view flex justify-center items-center" :class="{ p4: !full }">
    <div>
      <ClientOnly>
        <Application
          v-if="app"
          :class="[full && 'w-full h-full']"
          v-bind="size"
          :background="background"
          :background-color="backgroundColor"
          :background-alpha="backgroundAlpha"
        >
          <slot />
        </Application>
        <template v-else>
          <slot />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style>
.container-view {
  background-color: #d6d7da;
  background-image: linear-gradient(90deg, #ffffff 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(#ffffff 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 20px 20px;
}
</style>
