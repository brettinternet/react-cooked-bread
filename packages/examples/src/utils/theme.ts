import { breakpoints } from 'utils/styles'
import { isBrowser } from 'utils/window'

const colors = {
  white: 'white',
  black: 'black',
  yellowDark: 'darkgoldenrod',
  linen: '#f5f2f0',
  charcoal: '#272822',
}

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

const getColors = (themeType: ThemeType): typeof colors => {
  switch (themeType) {
    case ThemeType.DARK:
      return {
        white: colors.black,
        black: colors.white,
        yellowDark: 'darkgoldenrod',
        linen: colors.charcoal,
        charcoal: colors.linen,
      }
    case ThemeType.LIGHT:
    default:
      return colors
  }
}

const semanticColors = {
  fg: colors.black,
  bg: colors.white,
  bread: colors.yellowDark,
  code: colors.linen,
}

const getSemanticColors = (themeType: ThemeType): typeof semanticColors => {
  switch (themeType) {
    case ThemeType.DARK:
      return {
        bg: colors.black,
        fg: colors.white,
        bread: colors.yellowDark,
        code: colors.charcoal,
      }
    case ThemeType.LIGHT:
    default:
      return semanticColors
  }
}

export const getTheme = (themeType: ThemeType) => ({
  themeType,
  breakpoints: breakpoints.map((n) => `${n}px`),
  space: [2, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    ...getSemanticColors(themeType),
    ...getColors(themeType),
  },
})

export type Theme = ReturnType<typeof getTheme>

export const darkModePreferred =
  isBrowser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
