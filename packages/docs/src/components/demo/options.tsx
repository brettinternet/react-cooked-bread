import React from 'react'
import {
  SlideShrinkToastRoot,
  FadeToastRoot,
  GlossyToastContent,
  BootstrapToastContent,
  ClassicToastContent,
  ZeitToastContent,
  ToastProviderProps,
  AddToastOptions,
} from 'react-cooked-bread'

import {
  FluentUiContent,
  fluentUiToastOptions,
  getFluentUiToastProps,
} from 'toast-content-examples'
import { getRandom } from 'utils/content'

type ComponentOption = {
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

type RootComponentOption = {
  providerProps: ToastProviderProps
} & ComponentOption

export const getOption = <T extends { key: string }>(selectedKey: string, options: T[]) =>
  options.filter(({ key }) => key === selectedKey)[0]

export const rootOptions: RootComponentOption[] = [
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

export const contentOptions: ComponentOption[] = [
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
  {
    key: 'zeit',
    name: 'Zeit',
    str: 'ZeitToastContentProps',
    providerProps: {
      toastContent: ZeitToastContent,
    },
    getToastProps: () => ({
      buttons: getRandom(
        [
          [
            {
              text: 'Accept',
              onClick: () => {
                console.log('Accept')
              },
            },
            {
              text: 'Cancel',
              onClick: () => {
                console.log('Cancel')
              },
              secondary: true,
            },
          ],
        ].concat(new Array(4))
      ),
    }),
    toastOptions: {
      options: {
        actions: [
          {
            text: 'Accept',
            onClick: () => {
              console.log('Accept')
            },
          },
          {
            text: 'Cancel',
            onClick: () => {
              console.log('Cancel')
            },
            secondary: true,
          },
        ],
      },
      str: `
          // custom props
          actions: [
            {
              text: 'Accept',
              onClick: () => {
                console.log('Accept')
              },
            },
            {
              text: 'Cancel',
              onClick: () => {
                console.log('Cancel')
              },
              secondary: true,
            },
          ],`,
    },
  },
]

export const customContentOptions: ComponentOption[] = [
  {
    key: 'fluentui',
    name: 'Fluent UI',
    custom: true,
    str: 'FluentUiContent',
    providerProps: {
      toastContent: FluentUiContent,
    },
    toastOptions: fluentUiToastOptions,
    getToastProps: getFluentUiToastProps,
  },
]
