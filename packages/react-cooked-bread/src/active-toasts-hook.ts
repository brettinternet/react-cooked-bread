import { useState, useCallback } from 'react'

import { ActiveToast, Id, AddToastOptions, UpdateToastOptions } from './types'
import { getId } from './utils'

export const useActiveToasts = (maxToasts: number | undefined) => {
  const [toasts, setToasts] = useState<ActiveToast[]>([])
  const hasToasts = !!toasts.length

  const exists = (id: Id) => {
    if (id && hasToasts) {
      return !!toasts.filter((t) => t.id === id).length
    }
  }

  const removeToast = (id: Id) => {
    if (exists(id)) {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }
  }

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  /**
   * @todo It's very convenient to guarantee a string return,
   * but we should configure this to gracefully fail creation
   * when a duplicate custom `id` is set in options
   */
  const addToast = (content: React.ReactNode, options: AddToastOptions = {}): string => {
    const id = options.id || getId()
    if (!exists(id)) {
      const { type = 'info', ...rest } = options
      const newToast = { content, id, type, ...rest }
      if (maxToasts && maxToasts < toasts.length + 1) {
        setToasts((prevToasts) => [...prevToasts, newToast].slice(toasts.length + 1 - maxToasts))
      } else {
        setToasts((prevToasts) => [...prevToasts, newToast])
      }
      return id
    } else {
      return addToast(content, { ...options, id: getId() })
    }
  }

  const updateToast = (id: Id, options: UpdateToastOptions = {}) => {
    if (exists(id)) {
      const index = toasts.findIndex((t) => t.id === id)
      const updatedToast = { ...toasts[index], ...options }
      setToasts((prevToasts) => [
        ...prevToasts.slice(0, index),
        updatedToast,
        ...prevToasts.slice(index + 1),
      ])
    }
  }

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    hasToasts,
  }
}
