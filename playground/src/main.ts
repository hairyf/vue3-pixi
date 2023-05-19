import { appInjectKey, createApp, use } from 'vue3-pixi'
import ProjectionRenderer from '@vue-pixi/projection'
import { Application } from 'pixi.js'
import App from './App.vue'
import './style.css'

use(ProjectionRenderer)

const pixiApp = new Application({
  resizeTo: window,
  background: '#fff',
  antialias: true,
})

document.body.appendChild(pixiApp.view as any)

const app = createApp(App)

app.provide(appInjectKey, pixiApp)
app.mount(pixiApp.stage)
