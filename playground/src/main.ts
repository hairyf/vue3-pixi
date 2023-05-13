import { appInjectKey, createApp } from 'vue3-pixi-renderer'
import { Application } from 'pixi.js'
import { ref } from 'vue'
import App from './App.vue'

const pixiApp = new Application({
  resizeTo: window,
  antialias: true,
})

document.body.appendChild(pixiApp.view as any)

const app = createApp(App)

app.provide(appInjectKey, ref(pixiApp))
app.mount(pixiApp.stage)
