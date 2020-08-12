import { createContext, useContext, Dispatch, SetStateAction } from 'react'

import { ThemeType } from 'utils/theme'

interface AppContextProps {
  themeType: ThemeType
  setThemeType: Dispatch<SetStateAction<ThemeType>>
}

export const defaultThemeType = ThemeType.LIGHT

export const AppContext = createContext<AppContextProps>({
  themeType: defaultThemeType,
  setThemeType: () => defaultThemeType,
})

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}
