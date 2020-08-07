import { breakpoints } from 'utils/styles'
import { isBrowser } from 'utils/window'

const colors = {
  white: 'white',
  black: 'black',
  yellowDark: 'darkgoldenrod',
  yellowLight: 'lightgoldenrodyellow',
  linen: 'antiquewhite',
  grayDark: '#272822',
  grayLight: 'dimgray',
  whiteAlt: 'ivory',
  success: '#dff6dd',
  info: '#deecf9',
  warning: '#fff4ce',
  error: '#fde7e9',
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
        yellowDark: colors.yellowLight,
        yellowLight: colors.yellowDark,
        linen: colors.grayDark,
        grayDark: colors.linen,
        grayLight: colors.whiteAlt,
        whiteAlt: colors.grayLight,
        success: colors.success,
        info: colors.info,
        warning: colors.warning,
        error: colors.error,
      }
    case ThemeType.LIGHT:
    default:
      return colors
  }
}

const semanticColors = {
  fg: colors.black,
  bg: colors.white,
  bgCode: colors.linen,
}

const getSemanticColors = (themeType: ThemeType): typeof semanticColors => {
  switch (themeType) {
    case ThemeType.DARK:
      return {
        bg: colors.black,
        fg: colors.white,
        bgCode: colors.grayDark,
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
