import { AlphaFilter, BlurFilter, Container } from 'pixi.js'
import { describe, expect, it } from 'vitest'
import { getFilterParent, insertFilter, removeFilter } from '../src/renderer/internal/options'

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
})
