import React, { useState, useEffect, useCallback, useRef } from 'react'

import { ToasterProps } from './toast-types'
import { Timer, getStylesMapCSS, TimerState, getStylesCSS } from './utils'

export const Toaster: React.FC<ToasterProps> = ({
  children,
  toastRoot: ToastRoot,
  toastContent: ToastContent,
  type,
  autoDismiss = false,
  timeout,
  content,
  placement,
  transitionDuration,
  transitionState,
  isContainerHovered,
  onDismiss,
  rootStyles,
  contentStyles,
  id,
  ...unknownProps
}) => {
  const [isRunning, setRunning] = useState(autoDismiss)
  const timer = useRef<Timer>()

  useEffect(() => {
    if (
      timer.current &&
      timer.current.state !== TimerState.COMPLETED &&
      timer.current.state !== TimerState.READY
    ) {
      timer.current.updateTimeout(timeout)
    }
  }, [timeout])

  useEffect(() => {
    if (timeout && autoDismiss && !timer.current) {
      setRunning(true)
      timer.current = new Timer(onDismiss, timeout)
    }
  }, [autoDismiss, timeout, onDismiss])

  useEffect(() => timer.current?.clear, [])

  useEffect(() => {
    if (isContainerHovered) {
      timer.current?.pause()
      setRunning(false)
    } else if (timer.current?.state === TimerState.PAUSED) {
      timer.current.start()
      setRunning(true)
    }
  }, [isContainerHovered])

  const handleMouseEnter = useCallback(() => {
    if (autoDismiss && !isContainerHovered) {
      timer.current?.pause()
      setRunning(false)
    }
  }, [autoDismiss, isContainerHovered])

  const handleMouseLeave = useCallback(() => {
    if (autoDismiss && !isContainerHovered) {
      timer.current?.start()
      setRunning(true)
    }
  }, [autoDismiss, isContainerHovered])

  const styleProps = {
    ...unknownProps,
    id,
    type,
    content,
    autoDismiss,
    timeout,
    isRunning,
    placement,
    transitionDuration,
    transitionState,
    isContainerHovered,
  }

  const sharedProps = {
    ...styleProps,
    onDismiss,
  }

  return (
    <ToastRoot
      {...sharedProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      styles={getStylesCSS(rootStyles, styleProps)}
    >
      {ToastContent ? (
        <ToastContent {...sharedProps} styles={getStylesMapCSS(contentStyles, styleProps)}>
          {children}
        </ToastContent>
      ) : (
        children
      )}
    </ToastRoot>
  )
}
