/** @jsx jsx */
import React, { PropsWithChildren } from 'react'
import { jsx } from '@emotion/react'
import PropTypes from 'prop-types'

import { Styler, childrenProps, placementsProps, stylerProps, PlacementOption } from './types'
import { isDev, getStylesCSS } from './utils'
import { scrollStyles } from './styles'
import { classNamePrefix } from './styles'

const containerClassName = `${classNamePrefix}__container`

const placementsCSS = {
  'top-left': { top: 0, left: 0 },
  'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0 },
  'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: 0, right: 0 },
}

interface ContainerValueProps {
  hasToasts: boolean
  placement: PlacementOption
}

export type ContainerStyler = Styler<ContainerValueProps> | undefined

export type ContainerProps = ContainerValueProps & {
  styler: ContainerStyler
  onMouseEnter?: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave?: (ev: React.MouseEvent<HTMLElement>) => void
} & React.HTMLProps<HTMLDivElement>

export const ToastContainer: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  hasToasts,
  placement,
  onMouseEnter,
  onMouseLeave,
  styler,
  ...divProps
}) => (
  <div
    className={containerClassName}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    css={[
      scrollStyles,
      {
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        boxSizing: 'border-box',
        maxHeight: '100%',
        overflow: 'hidden',
        padding: '1rem',
        pointerEvents: hasToasts ? 'auto' : 'none',
        position: 'fixed',
        zIndex: 1000,
        ...placementsCSS[placement],
        ...getStylesCSS(styler, { hasToasts, placement }),
      },
    ]}
    {...divProps}
  >
    {children}
  </div>
)

if (isDev) {
  ToastContainer.propTypes = {
    hasToasts: PropTypes.bool.isRequired,
    placement: placementsProps.isRequired,
    styler: stylerProps,
    children: childrenProps,
  }
}
