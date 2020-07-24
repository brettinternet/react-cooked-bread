/** @jsx jsx */
import { jsx } from '@emotion/core'

import { skipLinkZIndex } from 'utils/styles'

export const SkipLink = () => (
  <a
    href="#content"
    css={{
      height: 1,
      width: 1,
      overflow: 'hidden',
      position: 'absolute',
      top: -9999,
      ':focus': {
        padding: 4,
        margin: 4,
        position: 'fixed',
        zIndex: skipLinkZIndex,
        top: 0,
        left: 0,
        background: 'white',
        height: 'auto',
        width: 'auto',
        opacity: 1,
      },
    }}
  >
    Skip to content
  </a>
)
