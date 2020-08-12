import React, { useState, useEffect, useCallback, useRef } from 'react'

import { ToasterProps } from './toast-types'
import { Timer, getStylesMapCSS, TimerState, getStylesCSS } from './utils'

export const Toaster: React.FC<ToasterProps> = ({
  children,
  toastRoot: ToastRoot,
  toastContent: ToastContent,
  type,
  autoDismiss,
  timeout,
  content,
  placement,
  transitionDuration,
  transitionState,
  pauseAllOnHover,
  isContainerHovered,
  onDismiss,
  rootStyles,
  contentStyles,
  id,
  index,
  toasts,
  reverseColumn,
  ...unknownProps
}) => {
  const [isRunning, setRunning] = useState(autoDismiss)
  const [isItemHovered, setItemHovered] = useState(false)
  const timer = useRef<Timer>()
  const isParentPaused = pauseAllOnHover && isContainerHovered

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
    if (isParentPaused) {
      timer.current?.pause()
      setRunning(false)
    } else if (timer.current?.state === TimerState.PAUSED) {
      timer.current.start()
      setRunning(true)
    }
  }, [isParentPaused])

  const handleMouseEnter = useCallback(() => {
    if (autoDismiss && !isParentPaused) {
      timer.current?.pause()
      setRunning(false)
    }
    setItemHovered(true)
  }, [autoDismiss, isParentPaused])

  const handleMouseLeave = useCallback(() => {
    if (autoDismiss && !isParentPaused) {
      timer.current?.start()
      setRunning(true)
    }
    setItemHovered(false)
  }, [autoDismiss, isParentPaused])

  const styleProps = {
    ...unknownProps,
    id,
    index,
    toasts,
    type,
    content,
    autoDismiss,
    timeout,
    isRunning,
    placement,
    transitionDuration,
    transitionState,
    isContainerHovered,
    reverseColumn,
    isItemHovered,
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
