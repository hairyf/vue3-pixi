import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'
import { EventBoundary, FederatedPointerEvent } from 'pixi.js'
import * as ts from 'typescript'
import { expect, it } from 'vitest'

it('creates confetti at canvas coordinates instead of viewport coordinates', () => {
  // ponytail: exercise the real handler without WebGL; mount the SFC if stage transforms are added.
  const source = readFileSync(join(import.meta.dirname, 'animation_confetti.vue'), 'utf8')
  const script = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1]
  const file = ts.createSourceFile('animation_confetti.ts', script, ts.ScriptTarget.Latest, true)
  const handler = file.statements.find(statement =>
    ts.isFunctionDeclaration(statement) && statement.name?.text === 'createConfetti',
  )
  expect(handler).toBeDefined()

  const event = new FederatedPointerEvent(new EventBoundary())
  event.client.set(430, 260)
  event.global.set(75, 40)
  const dots = { value: [] as { x: number, y: number }[] }
  const { outputText } = ts.transpileModule(handler!.getText(file), {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  })

  runInNewContext(`let dotIdCounter = 0; ${outputText}; createConfetti(event)`, {
    event,
    dots,
    gsap: { utils: { random: (minimum: number) => minimum } },
  })

  expect(dots.value).toEqual(Array.from({ length: 15 }, (_, id) => ({
    id,
    x: 75,
    y: 40,
    size: 20,
  })))
})
