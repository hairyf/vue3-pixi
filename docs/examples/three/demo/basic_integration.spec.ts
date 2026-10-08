import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'
import { Container } from 'pixi.js'
import * as ts from 'typescript'
import { expect, it, vi } from 'vitest'

// ponytail: run the real lifecycle script without WebGL; use a browser for shared-context rendering.
const source = readFileSync(join(import.meta.dirname, 'basic_integration.vue'), 'utf8')
const script = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1]
const file = ts.createSourceFile('basic_integration.vue', script, ts.ScriptTarget.Latest, true)
const body = file.statements
  .filter(statement => !ts.isImportDeclaration(statement))
  .map(statement => statement.getText(file))
  .join('\n')
const { outputText } = ts.transpileModule(body, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
})

it.each(['reject', 'unmount'] as const)('cleans up Three resources after Pixi init %s without starting animation', async (outcome) => {
  const host = document.createElement('div')
  const canvas = document.createElement('canvas')
  const context = {}
  const error = { value: '' }
  const dispose = { geometry: vi.fn(), material: vi.fn(), three: vi.fn(), loseContext: vi.fn() }
  const pixiDestroy = vi.fn(() => {
    if (outcome === 'reject')
      throw new Error('Pixi renderer destroyed before successful init')
  })
  const requestFrame = vi.fn(() => 1)
  let resolveInit!: () => void
  let rejectInit!: (error: Error) => void
  const pendingInit = new Promise<void>((resolve, reject) => {
    resolveInit = resolve
    rejectInit = reject
  })
  let enteredInit!: () => void
  const startedInit = new Promise<void>(resolve => enteredInit = resolve)
  const init = vi.fn(() => {
    enteredInit()
    return pendingInit
  })
  const THREE = {
    WebGLRenderer: class {
      domElement = canvas
      dispose = dispose.three
      forceContextLoss = dispose.loseContext
      setSize() {}
      setClearColor() {}
      getContext() { return context }
    },
    Scene: class { add() {} },
    PerspectiveCamera: class { position = { z: 0 } },
    BoxGeometry: class { dispose = dispose.geometry },
    MeshBasicMaterial: class { dispose = dispose.material },
    Mesh: class {},
  }
  let mount!: () => Promise<void>
  let unmount!: () => void
  runInNewContext(outputText, {
    Container,
    Graphics: class extends Container {
      roundRect() { return this }
      fill() { return this }
    },
    Text: Container,
    WebGLRenderer: class { init = init; destroy = pixiDestroy },
    require: (name: string) => {
      expect(name).toBe('three')
      return THREE
    },
    ref: (value?: string) => value === undefined ? { value: host } : error,
    onMounted: (callback: typeof mount) => mount = callback,
    onBeforeUnmount: (callback: typeof unmount) => unmount = callback,
    requestAnimationFrame: requestFrame,
    cancelAnimationFrame: vi.fn(),
  })
  const mounting = mount()
  await startedInit
  expect(init).toHaveBeenCalledWith(expect.objectContaining({ canvas, context }))
  expect(canvas.parentNode).toBe(host)
  if (outcome === 'reject') {
    rejectInit(new Error('init rejected'))
  }
  else {
    unmount()
    expect(pixiDestroy).not.toHaveBeenCalled()
    expect(dispose.three).not.toHaveBeenCalled()
    resolveInit()
  }
  await expect(mounting).resolves.toBeUndefined()
  expect(error.value).toBe(outcome === 'reject' ? 'Unable to initialize the Three.js example: Error: init rejected' : '')
  expect(pixiDestroy).toHaveBeenCalledTimes(outcome === 'reject' ? 0 : 1)
  expect(dispose.loseContext).toHaveBeenCalledTimes(outcome === 'reject' ? 1 : 0)
  for (const resourceDispose of [dispose.geometry, dispose.material, dispose.three])
    expect(resourceDispose).toHaveBeenCalledOnce()
  expect(canvas.parentNode).toBeNull()
  expect(requestFrame).not.toHaveBeenCalled()
  unmount()
  expect(dispose.loseContext).toHaveBeenCalledTimes(outcome === 'reject' ? 1 : 0)
  for (const resourceDispose of [dispose.geometry, dispose.material, dispose.three])
    expect(resourceDispose).toHaveBeenCalledOnce()
})
