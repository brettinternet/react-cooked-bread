import React, { ComponentType, useState, useEffect, useCallback, useRef } from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'

import { ToastProps, ToastStyler } from './toast'
import { Timer } from './utils'
import { ToastType, Placement } from './types'

export interface ToasterProps {
  component: ComponentType<ToastProps>
  type?: ToastType
  content: React.ReactNode
  autoDismiss: boolean
  autoDismissTimeout: number
  onDismiss: () => void
  onMouseEnter?: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave?: (ev: React.MouseEvent<HTMLElement>) => void
  placement: Placement
  transitionDuration: number
  transitionState: TransitionStatus
  styler: ToastStyler | undefined
}

export const Toaster: React.FC<ToasterProps> = ({
  children,
  autoDismiss = false,
  autoDismissTimeout,
  onDismiss,
  component: Toast,
  ...props
}) => {
  const [isRunning, setRunning] = useState(autoDismiss)
  const timeout = useRef<Timer>()

  useEffect(() => {
    if (autoDismiss && !timeout.current) {
      setRunning(true)
      timeout.current = new Timer(onDismiss, autoDismissTimeout)

      return timeout.current?.clear
    }
  }, [autoDismiss, onDismiss, autoDismissTimeout])

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

  return (
    <Toast
      autoDismiss={autoDismiss}
      autoDismissTimeout={autoDismissTimeout}
      onDismiss={onDismiss}
      isRunning={isRunning}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Toast>
  )
}
