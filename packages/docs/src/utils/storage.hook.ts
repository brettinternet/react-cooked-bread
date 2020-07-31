import { useState } from 'react'

import {
  LocalStorageKey,
  SessionStorageKey,
  setLocalStorage,
  getLocalStorage,
  getSessionStorage,
  setSessionStorage,
} from 'utils/storage'

type ValueSetter<T> = T | ((storedValue: T) => T)

export const useStorage = <T>(
  key: LocalStorageKey | SessionStorageKey,
  defaultValue: T,
  isSessionStorage = false
): [T, (value: ValueSetter<T>) => void] => {
  const sessionKey = key as SessionStorageKey
  const localKey = key as LocalStorageKey

  const [value, setStoredValue] = useState<T>(() => {
    const storedValue: T | undefined = isSessionStorage
      ? getSessionStorage<T>(sessionKey)
      : getLocalStorage<T>(localKey)
    return storedValue !== undefined ? storedValue : defaultValue
  })

  const setValue = (newValue: ValueSetter<T>) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue
    setStoredValue(valueToStore)
    if (isSessionStorage) {
      setSessionStorage(sessionKey, valueToStore)
    } else {
      setLocalStorage(localKey, valueToStore)
    }
  }

  return [value, setValue]
}
