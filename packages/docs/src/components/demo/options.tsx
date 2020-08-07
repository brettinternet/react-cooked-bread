import React from 'react'
import {
  SlideShrinkToastRoot,
  FadeToastRoot,
  GlossyToastContent,
  BootstrapToastContent,
  ClassicToastContent,
  ToastProviderProps,
  AddToastOptions,
} from 'react-cooked-bread'
import { Box } from 'reflexbox'

import { getRandomPhrase, getRandomShortPhrase } from 'utils/content'
import { FluentUiContent, fluentUiToastOptions } from 'toast-content-examples'

type ComoponentOption = {
  key: string
  name: string
  str: string
  custom?: boolean
  providerProps: Partial<ToastProviderProps>
  getToastProps?: (content: React.ReactNode) => Partial<AddToastOptions>
  toastOptions?: {
    options: AddToastOptions
    str: string
  }
}

export const rootOptions: ComoponentOption[] = [
  {
    key: 'slide-shrink',
    name: 'Slide shrink',
    str: 'SlideShrinkToastRoot',
    providerProps: {
      toastRoot: SlideShrinkToastRoot,
    },
  },
  {
    key: 'fade',
    name: 'Fade',
    str: 'FadeToastRoot',
    providerProps: {
      toastRoot: FadeToastRoot,
    },
  },
]

export const contentOptions: ComoponentOption[] = [
  {
    key: 'glossy',
    name: 'Glossy',
    str: 'GlossyToastContent',
    providerProps: {
      toastContent: GlossyToastContent,
    },
  },
  {
    key: 'classic',
    name: 'Classic',
    str: 'ClassicToastContent',
    providerProps: {
      toastContent: ClassicToastContent,
    },
  },
  {
    key: 'bootstrap',
    name: 'Bootstrap',
    str: 'BootstrapToastContent',
    providerProps: {
      toastContent: BootstrapToastContent,
    },
  },
]

export const customContentOptions: ComoponentOption[] = [
  {
    key: 'fluentui',
    name: 'Fluent UI',
    custom: true,
    str: 'FluentUiContent',
    providerProps: {
      toastContent: FluentUiContent,
    },
    toastOptions: fluentUiToastOptions,
  },
]

const ExampleReactNode = () => {
  const phrase = getRandomShortPhrase()
  return (
    <Box my={1}>
      <button
        onClick={() => {
          console.log(phrase)
        }}
      >
        {phrase}
      </button>
    </Box>
  )
}

const getContent = () => (Math.random() > 0.8 ? <ExampleReactNode /> : getRandomPhrase())
