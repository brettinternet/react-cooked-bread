import React, { useState, useEffect, useCallback, useRef } from 'react'

import { ToasterProps } from './toast-types'
import { Timer, getStylesMapCSS, TimerState } from './utils'

export const Toaster: React.FC<ToasterProps> = ({
  children,
  toastRoot: ToastRoot,
  toastContent: ToastContent,
  type,
  autoDismiss = false,
  autoDismissTimeout,
  content,
  placement,
  transitionDuration,
  transitionState,
  isPaused,
  onDismiss,
  styler,
  onMouseEnter,
  onMouseLeave,
  ...unknownProps
}) => {
  const [isRunning, setRunning] = useState(autoDismiss)
  const timer = useRef<Timer>()

  useEffect(() => {
    if (autoDismiss && !timer.current) {
      setRunning(true)
      timer.current = new Timer(onDismiss, autoDismissTimeout)
    }
  }, [autoDismiss, autoDismissTimeout, onDismiss])

  useEffect(() => timer.current?.clear, [])

  useEffect(() => {
    if (isPaused) {
      timer.current?.pause()
      setRunning(false)
    } else if (timer.current?.state === TimerState.PAUSED) {
      timer.current.start()
      setRunning(true)
    }
  }, [isPaused])

  const handleMouseEnter = useCallback(() => {
    if (autoDismiss && !isPaused) {
      timer.current?.pause()
      setRunning(false)
    }
  }, [autoDismiss, isPaused])

  const handleMouseLeave = useCallback(() => {
    if (autoDismiss && !isPaused) {
      timer.current?.start()
      setRunning(true)
    }
  }, [autoDismiss, isPaused])

  const { root: rootStyles, ...contentStyles } = getStylesMapCSS(styler, {
    ...unknownProps,
    content,
    type,
    autoDismiss,
    autoDismissTimeout,
    isRunning,
    placement,
    transitionDuration,
    transitionState,
  })

  const sharedProps = {
    ...unknownProps,
    type,
    onDismiss,
    content,
    autoDismiss,
    autoDismissTimeout,
    isRunning,
    placement,
    transitionDuration,
    transitionState,
  }

  return (
    <ToastRoot
      {...sharedProps}
      onMouseEnter={onMouseEnter || handleMouseEnter}
      onMouseLeave={onMouseLeave || handleMouseLeave}
      styles={rootStyles}
    >
      {ToastContent ? (
        <ToastContent {...sharedProps} styles={contentStyles}>
          {children}
        </ToastContent>
      ) : (
        children
      )}
    </ToastRoot>
  )
}
