<script lang="ts" setup>
import { computed, ref } from 'vue'

import Header from './components/Header.vue'
import Review from './components/Review.vue'
import Editor from './components/Editor.vue'

const props = withDefaults(
  defineProps<{
    sfcTsCode: string
    // if using ts, sfcJsCode will transform the to js
    sfcJsCode: string
    sfcTsHtml: string
    sfcJsHtml: string
    metadata: Record<string, any>
    expand?: boolean
    app?: boolean
    codesandbox?: boolean
    width?: number
    height?: number
    background?: string
    backgroundColor?: string
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
const isUsingTs = ref(!!props.sfcTsCode)

const sfcTsCode = computed(() => decodeURIComponent(props.sfcTsCode))
const sfcJsCode = computed(() => decodeURIComponent(props.sfcJsCode))
const highlightedHtml = computed(() => decodeURIComponent(isUsingTs.value ? props.sfcTsHtml : props.sfcJsHtml))
</script>

<template>
  <div class="rounded-lg mt-24px overflow-hidden bg-[#2e3138] demo-container">
    <Header
      v-model:is-using-ts="isUsingTs"
      v-model:show-highlighted="showHighlighted"
      :app="app"
      :codesandbox="codesandbox"
      :sfc-ts-code="sfcTsCode"
      :sfc-js-code="sfcJsCode"
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
            ? 'h-300px lg:h-400px xl:h-full xl:order-last xl:w-50%'
            : 'h-300px',
        ]"
        :width="width"
        :height="height"
        :background="background"
        :background-color="backgroundColor"
        :app="app"
        :full="mode === 'full'"
      >
        <slot />
      </Review>
      <Editor
        :class="[
          mode === 'full'
            ? 'max-h-300px lg:max-h-400px xl:h-full xl:max-h-full xl:w-50%'
            : 'max-h-350px',
        ]"
        :show-highlighted="showHighlighted"
        :highlighted-html="highlightedHtml"
      />
    </div>
  </div>
</template>
