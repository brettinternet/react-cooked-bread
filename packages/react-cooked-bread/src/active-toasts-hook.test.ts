import { renderHook, act } from '@testing-library/react-hooks'

import { ToastType } from './types'
import { useActiveToasts } from './active-toasts-hook'

describe('useActiveToasts', () => {
  it('should have a default toast value', () => {
    const { result } = renderHook(() => useActiveToasts())
    expect(result.current.hasToasts).toBe(false)
    expect(result.current.toasts.length).toBe(0)
  })

  it('should add multiple toasts', () => {
    const { result } = renderHook(() => useActiveToasts())
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
    const { result } = renderHook(() => useActiveToasts())
    let toastId = ''
    act(() => {
      toastId = result.current.addToast('Cheers!')
    })
    act(() => {
      result.current.removeToast(toastId)
    })
    expect(result.current.hasToasts).toBe(false)
    expect(result.current.toasts.length).toBe(0)
  })

  it('should remove multiple toasts', () => {
    const { result } = renderHook(() => useActiveToasts())
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
    const { result } = renderHook(() => useActiveToasts())
    const oldType = ToastType.WARNING
    const newType = ToastType.SUCCESS
    const oldContent = 'Cheers!'
    const newContent = 'Alrighty'
    let toastId = ''
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
      result.current.updateToast(toastId, {
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
