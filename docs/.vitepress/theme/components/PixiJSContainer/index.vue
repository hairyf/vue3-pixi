<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { Application } from 'vue3-pixi'
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
    app?: boolean
  }>(),
  {
    expand: true,
    app: true,
  },
)
const message = useMessage()

const containerRef = ref<HTMLElement>()
const showHighlighted = ref(props.expand)
const isUsingTs = ref(true)

const sfcTsCode = computed(() => decodeURIComponent(props.sfcTsCode))
const sfcJsCode = computed(() => decodeURIComponent(props.sfcJsCode))
const highlightedHtml = computed(() => decodeURIComponent(isUsingTs.value ? props.sfcTsHtml : props.sfcJsHtml))
const code = computed(() => isUsingTs.value ? sfcTsCode.value : sfcJsCode.value)
const githubBlobURL = 'https://github.com/hairyf/vue3-pixi/blob/main/'

function onShowHighlighted() {
  showHighlighted.value = !showHighlighted.value
}

function onOpenEditGithub() {
  window.open(githubBlobURL + props.metadata.relativePath, '_blank')
}

async function onCopyCode() {
  await navigator.clipboard.writeText(code.value)
  message.success('Successfully Copied')
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
        <button v-tooltip="'Edit in CodeSandbox'" class="cursor-pointer p2 i-ph-codesandbox-logo text-17px" />
        <button v-tooltip="'Edit on GitHub'" class="cursor-pointer p2 i-solar-pen-new-square-broken" @click="onOpenEditGithub" />
        <button v-tooltip="'Copy Code'" class="cursor-pointer p2 i-solar-copy-broken" @click="onCopyCode" />
        <button
          v-tooltip="{
            content: `${showHighlighted ? 'Hide' : 'Show'} Code`,
            triggers: ['hover'],
          }"
          class="cursor-pointer p2 i-solar-code-square-broken"
          @click="onShowHighlighted"
        />
      </div>
    </template>
    <div ref="containerRef" class="flex justify-center">
      <Application v-if="app" :width="688" :height="300">
        <slot />
      </Application>
      <template v-else>
        <slot />
      </template>
    </div>
    <template v-if="showHighlighted" #footer>
      <div class="language-vue px4 m0!" v-html="highlightedHtml" />
    </template>
  </Card>
</template>
