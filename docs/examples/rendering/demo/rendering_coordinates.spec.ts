import type { Renderer } from 'pixi.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'
import { Container, EventSystem, Rectangle, RenderTexture, Sprite, Texture, TextureSource } from 'pixi.js'
import * as ts from 'typescript'
import { expect, it } from 'vitest'

function demoScript(name: string) {
  // ponytail: exercise real scripts with native Pixi events/bounds, not WebGL; mount SFCs if stage transforms are added.
  const source = readFileSync(join(import.meta.dirname, name), 'utf8')
  const script = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1]
  const file = ts.createSourceFile(name, script, ts.ScriptTarget.Latest, true)
  const body = file.statements
    .filter(statement => !ts.isImportDeclaration(statement))
    .map(statement => statement.getText(file))
    .join('\n')
  const { outputText } = ts.transpileModule(body, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  })
  return { source, outputText }
}

it('pans the render group using bounded canvas coordinates at any page offset and resolution', () => {
  const canvas = document.createElement('canvas')
  canvas.width = 1280
  canvas.height = 960
  const rect = { left: 300, top: 200, width: 320, height: 240 } as DOMRect
  canvas.getBoundingClientRect = () => rect
  document.body.append(canvas)
  const events = new EventSystem({} as Renderer)
  events.domElement = canvas
  events.resolution = 2
  const screen = new Rectangle(0, 0, 640, 480)
  const world = new Container()
  let tick = () => {}
  let cleanup = () => {}
  try {
    runInNewContext(demoScript('render_group.vue').outputText, {
      ref: () => ({ value: world }),
      useApplication: () => ({ value: { screen, renderer: { events, width: 640, height: 480 } } }),
      onMounted: (callback: () => void) => callback(),
      onBeforeUnmount: (callback: () => void) => cleanup = callback,
      onTick: (callback: () => void) => tick = callback,
      window,
    })
    tick()
    expect([world.x, world.y]).toEqual([0, 0])
    for (const [clientX, clientY, x, y] of [
      [300, 200, 0, 0],
      [460, 320, -218, -226],
      [620, 440, -436, -452],
      [100, 100, 0, 0],
      [900, 800, -436, -452],
    ]) {
      world.position.set(0, 0)
      window.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }))
      tick()
      expect(world.x).toBeCloseTo(x)
      expect(world.y).toBeCloseTo(y)
    }
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 460, clientY: 320 }))
    for (const [top, cssWidth, cssHeight, width, height, x, y] of [
      [80, 320, 240, 640, 480, -218, -452],
      [200, 640, 480, 640, 480, -109, -113],
      [200, 320, 240, 1280, 960, -186, -202],
    ]) {
      Object.assign(rect, { top, width: cssWidth, height: cssHeight })
      screen.width = width
      screen.height = height
      canvas.width = width * events.resolution
      canvas.height = height * events.resolution
      world.position.set(0, 0)
      tick()
      expect(world.x).toBeCloseTo(x)
      expect(world.y).toBeCloseTo(y)
    }
    screen.width = screen.height = 0
    world.position.set(20, 30)
    tick()
    expect([world.x, world.y]).toEqual([20, 30])
    screen.width = screen.height = 6000
    world.position.set(0, 0)
    tick()
    expect([world.x, world.y]).toEqual([0, 0])
    screen.width = 640
    screen.height = 480
    rect.width = rect.height = 0
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 460, clientY: 320 }))
    tick()
    expect([world.x, world.y]).toEqual([0, 0])
  }
  finally {
    cleanup()
    events.destroy()
    canvas.remove()
    world.destroy()
  }
})

it('centers the detached bunny source in its texture and the output in the logical screen', () => {
  const { source, outputText } = demoScript('render_texture_basic.vue')
  const output = new Sprite()
  const texture = new Texture({ source: new TextureSource({ width: 26, height: 37 }) })
  let rendered: { container: Container, target: RenderTexture } | undefined
  let tick = () => {}
  runInNewContext(`${outputText}\nonBunnyLoaded(texture)`, {
    Container,
    RenderTexture,
    Sprite,
    texture,
    ref: () => ({ value: output }),
    useApplication: () => ({ value: { renderer: {
      render: (options: NonNullable<typeof rendered>) => rendered = options,
    } } }),
    useScreen: () => ({ value: new Rectangle(0, 0, 640, 480) }),
    onMounted: (callback: () => void) => callback(),
    onUnmounted: () => {},
    onTick: (callback: () => void) => tick = callback,
  })
  tick()
  expect(rendered).toBeDefined()
  expect(rendered!.container.parent).toBeNull()
  expect(rendered!.container.children).toHaveLength(25)
  expect(rendered!.target).toBe(output.texture)
  const bounds = rendered!.container.getBounds()
  expect(bounds.x + bounds.width / 2).toBeCloseTo(150)
  expect(bounds.y + bounds.height / 2).toBeCloseTo(150)
  for (const [width, height] of [[640, 480], [360, 550]]) {
    const props = Object.fromEntries(Array.from(source.matchAll(/:(x|y|anchor)="([^"]+)"/g), ([, key, expression]) => [key, runInNewContext(expression, { screen: { width, height } })]))
    output.position.set(props.x, props.y)
    output.anchor.set(props.anchor)
    const outputBounds = output.getBounds()
    expect(outputBounds.x + outputBounds.width / 2).toBeCloseTo(width / 2)
    expect(outputBounds.y + outputBounds.height / 2).toBeCloseTo(height / 2)
  }
  rendered!.container.destroy({ children: true })
  output.destroy({ texture: true, textureSource: true })
  texture.destroy(true)
})
