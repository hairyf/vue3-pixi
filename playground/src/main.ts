import { createApp } from 'vue'
import pixi from 'vue3-pixi-renderer'
import App from './App.vue'

import './style.css'

createApp(App)
  .use(pixi)
  .mount('#app')
