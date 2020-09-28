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
    const { result } = renderHook(() => useActiveToasts(0))
    expect(result.current.toasts.length).toBe(0)
  })

  it('should add multiple toasts', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    act(() => {
      result.current.addToast('Cheers!')
      result.current.addToast('Cheers?')
    })
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
    const { result } = renderHook(() => useActiveToasts(0))
    let toastId: string = ''
    act(() => {
      toastId = result.current.addToast('Cheers!')
    })
    act(() => {
      result.current.removeToast(toastId)
    })

    expect(result.current.toasts.length).toBe(0)
  })

  it('should remove multiple toasts', () => {
    const { result } = renderHook(() => useActiveToasts(0))
    act(() => {
      result.current.addToast('Cheers!')
      result.current.addToast('Cheers?')
      result.current.removeAllToasts()
    })
    expect(result.current.toasts.length).toBe(0)
  })

  it('should update toast content and options', () => {
    const { result } = renderHook(() => useActiveToasts(0))
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
})

it('should limit the number of active toasts', () => {
  const { result } = renderHook(() => useActiveToasts(2))
  act(() => {
    result.current.addToast('Cheers!')
    result.current.addToast('Cheers?')
    result.current.addToast('Cheers again')
  })

  expect(result.current.toasts.length).toBe(2)
  expect(result.current.toasts).toMatchInlineSnapshot(`
    Array [
      Object {
        "content": "Cheers?",
        "id": "4",
        "type": "info",
      },
      Object {
        "content": "Cheers again",
        "id": "5",
        "type": "info",
      },
    ]
  `)
})

it('should prevent duplicate toasts with the same custom ID', () => {
  const { result } = renderHook(() => useActiveToasts(2))
  let a: string = 'what'
  let b: string = ''
  act(() => {
    a = result.current.addToast('Cheers!', { id: a })
  })
  act(() => {
    b = result.current.addToast('Cheers?', { id: a })
  })

  expect(a).not.toEqual(b)
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
        "id": "6",
        "type": "info",
      },
    ]
  `)
})
