/** @jsx jsx */
import React, { PropsWithChildren } from 'react'
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'

import { Placement, Styler, childrenProps, placementsProps, stylerProps } from './types'
import { gutter } from './toast-root'
import { getStylesCSS } from './utils'

export const containerClassName = 'react-cooked-bread__container'

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
  placement: Placement
}

export type ContainerStyler = Styler<ContainerValueProps> | undefined

export type ContainerProps = ContainerValueProps & {
  styler: ContainerStyler
  onMouseEnter?: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave?: (ev: React.MouseEvent<HTMLElement>) => void
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  hasToasts,
  placement,
  onMouseEnter,
  onMouseLeave,
  styler,
}) => (
  <div
    className={containerClassName}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    css={{
      boxSizing: 'border-box',
      maxHeight: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: gutter,
      pointerEvents: hasToasts ? 'auto' : 'none',
      position: 'fixed',
      zIndex: 1000,
      ...placementsCSS[placement],
      ...getStylesCSS(styler, { hasToasts, placement }),
    }}
  >
    {children}
  </div>
)

Container.propTypes = {
  hasToasts: PropTypes.bool.isRequired,
  placement: placementsProps.isRequired,
  styler: stylerProps,
  children: childrenProps,
}
