import type { VNode } from 'vue-demi'
import { AlphaFilter, BitmapText, Container, Filter, RenderLayer, Sprite, Text } from 'pixi.js'
import { describe, expect, it, vi } from 'vitest'
import { createCommentVNode, Fragment, h } from 'vue-demi'
import { render } from '../src/renderer'
import { Empty } from '../src/renderer/internal/custom'
import { getFilterParent } from '../src/renderer/internal/options'
import { createComment, createElement, createText, insert, nextSibling, parentNode, remove, setText } from '../src/renderer/nodeOps'
import { patchs } from '../src/renderer/utils/patchs'

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

  describe('setText', () => {
    it('updates .text on a Text node', () => {
      const node = new Text({ text: 'hello' })
      setText(PREFIX, node, 'world')
      expect(node.text).toBe('world')
    })

    it('updates .text on a BitmapText node', () => {
      const node = new BitmapText({ text: 'hello' })
      setText(PREFIX, node, 'world')
      expect(node.text).toBe('world')
    })

    it('does not set text on non-text Container', () => {
      // Vue's warn is used internally; we just verify no crash and no .text property set
      const node = new Container()
      expect(() => setText(PREFIX, node as any, 'text')).not.toThrow()
      expect((node as any).text).toBeUndefined()
    })
  })

  describe('filter dispatcher', () => {
    it('insert with _vp_filter routes to insertFilter', () => {
      const parent = new Container()
      const filter = new Filter({})
      ;(filter as any)._vp_filter = true

      insert(filter as any, parent)

      expect(parent.filters).toContain(filter)
    })

    it('remove with _vp_filter routes to removeFilter', () => {
      const parent = new Container()
      const filter = new Filter({})
      ;(filter as any)._vp_filter = true

      insert(filter as any, parent)
      expect(parent.filters).toContain(filter)

      remove(filter as any)
      expect(parent.filters).not.toContain(filter)
    })

    it('nextSibling returns next filter in parent.filters', () => {
      const parent = new Container()
      const filter1 = new Filter({})
      const filter2 = new Filter({})
      ;(filter1 as any)._vp_filter = true
      ;(filter2 as any)._vp_filter = true

      insert(filter1 as any, parent)
      insert(filter2 as any, parent)

      const sibling = nextSibling(filter1 as any)
      expect(sibling).toBe(filter2)
    })

    it('parentNode resolves a filter\'s container via filterParentMap, not node.parent', () => {
      const parent = new Container()
      const filter = new Filter({})
      ;(filter as any)._vp_filter = true

      insert(filter as any, parent)

      // Filters aren't Containers and have no `.parent` of their own
      expect((filter as any).parent).toBeUndefined()
      expect(parentNode(filter as any)).toBe(parent)
    })

    it('parentNode still returns node.parent for non-filter nodes', () => {
      const parent = new Container()
      const child = new Container()
      parent.addChild(child)

      expect(parentNode(child)).toBe(parent)
    })
  })

  it.each(['sprite', 'container'])('preserves conditional filters and keyed fragment order on a %s', (tag) => {
    const root = new Container()
    const filters = {
      first: [new AlphaFilter(), new AlphaFilter()],
      second: [new AlphaFilter(), new AlphaFilter()],
    }
    const scene = (keys: (keyof typeof filters)[], enabled: boolean) => h(tag, null, keys.map(key => h(Fragment, { key }, [
      createCommentVNode('filter group'),
      enabled ? h('filter', { key: 'conditional', is: filters[key][0] }) : createCommentVNode('v-if'),
      h('filter', { key: 'always', is: filters[key][1] }),
      ...(tag === 'container' ? [h('container', { key: 'drawing', label: key })] : []),
    ])))
    const initial = scene(['first', 'second'], false)
    try {
      render(initial, root)
      const parent = root.children[0]
      const fragment = (initial.children as VNode[])[0]
      const fragmentStart = fragment.el as Empty
      expect(fragmentStart).toBeInstanceOf(Empty)
      expect(parentNode(fragmentStart)).toBe(parent)
      expect(nextSibling(fragmentStart)).toBe((fragment.children as VNode[])[0].el)
      expect(parent.filters).toEqual([filters.first[1], filters.second[1]])
      if (tag === 'sprite') {
        expect(parent.allowChildren).toBe(false)
        expect(parent.children).toEqual([])
        expect(fragmentStart.parent).toBeNull()
      }

      render(scene(['first', 'second'], true), root)
      expect(parent.filters).toEqual([...filters.first, ...filters.second])
      render(scene(['second', 'first'], true), root)
      expect(parent.filters).toEqual([...filters.second, ...filters.first])
      if (tag === 'container')
        expect(parent.children.filter(child => !(child instanceof Empty)).map(child => child.label)).toEqual(['second', 'first'])
      render(scene(['second', 'first'], false), root)
      expect(parent.filters).toEqual([filters.second[1], filters.first[1]])
      render(null, root)
      expect(parentNode(fragmentStart)).toBeFalsy()
      expect(getFilterParent(filters.first[1])).toBeUndefined()
      expect(filters.first[1].resources).toBeNull()
    }
    finally {
      render(null, root)
      for (const filter of [...filters.first, ...filters.second]) {
        if (filter.resources)
          filter.destroy()
      }
    }
  })

  it('preserves native anchors and layers when mixing imperative and Vue operations', () => {
    const parent = new Container()
    const other = new Sprite()
    const first = new Container()
    const last = new Container()
    const middle = new Container()
    const layer = new RenderLayer()
    const placeholder = createComment()
    const filter = createElement(PREFIX, 'filter', undefined, undefined, { is: new Filter({}) })

    insert(filter, parent)
    insert(first, parent)
    parent.addChild(last)
    insert(middle, parent, last)
    expect(parent.children).toEqual([first, middle, last])
    parent.removeChild(middle)
    expect(nextSibling(first)).toBe(last)
    parent.addChildAt(middle, 0)
    expect(nextSibling(middle)).toBe(first)
    layer.attach(first)
    const removed = vi.fn()
    first.on('removed', removed)
    insert(first, parent)
    expect(parent.children).toEqual([middle, last, first])
    insert(first, parent, last)
    expect(parent.children).toEqual([middle, first, last])
    insert(first, parent, last)
    expect(parent.children).toEqual([middle, first, last])
    expect(first.parentRenderLayer).toBe(layer)
    expect(removed).not.toHaveBeenCalled()

    insert(placeholder, parent)
    insert(placeholder, other)
    expect(placeholder.parent).toBeNull()
    expect(parentNode(placeholder)).toBe(other)
    expect(parent.children).not.toContain(placeholder)
    insert(filter, parent)
    insert(filter, other, placeholder)
    insert(filter, other, placeholder)
    expect(parent.filters).toEqual([])
    expect(other.filters).toEqual([filter])
    expect(nextSibling(filter)).toBe(placeholder)
    remove(parent)
    expect(parentNode(placeholder)).toBe(other)
    remove(other)
    expect(parentNode(placeholder)).toBeFalsy()
    expect(getFilterParent(filter)).toBeUndefined()
    layer.destroy()
  })

  describe('effect cleanup', () => {
    it('onEffect scope stops when destroyed event fires', () => {
      const el: any = new Container()
      const fn = vi.fn()

      patchs.events.effect(el, 'onEffect', null, fn)
      expect(fn).toHaveBeenCalledWith(el)

      // Fire destroyed — scope should stop
      el.emit('destroyed')
      // No throw, cleanup happened
    })

    it('double destroy does not throw', () => {
      const el: any = new Container()
      const fn = vi.fn()

      patchs.events.effect(el, 'onEffect', null, fn)

      expect(() => {
        el.emit('destroyed')
        el.emit('destroyed')
      }).not.toThrow()
    })
  })
})
