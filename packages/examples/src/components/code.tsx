/** @jsx jsx */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { highlightAll } from 'prismjs'
import { jsx } from '@emotion/core'
import 'prismjs/components/prism-typescript'

import { useApp } from 'utils/app.context'
import { getPrismCSS } from 'utils/prism-theme'

interface CodeProps {
  children: string
  language?: string
}

export const Code: React.FC<CodeProps> = ({ children, language = 'ts' }) => {
  const { themeType } = useApp()

  useEffect(() => {
    highlightAll()
  }, [])

  return (
    <div css={getPrismCSS(themeType)}>
      <pre>
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  )
}

Code.propTypes = {
  language: PropTypes.string,
  children: PropTypes.string.isRequired,
}
