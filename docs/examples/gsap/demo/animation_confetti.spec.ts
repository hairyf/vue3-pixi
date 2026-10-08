import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { runInNewContext } from 'node:vm'
import { gsap } from 'gsap'
import Physics2DPlugin from 'gsap/Physics2DPlugin'
import { Container, EventBoundary, FederatedPointerEvent } from 'pixi.js'
import * as ts from 'typescript'
import { expect, it } from 'vitest'

// ponytail: exercise the real handlers without WebGL; mount the SFC if stage transforms are added.
const source = readFileSync(join(import.meta.dirname, 'animation_confetti.vue'), 'utf8')
const script = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1]
const file = ts.createSourceFile('animation_confetti.ts', script, ts.ScriptTarget.Latest, true)

it('creates confetti at canvas coordinates instead of viewport coordinates', () => {
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

it('kills every particle timeline before it can update a destroyed target', () => {
  const handler = file.statements.find(statement =>
    ts.isFunctionDeclaration(statement) && statement.name?.text === 'animateDot',
  )
  expect(handler).toBeDefined()
  gsap.registerPlugin(Physics2DPlugin)
  const particles = [new Container(), new Container()]
  const { outputText } = ts.transpileModule(handler!.getText(file), {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  })

  try {
    runInNewContext(`${outputText}; particles.forEach((particle, id) => animateDot(particle, { id }))`, {
      particles,
      dots: { value: [] },
      gsap,
    })
    const timelines = particles.map(particle => gsap.getTweensOf(particle)[0].parent!)
    timelines.forEach(timeline => timeline.totalTime(0.1))
    expect(particles.every(particle => gsap.getTweensOf(particle).length > 0)).toBe(true)

    particles.forEach(particle => particle.destroy())
    expect(particles.every(particle => gsap.getTweensOf(particle).length === 0)).toBe(true)
    expect(() => gsap.updateRoot(gsap.globalTimeline.time() + 1)).not.toThrow()
  }
  finally {
    particles.forEach(particle => gsap.killTweensOf(particle))
    particles.filter(particle => !particle.destroyed).forEach(particle => particle.destroy())
  }
})
