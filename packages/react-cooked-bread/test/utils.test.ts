import { Timer } from '../src/utils'

describe('Timer', () => {
  let callback: () => void
  let timeout: number
  let timer: Timer

  jest.useFakeTimers()

  beforeEach(() => {
    callback = () => undefined
    timeout = 1000
    timer = new Timer(callback, timeout)
  })

  it('is instantiable', () => {
    expect(timer).toBeInstanceOf(Timer)
  })

  // it('begins waits for the specified timeout', () => {
  //   expect(setTimeout).toHaveBeenCalledTimes(1)
  //   timer.pause()
  //   expect(clearTimeout).toHaveBeenCalledTimes(1)
  //   timer.start()
  //   expect(setTimeout).toHaveBeenCalledTimes(2)
  //   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout)
  // })

  // it('invokes callback after the timeout', () => {
  //   expect(callback).not.toBeCalled()
  //   jest.runAllTimers()
  //   expect(callback).toBeCalled()
  //   expect(callback).toHaveBeenCalledTimes(1)
  // })
})
