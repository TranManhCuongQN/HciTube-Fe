import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface AppContextInterface {
  showSideBar: boolean
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
  showSideBar2xl: boolean
  setShowSideBar2xl: React.Dispatch<React.SetStateAction<boolean>>
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
  showSearchMobie: boolean
  setShowSearchMobie: React.Dispatch<React.SetStateAction<boolean>>
  isAuthentication: boolean
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAppContext: AppContextInterface = {
  showSideBar: false,
  setShowSideBar: () => null,
  showSideBar2xl: true,
  setShowSideBar2xl: () => null,
  theme: localStorage.getItem('theme') || 'Light',
  setTheme: () => null,
  showSearchMobie: false,
  setShowSearchMobie: () => null,
  isAuthentication: false,
  setIsAuthentication: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showSearchMobie, setShowSearchMobie] = useState<boolean>(initialAppContext.showSearchMobie)
  const [showSideBar, setShowSideBar] = React.useState<boolean>(initialAppContext.showSideBar)
  const [showSideBar2xl, setShowSideBar2xl] = React.useState<boolean>(initialAppContext.showSideBar2xl)

  const [theme, setTheme] = React.useState<string>(initialAppContext.theme)
  const element = document.documentElement

  const [isAuthentication, setIsAuthentication] = useState<boolean>(initialAppContext.isAuthentication)

  useEffect(() => {
    switch (theme) {
      case 'Light':
        element.classList.remove('dark')
        localStorage.setItem('theme', 'Light')
        break
      case 'Dark':
        element.classList.add('dark')
        localStorage.setItem('theme', 'Dark')
        break
      default:
        element.classList.remove('Dark')
        break
    }
  }, [theme, element.classList])

  return (
    <AppContext.Provider
      value={{
        setShowSideBar,
        showSideBar,
        setShowSideBar2xl,
        showSideBar2xl,
        theme,
        setTheme,
        showSearchMobie,
        setShowSearchMobie,
        isAuthentication,
        setIsAuthentication
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
