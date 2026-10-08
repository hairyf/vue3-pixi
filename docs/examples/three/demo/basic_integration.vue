<script lang="ts" setup>
import { Container, Graphics, Text, WebGLRenderer } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasContainer = ref<HTMLDivElement>()
const error = ref('')
let cleanup: (() => void) | null = null
let unmounted = false
let initializing = true

onMounted(async () => {
  const container = canvasContainer.value
  if (!container)
    return

  try {
    const THREE = await import('three')
    if (unmounted)
      return

    const WIDTH = container.clientWidth || 600
    const HEIGHT = container.clientHeight || 400
    const threeRenderer = new THREE.WebGLRenderer({ antialias: true, stencil: true })
    let animationId: number | null = null
    let pixiInitialized = false
    cleanup = () => {
      threeRenderer.dispose()
      // Pixi destroys the shared context after a successful init.
      if (!pixiInitialized)
        threeRenderer.forceContextLoss()
      threeRenderer.domElement.remove()
    }
    threeRenderer.setSize(WIDTH, HEIGHT)
    threeRenderer.setClearColor(0xDDDDDD, 1)
    container.appendChild(threeRenderer.domElement)

    const scene = new THREE.Scene()
    const threeCamera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)
    threeCamera.position.z = 50
    scene.add(threeCamera)

    const boxGeometry = new THREE.BoxGeometry(30, 30, 30)
    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095DD })
    const cube = new THREE.Mesh(boxGeometry, basicMaterial)
    scene.add(cube)

    // Both renderers must use the same canvas as well as the same WebGL context.
    const pixiRenderer = new WebGLRenderer()
    const stage = new Container()
    const disposeThree = cleanup
    cleanup = () => {
      if (animationId !== null)
        cancelAnimationFrame(animationId)
      stage.destroy({ children: true })
      boxGeometry.dispose()
      basicMaterial.dispose()
      // An incomplete Pixi init has no usable view/context for destroy().
      if (pixiInitialized)
        pixiRenderer.destroy()
      disposeThree()
    }
    await pixiRenderer.init({
      canvas: threeRenderer.domElement,
      context: threeRenderer.getContext(),
      width: WIDTH,
      height: HEIGHT,
      clearBeforeRender: false,
    })
    pixiInitialized = true
    if (unmounted) {
      cleanup()
      cleanup = null
      return
    }

    const uiLayer = new Graphics().roundRect(20, 80, 300, 60, 20).fill({ color: 0xFFFF00, alpha: 0.8 })
    const text = new Text({
      text: 'Pixi + Three.js',
      style: { fontFamily: 'Arial', fontSize: 24, fill: 'black' },
    })
    text.position.set(30, 90)
    stage.addChild(uiLayer, text)

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
  }
  catch (e) {
    cleanup?.()
    cleanup = null
    if (!unmounted)
      error.value = `Unable to initialize the Three.js example: ${String(e)}`
  }
  finally {
    initializing = false
  }
})

onBeforeUnmount(() => {
  unmounted = true
  if (!initializing) {
    cleanup?.()
    cleanup = null
  }
})
</script>

<template>
  <div v-if="error" style="padding: 20px; color: #cc0000; font-family: monospace; background: #1a1a2e; height: 100%;">
    {{ error }}
  </div>
  <div v-else ref="canvasContainer" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;" />
</template>
