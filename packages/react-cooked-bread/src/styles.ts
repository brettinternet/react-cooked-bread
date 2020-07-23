import { css } from '@emotion/core'

export const colors = {
  success: {
    text: '#006644',
    fg: '#36B37E',
    bg: '#E3FCEF',
  },
  error: {
    text: '#BF2600',
    fg: '#FF5630',
    bg: '#FFEBE6',
  },
  warning: {
    text: '#FF8B00',
    fg: '#FFAB00',
    bg: '#FFFAE6',
  },
  info: {
    text: '#505F79',
    fg: '#2684FF',
    bg: 'white',
  },
}

/**
 * @note Must be string styles else `scrollbar-color` and `scrollbar-width`
 * may throw errors while these properties are still being adopted
 */
export const scrollStyles = css`
  /* Chrome https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar */
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-track {
  }
  &::-webkit-scrollbar-thumb {
    background: gainsboro;
  }
  &::-webkit-scrollbar-thumb:hover,
  &::-webkit-scrollbar-thumb:active {
    background: lightgray;
  }
  /* Firefox https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars */
  scrollbar-color: auto;
  scrollbar-width: thin;
`
