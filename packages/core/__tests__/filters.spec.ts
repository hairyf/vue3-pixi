import { AlphaFilter, BlurFilter, Container } from 'pixi.js'
import { describe, expect, it, vi } from 'vitest'
import { getFilterParent, insertFilter, removeContainer, removeFilter } from '../src/renderer/internal/options'

describe('filter WeakMap management', () => {
  it('should insert a filter into parent.filters', () => {
    const parent = new Container()
    const filter = new AlphaFilter()

    insertFilter(filter, parent, null)

    expect(parent.filters).toContain(filter)
    expect(parent.filters).toHaveLength(1)
  })

  it('should track filter parent via WeakMap', () => {
    const parent = new Container()
    const filter = new AlphaFilter()

    insertFilter(filter, parent, null)

    expect(getFilterParent(filter)).toBe(parent)
  })

  it('should insert multiple filters', () => {
    const parent = new Container()
    const filter1 = new AlphaFilter()
    const filter2 = new BlurFilter()

    insertFilter(filter1, parent, null)
    insertFilter(filter2, parent, null)

    expect(parent.filters).toHaveLength(2)
    expect(parent.filters).toContain(filter1)
    expect(parent.filters).toContain(filter2)
  })

  it('should remove a filter and clean up WeakMap', () => {
    const parent = new Container()
    const filter = new AlphaFilter()

    insertFilter(filter, parent, null)
    removeFilter(filter)

    expect(parent.filters).not.toContain(filter)
    expect(getFilterParent(filter)).toBeUndefined()
  })

  it('should remove only the targeted filter', () => {
    const parent = new Container()
    const filter1 = new AlphaFilter()
    const filter2 = new BlurFilter()

    insertFilter(filter1, parent, null)
    insertFilter(filter2, parent, null)
    removeFilter(filter1)

    expect(parent.filters).not.toContain(filter1)
    expect(parent.filters).toContain(filter2)
    expect(parent.filters).toHaveLength(1)
  })

  it('should not throw when removing a filter with no tracked parent', () => {
    const filter = new AlphaFilter()
    expect(() => removeFilter(filter)).not.toThrow()
  })

  it('should destroy filters when container is removed via removeContainer', () => {
    const parent = new Container()
    const container = new Container()
    const filter = new AlphaFilter()

    // Attach filter to the inner container
    insertFilter(filter, container, null)
    // Add inner container to parent (required for removeContainer to work)
    parent.addChild(container)

    expect(getFilterParent(filter)).toBe(container)

    // Should not throw when destroying filters
    expect(() => removeContainer(container)).not.toThrow()

    // Filter should be removed from parent tracking
    expect(getFilterParent(filter)).toBeUndefined()
  })

  it('should preserve shared external filters while destroying declarative filters', () => {
    const first = new Container()
    const second = new Container()
    const shared = new AlphaFilter()
    const managed = new AlphaFilter()
    const destroyShared = vi.spyOn(shared, 'destroy')
    const destroyManaged = vi.spyOn(managed, 'destroy')

    first.filters = [shared]
    second.filters = [shared]
    insertFilter(managed, first, null)

    removeContainer(first)

    expect(destroyManaged).toHaveBeenCalledOnce()
    expect(getFilterParent(managed)).toBeUndefined()
    expect(destroyShared).not.toHaveBeenCalled()
    expect(second.filters).toEqual([shared])
    expect(shared.resources.alphaUniforms.uniforms.uAlpha).toBe(1)

    removeContainer(second)
    expect(destroyShared).not.toHaveBeenCalled()
    shared.destroy()
  })

  it('should destroy filters on descendant containers too', () => {
    const parent = new Container()
    const child = new Container()
    const grandchild = new Container()
    const filter = new AlphaFilter()

    parent.addChild(child)
    child.addChild(grandchild)
    insertFilter(filter, grandchild, null)

    expect(getFilterParent(filter)).toBe(grandchild)

    // Should not throw when destroying filters on descendants
    expect(() => removeContainer(parent)).not.toThrow()

    // Filter should be removed from parent tracking
    expect(getFilterParent(filter)).toBeUndefined()
  })
})
