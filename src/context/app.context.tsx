import React, { createContext, ReactNode, useEffect } from 'react'

interface AppContextInterface {
  showSideBar: boolean
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
  showSideBar2xl: boolean
  setShowSideBar2xl: React.Dispatch<React.SetStateAction<boolean>>
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}
const initialAppContext: AppContextInterface = {
  showSideBar: false,
  setShowSideBar: () => null,
  showSideBar2xl: true,
  setShowSideBar2xl: () => null,
  theme: localStorage.getItem('theme') || 'light',
  setTheme: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showSideBar, setShowSideBar] = React.useState<boolean>(initialAppContext.showSideBar)
  const [showSideBar2xl, setShowSideBar2xl] = React.useState<boolean>(initialAppContext.showSideBar2xl)
  const [theme, setTheme] = React.useState<string>(initialAppContext.theme)
  const element = document.documentElement

  useEffect(() => {
    switch (theme) {
      case 'light':
        element.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        break
      case 'dark':
        element.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        break
      default:
        element.classList.remove('dark')
        break
    }
  }, [theme, element.classList])

  return (
    <AppContext.Provider value={{ setShowSideBar, showSideBar, setShowSideBar2xl, showSideBar2xl, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
