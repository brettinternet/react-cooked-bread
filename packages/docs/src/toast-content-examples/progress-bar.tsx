/** @jsx jsx */
import React from 'react'
import { css, jsx, keyframes } from '@emotion/core'

interface ProgressBarProps {
  timeout: number
  isRunning: boolean
  isHidden?: boolean
}

const shrinkKeyframes = keyframes`from { width: 100%; } to { width: 0% }`

export const ProgressBar: React.FC<ProgressBarProps> = ({ isHidden, timeout, isRunning }) => (
  <div
    css={css`
      animation: ${shrinkKeyframes} ${timeout}ms linear;
      animation-play-state: ${isRunning ? 'running' : 'paused'};
      background-color: rgba(0, 0, 0, 0.1);
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      height: 2px;
      opacity: ${isHidden ? 0 : 1};
      visibility: ${isHidden ? 'hidden' : 'visible'};
      width: 0%;
    `}
  />
)
