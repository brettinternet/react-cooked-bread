import React, { Fragment, useState, useEffect, useCallback, useRef } from 'react'

import { ToasterProps } from './toast.types'
import { Timer, getStylesMapCSS } from './utils'

export const Toaster: React.FC<ToasterProps> = ({
  children,
  toastRoot: ToastRoot,
  toastContent: ToastContent = Fragment,
  type = 'info',
  autoDismiss = false,
  autoDismissTimeout,
  content,
  placement,
  transitionDuration,
  transitionState,
  onDismiss,
  styler,
  onMouseEnter,
  onMouseLeave,
  ...unknownProps
}) => {
  const [isRunning, setRunning] = useState(autoDismiss)
  const timeout = useRef<Timer>()

  useEffect(() => {
    if (autoDismiss && !timeout.current) {
      setRunning(true)
      timeout.current = new Timer(onDismiss, autoDismissTimeout)
    }
  }, [autoDismiss, autoDismissTimeout, onDismiss])

  useEffect(() => timeout.current?.clear, [])

  const handleMouseEnter = useCallback(() => {
    if (autoDismiss) {
      timeout.current?.pause()
      setRunning(false)
    }
  }, [autoDismiss])

  const handleMouseLeave = useCallback(() => {
    if (autoDismiss) {
      timeout.current?.start()
      setRunning(true)
    }
  }, [autoDismiss])

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
      <ToastContent {...sharedProps} styles={contentStyles}>
        {children}
      </ToastContent>
    </ToastRoot>
  )
}
