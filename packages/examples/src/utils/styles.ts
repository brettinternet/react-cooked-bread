export const breakpoints = [350, 480, 640, 820, 1024, 1366, 1920]
export const headerHeight = 70
export const footerHeight = 100
export const menuMaxWidth = 200
export const appWidth = breakpoints[3]

export const createMediaQuery = (n: number, invert = false) =>
  `@media screen and (${invert ? 'max' : 'min'}-width: ${n}px)`
