export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

export const newWindowProps = {
  target: '_blank',
  rel: 'noreferrer noopener',
}
