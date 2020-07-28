export enum LocalStorageKey {
  THEME_TYPE = 'themeType',
}

export enum SessionStorageKey {
  EXAMPLE = 'example',
}

const parse = <T>(value: string | null): T | undefined => (value ? JSON.parse(value) : undefined)

export const getLocalStorage = <T>(key: LocalStorageKey): T | undefined => {
  if (key) {
    try {
      return parse(window.localStorage.getItem(key))
    } catch (e) {
      console.error(e)
    }
  }
}

export const setLocalStorage = (key: LocalStorageKey, value: unknown) => {
  if (key) {
    try {
      return window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }
}

export const getSessionStorage = <T>(key: SessionStorageKey): T | undefined => {
  if (key) {
    try {
      return parse(window.sessionStorage.getItem(key))
    } catch (e) {
      console.error(e)
    }
  }
}

export const setSessionStorage = (key: SessionStorageKey, value: unknown) => {
  if (key) {
    try {
      return window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }
}
