import { useRef, useState, useEffect, useCallback } from 'react'

import { ActiveToast, Id, AddToastOptions, UpdateToastOptions } from './types'
import { getId } from './utils'

export const useActiveToasts = (_maxToasts?: number | undefined) => {
  const [toasts, setToasts] = useState<ActiveToast[]>([])
  const hasToasts = !!toasts.length
  const maxToasts = Math.max(Number(_maxToasts), 0)
  const toastsRef = useRef<ActiveToast[]>(toasts)
  useEffect(() => {
    toastsRef.current = toasts
  }, [toasts])

  const removeToast = useCallback((id: Id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  /**
   * @todo It's very convenient to guarantee a string return,
   * but we should configure this to gracefully fail creation
   * when a duplicate custom `id` is set in options
   */
  const addToast = useCallback(
    (content: React.ReactNode, options: AddToastOptions = {}): string => {
      const { type = 'info', id = getId(), ...rest } = options
      const newToast = { content, id, type, ...rest }

      while (toastsRef.current.some((t) => t.id === newToast.id)) {
        newToast.id = getId()
      }
      setToasts((prevToasts) => {
        if (maxToasts && maxToasts < prevToasts.length + 1) {
          return [...prevToasts, newToast].slice(prevToasts.length + 1 - maxToasts)
        } else {
          return [...prevToasts, newToast]
        }
      })
      return newToast.id
    },
    [maxToasts]
  )

  const updateToast = useCallback((id: Id, options: UpdateToastOptions = {}) => {
    setToasts((prevToasts) => {
      const index = prevToasts.findIndex((t) => t.id === id)
      if (index !== -1) {
        const updatedToast = { ...prevToasts[index], ...options }
        prevToasts.splice(index, 1, updatedToast)
        return prevToasts
      }
      return prevToasts
    })
  }, [])

  return {
    addToast,
    hasToasts,
    removeAllToasts,
    removeToast,
    toasts,
    updateToast,
  }
}
