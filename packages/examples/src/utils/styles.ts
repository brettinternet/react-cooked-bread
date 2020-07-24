import { css } from '@emotion/core'

import { Theme } from './theme'

export const breakpoints = [350, 480, 640, 820, 1024, 1366, 1920]
export const headerHeight = 70
export const footerHeight = 100
export const menuMaxWidth = 200
export const appWidth = breakpoints[3]
export const skipLinkZIndex = 10

export const createMediaQuery = (n: number, invert = false) =>
  `@media screen and (${invert ? 'max' : 'min'}-width: ${n}px)`

export const getGlobalStyles = (theme: Theme) =>
  css`
    html,
    body {
      height: 100%;
    }

    body {
      margin: 0;
      transition: color 150ms, background 150ms;
      background: ${theme.colors.bg};
      color: ${theme.colors.fg};
      font-family: 'Source Sans Pro', sans-serif;
    }

    a {
      color: inherit;
      transition: opacity 150ms;

      &:hover {
        opacity: 0.7;
      }
    }

    :not(pre) > code {
      background: ${theme.colors.code};
      padding: 2px 4px;
      border-radius: 0.3rem;
    }

    table {
      width: 100%;
      th {
        text-align: left;
      }

      td,
      th {
        padding: 0.4rem;
      }
    }
  `
