import { Container, Text } from 'pixi.js'
import { describe, expect, it } from 'vitest'
import { Empty } from '../src/renderer/internal/custom'
import { createComment, createElement, createText, insert, remove } from '../src/renderer/nodeOps'

// Register elements before testing
import '../src/elements'

const PREFIX = 'pixi'

describe('nodeOps', () => {
  describe('createElement', () => {
    it('should create a Container', () => {
      const el = createElement(PREFIX, 'pixi-container', undefined, undefined, {})
      expect(el).toBeInstanceOf(Container)
    })

    it('should create a Sprite', () => {
      const el = createElement(PREFIX, 'pixi-sprite', undefined, undefined, {})
      expect(el).toBeDefined()
    })

    it('should create element with PascalCase name', () => {
      const el = createElement(PREFIX, 'Container', undefined, undefined, {})
      expect(el).toBeInstanceOf(Container)
    })
  })

  describe('createText', () => {
    it('should create a Text node for non-empty string', () => {
      const node = createText('hello')
      expect(node).toBeInstanceOf(Text)
      expect(node.text).toBe('hello')
    })

    it('should create an Empty node for empty string', () => {
      const node = createText('')
      expect(node).toBeInstanceOf(Empty)
    })

    it('should handle escaped newlines', () => {
      const node = createText('line1\\nline2')
      expect(node).toBeInstanceOf(Text)
      expect(node.text).toBe('line1\nline2')
    })
  })

  describe('createComment', () => {
    it('should create an Empty node', () => {
      const node = createComment()
      expect(node).toBeInstanceOf(Empty)
      expect(node.visible).toBe(false)
      expect(node.renderable).toBe(false)
    })
  })

  describe('insert and remove', () => {
    it('should insert a child into a parent', () => {
      const parent = new Container()
      const child = new Container()

      insert(child, parent)

      expect(parent.children).toContain(child)
    })

    it('should insert at anchor position', () => {
      const parent = new Container()
      const child1 = new Container()
      const child2 = new Container()
      const newChild = new Container()
      parent.addChild(child1)
      parent.addChild(child2)

      insert(newChild, parent, child2)

      expect(parent.getChildIndex(newChild)).toBe(1)
    })

    it('should remove a child and destroy it', () => {
      const parent = new Container()
      const child = new Container()
      parent.addChild(child)

      remove(child)

      expect(child.destroyed).toBe(true)
    })

    it('should not throw when removing already destroyed node', () => {
      const child = new Container()
      child.destroyed = true
      expect(() => remove(child)).not.toThrow()
    })

    it('should detach Empty nodes without destroying them', () => {
      const parent = new Container()
      const empty = new Empty()
      parent.addChild(empty)

      remove(empty)

      // Empty should be detached but not destroyed (lightweight cleanup)
      expect(parent.children).not.toContain(empty)
      expect(empty.destroyed).toBe(false)
    })
  })
})
