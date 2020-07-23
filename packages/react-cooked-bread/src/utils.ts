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

export enum TimerState {
  READY,
  RUNNING,
  PAUSED,
  COMPLETED,
}
export class Timer {
  private timerId: number | undefined
  private startDate: number | undefined
  private remaining: number
  state: TimerState = TimerState.READY

  constructor(private readonly callback: () => void, delay: number) {
    this.remaining = delay

    if (isBrowser) {
      this.start()
    }
  }

  start = (): void => {
    this.clear()
    if (this.remaining > 0) {
      this.startDate = Date.now()
      this.timerId = window.setTimeout(() => {
        this.callback()
        this.state = TimerState.COMPLETED
      }, this.remaining)
      this.state = TimerState.RUNNING
    }
  }

  pause = (): void => {
    if (this.startDate) {
      this.clear()
      this.state = TimerState.PAUSED
      this.remaining -= Date.now() - this.startDate
    }
  }

  clear = (): void => {
    if (this.timerId) {
      window.clearTimeout(this.timerId)
    }
  }
}
