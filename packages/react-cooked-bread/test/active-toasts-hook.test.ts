import { renderHook, act } from '@testing-library/react-hooks'

import { ToastType } from '../src/types'
import { useActiveToasts } from '../src/active-toasts-hook'

describe('useActiveToasts', () => {
  it('should have a default toast value', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    expect(result.current.hasToasts).toBe(false)
    expect(result.current.toasts.length).toBe(0)
  })

  it('should add multiple toasts', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    act(() => {
      result.current.addToast('Cheers!')
    })
    act(() => {
      result.current.addToast('Cheers?')
    })
    expect(result.current.hasToasts).toBe(true)
    expect(result.current.toasts.length).toBe(2)
  })

  it('should remove toasts', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    let toastId: string | undefined
    act(() => {
      toastId = result.current.addToast('Cheers!')
    })
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      result.current.removeToast(toastId!)
    })
    expect(result.current.hasToasts).toBe(false)
    expect(result.current.toasts.length).toBe(0)
  })

  it('should remove multiple toasts', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    act(() => {
      result.current.addToast('Cheers!')
    })
    act(() => {
      result.current.addToast('Cheers?')
    })
    act(() => {
      result.current.removeAllToasts()
    })
    expect(result.current.hasToasts).toBe(false)
    expect(result.current.toasts.length).toBe(0)
  })

  it('should update toast content and options', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    const oldType = ToastType.WARNING
    const newType = ToastType.SUCCESS
    const oldContent = 'Cheers!'
    const newContent = 'Alrighty'
    let toastId: string | undefined
    act(() => {
      toastId = result.current.addToast(oldContent, {
        type: oldType,
        autoDismiss: false,
      })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].id).toBe(toastId)
    expect(result.current.toasts[0].autoDismiss).toBe(false)
    expect(result.current.toasts[0].content).toBe(oldContent)
    expect(result.current.toasts[0].type).toBe(oldType)

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      result.current.updateToast(toastId!, {
        content: newContent,
        type: newType,
        autoDismiss: true,
      })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].id).toBe(toastId)
    expect(result.current.toasts[0].autoDismiss).toBe(true)
    expect(result.current.toasts[0].content).toBe(newContent)
    expect(result.current.toasts[0].type).toBe(newType)
  })
})

it('should limit the number of active toasts', () => {
  const { result } = renderHook(() => useActiveToasts(2))
  act(() => {
    result.current.addToast('Cheers!')
  })
  act(() => {
    result.current.addToast('Cheers?')
  })
  act(() => {
    result.current.addToast('Cheers again')
  })
  expect(result.current.toasts.length).toBe(2)
})

it('should prevent duplicate toasts with the same custom ID', () => {
  const { result } = renderHook(() => useActiveToasts(2))
  let a: string | undefined, b: string | undefined
  act(() => {
    a = result.current.addToast('Cheers!')
  })
  act(() => {
    b = result.current.addToast('Cheers?')
  })
  expect(a).not.toEqual(b)
  expect(result.current.toasts.length).toBe(2)
})
