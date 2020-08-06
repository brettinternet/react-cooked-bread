import React, { useState } from 'react'
import { DefaultToastRoot } from 'react-cooked-bread'
import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Demo } from 'components/demo'
import { Box, Flex } from 'reflexbox'

import { FluentUiContent, getFluentUiToastProps } from 'toast-content-examples'

const options = [
  {
    key: 'fluentui',
    name: 'Fluent UI',
    providerProps: {
      toastRoot: DefaultToastRoot,
      toastContent: FluentUiContent,
    },
    getToastProps: getFluentUiToastProps,
  },
]

const getOptions = (selectedKey: string) => options.filter(({ key }) => key === selectedKey)[0]

const ExamplesPage = () => {
  const [libraryOption, setLibraryOption] = useState(options[0])

  return (
    <Layout>
      <Head title="Docs" />
      <h1>Examples</h1>
      <p>This library can be easily integrated into your own component library.</p>
      <Box my={4}>
        <Flex alignItems="center" mb={4}>
          <Box mr={2}>
            <label htmlFor="custom-toast-content-select">Library:</label>
          </Box>
          <select
            id="custom-toast-content-select"
            onChange={(ev) => {
              setLibraryOption(getOptions(ev.currentTarget.value))
            }}
            css={{
              fontSize: 18,
            }}
          >
            {options.map(({ key, name }) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </Flex>
        <Demo
          full
          getToastProps={libraryOption.getToastProps}
          providerProps={libraryOption.providerProps}
        />
      </Box>
    </Layout>
  )
}

export default ExamplesPage
