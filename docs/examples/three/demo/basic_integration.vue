<script lang="ts" setup>
import { Container, Graphics, Text, WebGLRenderer } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasContainer = ref<HTMLDivElement>()
const error = ref('')
let cleanup: (() => void) | null = null

onMounted(async () => {
  if (!canvasContainer.value) return

  // Check if three.js is available by trying to access it from globalThis
  // or via a dynamic URL import. Since three.js is an optional peer dependency,
  // this example gracefully handles its absence.
  let THREE: any
  try {
    // Use Function constructor to avoid Vite's static import analysis
    const dynamicImport = new Function('specifier', 'return import(specifier)')
    THREE = await dynamicImport('three')
  }
  catch {
    error.value = 'This example requires three.js. Install it with: pnpm add three'
    return
  }

  let WIDTH = canvasContainer.value.clientWidth || 600
  let HEIGHT = canvasContainer.value.clientHeight || 400

  // Three.js setup
  const threeRenderer = new THREE.WebGLRenderer({ antialias: true, stencil: true })
  threeRenderer.setSize(WIDTH, HEIGHT)
  threeRenderer.setClearColor(0xDDDDDD, 1)
  canvasContainer.value.appendChild(threeRenderer.domElement)

  const scene = new THREE.Scene()
  const threeCamera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)
  threeCamera.position.z = 50
  scene.add(threeCamera)

  const boxGeometry = new THREE.BoxGeometry(30, 30, 30)
  const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095DD })
  const cube = new THREE.Mesh(boxGeometry, basicMaterial)
  scene.add(cube)

  // PixiJS setup sharing WebGL context
  const pixiRenderer = new WebGLRenderer()
  await pixiRenderer.init({
    context: threeRenderer.getContext(),
    width: WIDTH,
    height: HEIGHT,
    clearBeforeRender: false,
  })

  const stage = new Container()
  const uiLayer = new Graphics().roundRect(20, 80, 300, 60, 20).fill({ color: 0xFFFF00, alpha: 0.8 })
  const text = new Text({
    text: 'Pixi + Three.js',
    style: { fontFamily: 'Arial', fontSize: 24, fill: 'black' },
  })
  text.x = 30
  text.y = 90
  stage.addChild(uiLayer)
  stage.addChild(text)

  let animationId: number | null = null

  function loop() {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    threeRenderer.resetState()
    threeRenderer.render(scene, threeCamera)
    pixiRenderer.resetState()
    pixiRenderer.render({ container: stage })

    animationId = requestAnimationFrame(loop)
  }

  animationId = requestAnimationFrame(loop)

  cleanup = () => {
    if (animationId !== null) cancelAnimationFrame(animationId)
    threeRenderer.dispose()
    pixiRenderer.destroy()
  }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<template>
  <div v-if="error" style="padding: 20px; color: #cc0000; font-family: monospace; background: #1a1a2e; height: 100%;">
    {{ error }}
  </div>
  <div v-else ref="canvasContainer" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;" />
</template>
