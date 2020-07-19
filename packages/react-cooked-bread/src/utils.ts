import { CSSProperties } from 'react'
import { Styler } from './types'

export const noop = (): void => undefined

/**
 * @source https://stackoverflow.com/a/8084248/6817437
 */
export const getId = (): string => Math.random().toString(36).substr(2, 6)

export const getStylerCSS = <T>(styler: Styler<T> | undefined, props: T): CSSProperties =>
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

export const containerClassName = 'react-cooked-bread__container'

export const toastClassNames = {
  rootOuterClassName: 'react-cooked-bread__toast__root-outer',
  rootInnerClassName: 'react-cooked-bread__toast__root-inner',
  iconWrapperClassName: 'react-cooked-bread__toast__icon-wrapper',
  iconClassName: 'react-cooked-bread__toast__icon',
  countdownClassName: 'react-cooked-bread__toast__countdown',
  contentClassName: 'react-cooked-bread__toast__content',
  closeButtonClassName: 'react-cooked-bread__toast__dismiss-button',
}
