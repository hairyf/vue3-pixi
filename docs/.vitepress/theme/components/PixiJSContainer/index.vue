<script lang="ts" setup>
import { computed, ref } from 'vue'
import Card from '../Card/index.vue'
const props = withDefaults(
  defineProps<{
    sfcTsCode: string
    // if using ts, sfcJsCode will transform the to js
    sfcJsCode: string
    sfcTsHtml: string
    sfcJsHtml: string
    metadata: Record<string, any>
    expand?: boolean
  }>(),
  {
    expand: true,
  },
)

const showHighlighted = ref(props.expand)
const isUsingTs = ref(true)
const sfcTsCode = computed(() => decodeURIComponent(props.sfcTsCode))
const sfcJsCode = computed(() => decodeURIComponent(props.sfcJsCode))
const highlightedHtml = computed(() => decodeURIComponent(isUsingTs.value ? props.sfcTsHtml : props.sfcJsHtml))

function onShowHighlighted() {
  showHighlighted.value = !showHighlighted.value
}
</script>

<template>
  <Card>
    <template #header>
      <div class="flex gap-2">
        <div class="cursor-pointer i-akar-icons-typescript-fill p-10px" :class="[isUsingTs && 'text-[#007acc]']" @click="isUsingTs = true" />
        <div class="cursor-pointer i-akar-icons-javascript-fill p-10px" :class="[!isUsingTs && 'text-amber']" @click="isUsingTs = false" />
      </div>
      <div class="flex gap-2">
        <button class="cursor-pointer p2 i-ph-codesandbox-logo text-17px" />
        <button class="cursor-pointer p2 i-solar-pen-new-square-broken" />
        <button class="cursor-pointer p2 i-solar-copy-broken" />
        <button class="cursor-pointer p2 i-solar-code-square-broken" @click="onShowHighlighted" />
      </div>
    </template>
    <slot />
    <template v-if="showHighlighted" #footer>
      <div class="language-vue m0!" v-html="highlightedHtml" />
    </template>
  </Card>
</template>
