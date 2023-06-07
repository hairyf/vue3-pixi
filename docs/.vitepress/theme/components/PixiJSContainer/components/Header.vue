<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { computed, useModel } from 'vue'
import { getCodeSandboxParams, getWithAppCodeSandboxParams } from '../utils'

const props = defineProps<{
  isUsingTs: boolean
  showHighlighted: boolean
  metadata: Record<string, any>
  app?: boolean
  sfcTsCode: string
  sfcJsCode: string
  codesandbox?: boolean
}>()

const githubBlobURL = 'https://github.com/hairyf/vue3-pixi/blob/main/'

const message = useMessage()

const code = computed(() => props.isUsingTs ? props.sfcTsCode : props.sfcJsCode)

const showHighlighted = useModel(props, 'showHighlighted')
const isUsingTs = useModel(props, 'isUsingTs')

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
  <div class="flex justify-between items-center p4 text-white">
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
  </div>
</template>

