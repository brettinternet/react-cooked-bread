import { css } from '@emotion/core'

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

export const classNamePrefix = 'react-cooked-bread'
