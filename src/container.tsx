/** @jsx jsx */
import React, { PropsWithChildren } from 'react'
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'

import { Placement, Styler } from './types'
import { gutter } from './toast'
import { getStylerCSS, containerClassName } from './utils'
import { childrenProps, placementsProps, stylerProps } from './prop-types'

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
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  hasToasts,
  placement,
  styler,
}) => (
  <div
    className={containerClassName}
    css={{
      boxSizing: 'border-box',
      maxHeight: '100%',
      overflow: 'hidden',
      padding: gutter,
      pointerEvents: hasToasts ? 'auto' : 'none',
      position: 'fixed',
      zIndex: 1000,
      ...placementsCSS[placement],
      ...getStylerCSS(styler, { hasToasts, placement }),
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
