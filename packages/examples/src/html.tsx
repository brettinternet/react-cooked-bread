import React from 'react'
import PropTypes from 'prop-types'

interface HtmlProps {
  htmlAttributes: Record<string, unknown>
  headComponents: []
  bodyAttributes: Record<string, unknown>
  preBodyComponents: []
  body: string
  postBodyComponents: []
}

const HTML = (props: HtmlProps) => (
  <html {...props.htmlAttributes} lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        // eslint-disable-next-line @typescript-eslint/naming-convention
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
)

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

export default HTML
