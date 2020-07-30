import { useState, useCallback } from 'react'

import { ActiveToast, Id, AddToastOptions, UpdateToastOptions } from './types'
import { getId } from './utils'

export const useActiveToasts = () => {
  const [toasts, setToasts] = useState<ActiveToast[]>([])
  const hasToasts = !!toasts.length

  const exists = (id: Id | undefined) => {
    if (id && hasToasts) {
      return !!toasts.filter((t) => t.id === id).length
    }
  }

  const removeToast = (id: Id | undefined) => {
    if (exists(id)) {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }
  }

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const addToast = (content: React.ReactNode, options: AddToastOptions = {}): string => {
    const id = options.id || getId()
    if (!exists(id)) {
      const { type = 'info', ...rest } = options
      const newToast = { content, id, type, ...rest }
      setToasts((prevToasts) => [...prevToasts, newToast])
      return id
    } else {
      return addToast(content, options)
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
