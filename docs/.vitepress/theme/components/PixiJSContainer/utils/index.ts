import { getParameters } from 'codesandbox/lib/api/define'

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Naive UI Demo</title>
    <style>
      body {
        padding: 24px;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`

const appVue = `<template>
    <demo />
</template>

<script>
import { defineComponent } from "vue";
import Demo from "./Demo.vue";

export default defineComponent({
components: {
  Demo,
},
});
</script>`

const appProviderVue = `<template>
  <Application :width="300" :height="300">
    <demo />
  </Application>
</template>

<script>
import { defineComponent } from "vue";
import { Application } from 'vue3-pixi'
import Demo from "./Demo.vue";

export default defineComponent({
components: {
  Demo,
},
});
</script>`

const mainJs = `import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.mount("#app");
`

function getDependencies(code: string) {
  return (code.match(/from '([^']+)'\n/g) || [])
    .map(v => v.slice(6, v.length - 2))
    .reduce((prevV, dep) => {
      prevV[dep] = 'latest'
      return prevV
    }, {})
}

export function getWithAppCodeSandboxParams(code: string) {
  return (getParameters as any)({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...getDependencies(code),
            'vue': 'next',
            'vue-router': 'next',
            'vue3-pixi': 'latest',
          },
          devDependencies: { '@vue/cli-plugin-babel': '~4.5.0', 'typescript': '~4.6.3' },
        },
      },
      'index.html': { content: indexHtml },
      'src/Demo.vue': { content: code },
      'src/App.vue': { content: appProviderVue },
      'src/main.js': { content: mainJs },
    },
  })
}

export function getCodeSandboxParams(code: string) {
  return (getParameters as any)({
    files: {
      'package.json': {
        content: {
          dependencies: {
            ...getDependencies(code),
            'vue': 'next',
            'vue-router': 'next',
            'vue3-pixi': 'latest',
          },
          devDependencies: { '@vue/cli-plugin-babel': '~4.5.0', 'typescript': '~4.6.3' },
        },
      },
      'index.html': { content: indexHtml },
      'src/Demo.vue': { content: code },
      'src/App.vue': { content: appVue },
      'src/main.js': { content: mainJs },
    },
  })
}
