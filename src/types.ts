import React from 'react'

export type Id = string

export type ToastType = 'error' | 'info' | 'success' | 'warning'

/**
 * Allow custom props if users don't wish to
 * shadow/override or extend
 */
export type GenericObject = Record<string, unknown>

export type Options = {
  id?: Id
  type?: ToastType
  autoDismiss?: boolean
  onDismiss?: (id: string | undefined) => void
} & GenericObject

export type ActiveToast = {
  content: React.ReactNode
} & Options

export type Add = (content: React.ReactNode, options?: Options) => Id | void

export type Update = (id: Id, options: Options) => void

export type Remove = (id: Id) => void

export type Placement =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right'

export type StyleObj = React.CSSProperties
export type StyleFn<T> = (props: T) => React.CSSProperties

export type Styler<T = undefined> = StyleObj | StyleFn<T> | null

/**
 * TS wants children declared when used in prop-types
 */
export type PropsWithRequiredChildren<P> = P & {
  children: React.ReactNode
}
