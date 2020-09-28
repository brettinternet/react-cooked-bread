import { renderHook, act } from '@testing-library/react-hooks'

import { ToastType } from '../src/types'
import { useActiveToasts } from '../src/active-toasts-hook'
const utils = require('../src/utils')

let id: number = 1
jest.mock('../src/utils')
utils.getId.mockImplementation(() => String(++id))

describe('useActiveToasts', () => {
  beforeEach(() => {
    id = 1
  })

  it('should have a default toast value', () => {
    const { result } = renderHook(() => useActiveToasts())
    expect(result.current.hasToasts).toBe(false)
    expect(result.current.toasts.length).toBe(0)
  })

  it('should add multiple toasts', () => {
    const { result } = renderHook(() => useActiveToasts())
    act(() => {
      result.current.addToast('Cheers!')
      result.current.addToast('Cheers?')
    })
    expect(result.current.hasToasts).toBe(true)
    expect(result.current.toasts.length).toBe(2)
    expect(result.current.toasts).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "Cheers!",
          "id": "2",
          "type": "info",
        },
        Object {
          "content": "Cheers?",
          "id": "3",
          "type": "info",
        },
      ]
    `)
  })

  it('should remove toasts', () => {
    const { result } = renderHook(() => useActiveToasts())
    let toastId: string = ''
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
      result.current.addToast('Cheers?')
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
    let toastId: string = ''
    act(() => {
      toastId = result.current.addToast(oldContent, {
        type: oldType,
        autoDismiss: false,
      })
    })

    expect(result.current.hasToasts).toBe(true)
    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts).toMatchInlineSnapshot(`
      Array [
        Object {
          "autoDismiss": false,
          "content": "Cheers!",
          "id": "2",
          "type": "warning",
        },
      ]
    `)

    act(() => {
      result.current.updateToast(toastId, {
        content: newContent,
        type: newType,
        autoDismiss: true,
      })
    })

    expect(result.current.hasToasts).toBe(true)
    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts).toMatchInlineSnapshot(`
      Array [
        Object {
          "autoDismiss": true,
          "content": "Alrighty",
          "id": "2",
          "type": "success",
        },
      ]
    `)
  })

  it('should limit the number of active toasts', () => {
    const { result } = renderHook(() => useActiveToasts(2))
    act(() => {
      result.current.addToast('Cheers!')
      result.current.addToast('Cheers?')
      result.current.addToast('Cheers again')
    })

    expect(result.current.hasToasts).toBe(true)
    expect(result.current.toasts.length).toBe(2)
    expect(result.current.toasts).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "Cheers?",
          "id": "3",
          "type": "info",
        },
        Object {
          "content": "Cheers again",
          "id": "4",
          "type": "info",
        },
      ]
    `)
  })

  it('should not add toasts if maxToasts <= 0', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    act(() => {
      result.current.addToast('Cheers!')
    })

    expect(result.current.hasToasts).toBe(false)
    expect(result.current.toasts.length).toBe(0)
    const { result:r2 } = renderHook(() => useActiveToasts(-1))
    act(() => {
      r2.current.addToast('Cheers!')
    })

    expect(r2.current.hasToasts).toBe(false)
    expect(r2.current.toasts.length).toBe(0)
  })

  it('should prevent duplicate toasts with the same custom ID', () => {
    const { result } = renderHook(() => useActiveToasts())
    let a: string = 'what'
    let b: string = ''
    act(() => {
      a = result.current.addToast('Cheers!', { id: a })
    })
    act(() => {
      b = result.current.addToast('Cheers?', { id: a })
    })

    expect(a).not.toEqual(b)
    expect(result.current.hasToasts).toBe(true)
    expect(result.current.toasts.length).toBe(2)
    expect(result.current.toasts).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "Cheers!",
          "id": "what",
          "type": "info",
        },
        Object {
          "content": "Cheers?",
          "id": "2",
          "type": "info",
        },
      ]
    `)
  })
})
