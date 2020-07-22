import { Styler, StylerMap, StylesObj, Styles } from './types'

export const noop = (): void => undefined

/**
 * @source https://stackoverflow.com/a/8084248/6817437
 */
export const getId = (): string => Math.random().toString(36).substr(2, 6)

export const getStylesMapCSS = <K extends string, P>(
  styler: StylerMap<K, P> | undefined,
  props: P
): StylesObj<K> => (typeof styler === 'function' ? styler(props) : styler) || {}

export const getStylesCSS = <P>(styler: Styler<P> | undefined, props: P): Styles =>
  (typeof styler === 'function' ? styler(props) : styler) || {}

export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

export class Timer {
  private timerId: number | undefined
  private startDate: number | undefined
  private remaining: number

  constructor(private callback: () => void, delay: number) {
    this.remaining = delay

    if (isBrowser) {
      this.start()
    }
  }

  start = (): void => {
    this.startDate = Date.now()
    clearTimeout(this.timerId)
    this.timerId = window.setTimeout(this.callback, this.remaining)
  }

  pause = (): void => {
    if (this.startDate) {
      window.clearTimeout(this.timerId)
      this.remaining -= Date.now() - this.startDate
    }
  }

  clear = (): void => {
    window.clearTimeout(this.timerId)
  }
}
