<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NScrollbar, useMessage } from 'naive-ui'
import { Application } from 'vue3-pixi'

import Card from '../Card/index.vue'
import { getCodeSandboxParams, getWithAppCodeSandboxParams } from './utils'

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
  }>(),
  {
    expand: true,
    app: true,
    codesandbox: true,
    width: 240,
    height: 240,
  },
)
const message = useMessage()

const showHighlighted = ref(props.expand)
const isUsingTs = ref(!!props.sfcTsCode)

const sfcTsCode = computed(() => decodeURIComponent(props.sfcTsCode))
const sfcJsCode = computed(() => decodeURIComponent(props.sfcJsCode))
const highlightedHtml = computed(() => decodeURIComponent(isUsingTs.value ? props.sfcTsHtml : props.sfcJsHtml))
const code = computed(() => isUsingTs.value ? sfcTsCode.value : sfcJsCode.value)
const githubBlobURL = 'https://github.com/hairyf/vue3-pixi/blob/main/'

const sandboxParams = computed(() => props.app
  ? getWithAppCodeSandboxParams(code.value)
  : getCodeSandboxParams(code.value))

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
  <Card class="demo-container">
    <template #header>
      <div class="flex gap-2">
        <div v-if="sfcTsCode" class="cursor-pointer i-akar-icons-typescript-fill p-10px" :class="[isUsingTs && 'text-[#007acc]']" @click="isUsingTs = true" />
        <div class="cursor-pointer i-akar-icons-javascript-fill p-10px" :class="[!isUsingTs && 'text-amber']" @click="isUsingTs = false" />
      </div>
      <div class="flex gap-2">
        <form v-if="codesandbox" action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank" style="display: flex; padding: 0">
          <input type="hidden" name="parameters" :value="sandboxParams">
          <input type="hidden" name="query" value="file=/src/Demo.vue">
          <button
            v-tooltip="'Edit in CodeSandbox'"
            type="submit"
            class="cursor-pointer p2 i-ph-codesandbox-logo text-17px"
          />
        </form>
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
    <div class="container-view flex justify-center items-center p4 min-h-300px">
      <div>
        <ClientOnly>
          <Application v-if="app" :width="width" :height="height" :background="background" :background-color="backgroundColor">
            <slot />
          </Application>
          <template v-else>
            <slot />
          </template>
        </ClientOnly>
      </div>
    </div>
    <template v-if="showHighlighted" #footer>
      <NScrollbar
        style="max-height: 450px;"
        :theme-overrides="{
          color: 'rgba(255, 255, 255, 0.6)',
          colorHover: ' rgba(255, 255, 255, 0.3)',
        }"
      >
        <div class="language-vue p0 m0!" v-html="highlightedHtml" />
      </NScrollbar>
    </template>
  </Card>
</template>

<style>
.container-view {
  background-color: #d6d7da;
  background-image: linear-gradient(90deg, #ffffff 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(#ffffff 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 20px 20px;
}
</style>
