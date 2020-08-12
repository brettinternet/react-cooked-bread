import { Styler, StylerMap, StylesObj, Styles, TransitionDuration, TransitionStatus } from './types'

export const isDev = process.env.NODE_ENV !== 'production'

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
  timeLeft: number
  state: TimerState = TimerState.READY

  constructor(private readonly callback: () => void, timeout: number) {
    this.timeLeft = timeout

    if (isBrowser) {
      this.start()
    }
  }

  start = (): void => {
    this.clear()
    if (this.timeLeft > 0) {
      this.startDate = Date.now()
      this.timerId = window.setTimeout(() => {
        this.callback()
        this.timeLeft = 0
        this.state = TimerState.COMPLETED
      }, this.timeLeft)
      this.state = TimerState.RUNNING
    }
  }

  pause = (): void => {
    if (this.startDate) {
      this.clear()
      this.state = TimerState.PAUSED
      this.timeLeft -= Date.now() - this.startDate
    }
  }

  updateTimeout = (newTimeout: number): void => {
    this.clear()
    this.timeLeft = newTimeout
    this.start()
  }

  clear = (): void => {
    if (this.timerId) {
      window.clearTimeout(this.timerId)
    }
  }
}

/**
 * @reference https://reactcommunity.org/react-transition-group/transition#Transition-prop-timeout
 */
export const getTransitionDuration = (
  d: TransitionDuration,
  transitionState: TransitionStatus
): number => {
  if (typeof d === 'object' && d !== null) {
    switch (transitionState) {
      case 'exiting':
      case 'exited':
        return d.exit || 0
      default:
        return d.appear || d.enter || 0
    }
  }

  return d
}

export const getFocusEvents = (cb: (isBlurred: boolean) => void) => {
  const handleFocus = () => {
    cb(false)
  }
  const handleBlur = () => {
    cb(true)
  }
  const handleVisibility = () => {
    cb(document.hidden)
  }

  return {
    bind: () => {
      window.addEventListener('focus', handleFocus)
      window.addEventListener('blur', handleBlur)
      document.addEventListener('visibilitychange', handleVisibility)
    },
    unbind: () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('visibilitychange', handleVisibility)
    },
  }
}

export const error = isDev
  ? (message: string) => {
      if (typeof console !== 'undefined') {
        console.error(message)
      }
      try {
        throw Error(message)
      } catch (err) {} // eslint-disable-line no-empty
    }
  : noop

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDisplayName = (WrappedComponent: React.ComponentType<any>) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
