import { useState, useCallback } from 'react'

import { ActiveToast, Id, AddToastOptions, UpdateToastOptions } from './types'
import { getId } from './utils'

export const useActiveToasts = (_maxToasts?: number | undefined) => {
  const [toasts, setToasts] = useState<ActiveToast[]>([])
  const hasToasts = !!toasts.length
  const maxToasts = Math.max(Number(_maxToasts), 0)

  const exists = useCallback((id: Id) => toasts.some((t) => t.id === id), [toasts])

  const removeToast = useCallback(
    (id: Id) => {
      if (exists(id)) {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }
    },
    [exists]
  )

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
      const id = options.id
      if (id && !exists(id)) {
        const { type = 'info', ...rest } = options
        const newToast = { content, id, type, ...rest }
        setToasts((prevToasts) => {
          if (maxToasts && maxToasts < prevToasts.length + 1) {
            return [...prevToasts, newToast].slice(prevToasts.length + 1 - maxToasts)
          } else {
            return [...prevToasts, newToast]
          }
        })
        return id
      } else {
        return addToast(content, { ...options, id: getId() })
      }
    },
    [exists, maxToasts]
  )

  const updateToast = useCallback(
    (id: Id, options: UpdateToastOptions = {}) => {
      if (exists(id)) {
        setToasts((prevToasts) => {
          const index = prevToasts.findIndex((t) => t.id === id)
          const updatedToast = { ...prevToasts[index], ...options }
          prevToasts.splice(index, 1, updatedToast)
          return prevToasts
        })
      }
    },
    [exists]
  )

  return {
    addToast,
    hasToasts,
    removeAllToasts,
    removeToast,
    toasts,
    updateToast,
  }
}
