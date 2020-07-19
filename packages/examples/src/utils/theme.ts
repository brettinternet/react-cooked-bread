import { breakpoints } from 'utils/styles'

const colors = {
  white: 'white',
  black: 'black',
  yellowDark: 'darkgoldenrod',
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
}

const getSemanticColors = (themeType: ThemeType): typeof semanticColors => {
  switch (themeType) {
    case ThemeType.DARK:
      return {
        bg: colors.black,
        fg: colors.white,
        bread: colors.yellowDark,
      }
    case ThemeType.LIGHT:
    default:
      return semanticColors
  }
}

export const getTheme = (themeType: ThemeType) => ({
  breakpoints: breakpoints.map((n) => `${n}px`),
  space: [2, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    ...getSemanticColors(themeType),
    ...getColors(themeType),
  },
})

export type Theme = ReturnType<typeof getTheme>

export const darkModePreferred =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const getGlobalStyles = (theme: Theme) => ({
  'html, body': {
    height: '100%',
  },
  body: {
    margin: 0,
    transition: 'color 150ms, background 150ms',
    background: theme.colors.bg,
    color: theme.colors.fg,
    fontFamily: 'Source Sans Pro, sans-serif',
  },
  a: {
    color: 'inherit',
    transition: 'opacity 150ms',
    ':hover': {
      opacity: 0.7,
    },
  },
})
