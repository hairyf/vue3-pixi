<script lang="ts" setup>
import { computed, ref } from 'vue'

import Header from './components/Header.vue'
import Review from './components/Review.vue'
import Editor from './components/Editor.vue'

const props = withDefaults(
  defineProps<{
    typescript: string
    // if using ts, javascript will transform the to js
    javascript: string
    metadata: Record<string, any>
    expand?: boolean
    app?: boolean
    codesandbox?: boolean
    width?: number
    height?: number
    background?: string
    backgroundColor?: string
    backgroundAlpha?: number
    mode?: 'full'
  }>(),
  {
    expand: true,
    app: true,
    codesandbox: true,
    width: 240,
    height: 240,
  },
)

const showHighlighted = ref(props.expand)
const isUsingTs = ref(!!props.typescript)

const typescript = computed(() => decodeURIComponent(props.typescript))
const javascript = computed(() => decodeURIComponent(props.javascript))
</script>

<template>
  <div class="rounded-lg mt-24px overflow-hidden bg-[#2e3138] demo-container">
    <Header
      v-model:is-using-ts="isUsingTs"
      v-model:show-highlighted="showHighlighted"
      :app="app"
      :codesandbox="codesandbox"
      :sfc-ts-code="typescript"
      :sfc-js-code="javascript"
      :metadata="metadata"
    />
    <div
      :class="[
        mode === 'full'
          ? 'flex flex-col xl:flex-row xl:h-550px'
          : 'flex flex-col',
      ]"
    >
      <Review
        :class="[
          mode === 'full'
            ? 'h-300px lg:h-400px xl:h-full xl:order-last xl:w-55%'
            : 'min-h-300px',
        ]"
        :width="width"
        :height="height"
        :background="background"
        :background-color="backgroundColor"
        :background-alpha="backgroundAlpha"
        :app="app"
        :full="mode === 'full'"
      >
        <slot />
      </Review>
      <Editor
        :class="[
          mode === 'full'
            ? 'max-h-300px lg:max-h-400px xl:h-full xl:max-h-full xl:w-45%'
            : 'max-h-350px',
        ]"
        :show-highlighted="showHighlighted"
      >
        <slot v-if="isUsingTs" name="md:typescript" />
        <slot v-else name="md:javascript" />
      </Editor>
    </div>
  </div>
</template>
