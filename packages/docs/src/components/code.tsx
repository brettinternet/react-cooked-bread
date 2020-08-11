import React from 'react'
import Highlight, { Prism, Language } from 'prism-react-renderer'

type CodeProps = {
  children: string
  language?: Language
}

export const Code: React.FC<CodeProps> = ({ children, language = 'tsx' }) => (
  <Highlight Prism={Prism} theme={undefined} code={children} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => {
          if (line.length === 1 && line[0].content === '') {
            line[0].content = ' '
          }
          return (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          )
        })}
      </pre>
    )}
  </Highlight>
)
