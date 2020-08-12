import React from 'react'
import { getId, Timer, getDisplayName, TimerState } from '../src/utils'

describe('getId', () => {
  it('should be 6 characters long', () => {
    expect(getId()).toHaveLength(6)
  })
})

describe('Timer', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    jest.clearAllTimers()
  })

  it('can be paused and started again', () => {
    const timer = new Timer(jest.fn(), 5000)
    expect(window.setTimeout).toHaveBeenCalledTimes(1)
    timer.pause()
    expect(timer.state).toBe(TimerState.PAUSED)
    expect(clearTimeout).toHaveBeenCalledTimes(1)
    timer.start()
    expect(setTimeout).toHaveBeenCalledTimes(2)
    jest.runAllTimers()
    expect(timer.state).toBe(TimerState.COMPLETED)
  })

  it('times out for the specified timeout and cannot be started again', () => {
    const timer = new Timer(jest.fn(), 5000)
    jest.runAllTimers()
    expect(timer.state).toBe(TimerState.COMPLETED)
    expect(timer.timeLeft).toBe(0)
    timer.start()
  })

  it('invokes callback after the timeout', () => {
    const callback = jest.fn()
    new Timer(callback, 5000)
    expect(callback).not.toBeCalled()
    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})

describe('getDisplayName', () => {
  it("should return a component's display name", () => {
    const FancyComponent = () => <div />
    expect(getDisplayName(FancyComponent)).toBe('FancyComponent')
  })
})
