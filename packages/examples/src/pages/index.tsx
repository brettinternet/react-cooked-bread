import React from 'react'
import { ToastProvider, DefaultToastRoot, DefaultToastContent } from 'react-cooked-bread'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Code } from 'components/code'
import { Library } from 'components/library'
import { Box } from 'reflexbox'

const code = `interface SearchFunc {
  (source: string, subString: string): boolean;
}

type Test = {
  [key: string]: string[]
}

var mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  var result = source.search(subString);
  if (result == -1) {
    return false;
  }
  else {
    return true;
  }
}

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

var greeter = new Greeter("world");`

const IndexPage = () => {
  return (
    <Layout>
      <Head title="docs" />
      <Box mb={5}>
        <ToastProvider
          toastRoot={DefaultToastRoot}
          toastContent={DefaultToastContent}
          pauseAllOnHover
        >
          <Library />
        </ToastProvider>
      </Box>
      <Code>{code}</Code>
    </Layout>
  )
}

export default IndexPage
