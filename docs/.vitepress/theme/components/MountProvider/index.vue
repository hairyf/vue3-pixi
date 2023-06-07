<script lang="ts" setup>
import { c } from 'naive-ui'
import { useRoute } from 'vitepress'
import { onMounted, watch } from 'vue'

const route = useRoute()

const style = c([
  c('.VPDoc .aside', {
    display: 'none !important',
  }),
  c(':root', {
    '--vp-layout-max-width': '1560px !important',
  }),
])

function watchRoute() {
  if (route.path.startsWith('/examples'))
    style.mount()
  else
    style.unmount()
}

onMounted(watchRoute)

watch(route, watchRoute)
</script>

<template>
  <slot />
</template>
