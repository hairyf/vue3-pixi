import { getParameters } from 'codesandbox/lib/api/define'

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Naive UI Demo</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      #app {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
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
    Application
  },
});
</script>`

const appProviderVue = `<template>
  <Application :width="800" :height="600" :background-alpha="0">
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
    Application
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
  code = code.replace(/["']\//g, '"https://raw.githubusercontent.com/hairyf/vue3-pixi/main/docs/public/')
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
  code = code.replace(/["']\//g, '"https://raw.githubusercontent.com/hairyf/vue3-pixi/main/docs/public/')
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
