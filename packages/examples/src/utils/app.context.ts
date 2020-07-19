import { createContext, useContext, Dispatch, SetStateAction } from 'react'

import { darkModePreferred, ThemeType } from 'utils/theme'

interface AppContextProps {
  themeType: ThemeType
  setThemeType: Dispatch<SetStateAction<ThemeType>>
}

export const systemThemeType = darkModePreferred ? ThemeType.DARK : ThemeType.LIGHT

export const AppContext = createContext<AppContextProps>({
  themeType: systemThemeType,
  setThemeType: () => systemThemeType,
})

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}
