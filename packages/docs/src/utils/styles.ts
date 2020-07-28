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
      background: ${theme.colors.bgCode};
      padding: 2px 4px;
      border-radius: 0.3rem;
    }

    article {
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

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        a.anchor.before {
          position: absolute;
          padding-right: 0.25rem;
          transform: translateX(-100%);
          color: ${theme.colors.fg};
          opacity: 1;

          svg {
            visibility: hidden;
            fill: currentColor;
          }
        }

        &:hover a.anchor.before svg {
          visibility: visible;
        }
      }

      h1 {
        font-size: 2rem;
      }

      h2 {
        margin-top: 4rem;
      }

      h3 {
        margin-top: 2rem;
      }

      p {
        line-height: 1.6;
      }

      blockquote {
        margin-top: 2rem;
        margin-bottom: 2rem;
        font-size: 1.1rem;
        display: flex;
        flex-direction: row;
        color: ${theme.colors.grayDark};
        font-weight: bold;

        p {
          margin: 0;
        }

        &:before {
          content: '🍞';
          margin-right: 1rem;
        }
      }
    }
  `
