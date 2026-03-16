import { Ticker } from 'pixi.js'
import { describe, expect, it, vi } from 'vitest'

describe('onTick', () => {
  it('should add and remove callbacks from ticker', () => {
    const ticker = Ticker.shared
    const fn = vi.fn()

    ticker.add(fn)
    expect(fn).not.toBeCalled()

    ticker.update()
    expect(fn).toBeCalled()

    ticker.remove(fn)
    fn.mockClear()
    ticker.update()
    expect(fn).not.toBeCalled()
  })

  it('should use ticker.deltaTime in v8 callback signature', () => {
    const ticker = Ticker.shared
    let receivedTicker: Ticker | undefined

    const fn = (t: Ticker) => {
      receivedTicker = t
    }
    ticker.add(fn)
    ticker.update()
    ticker.remove(fn)

    expect(receivedTicker).toBe(ticker)
    expect(typeof receivedTicker!.deltaTime).toBe('number')
  })
})
