import React, { createContext, ReactNode } from 'react'

interface AppContextInterface {
  showSideBar: boolean
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
  showSideBar2xl: boolean
  setShowSideBar2xl: React.Dispatch<React.SetStateAction<boolean>>
}
const initialAppContext: AppContextInterface = {
  showSideBar: false,
  setShowSideBar: () => null,
  showSideBar2xl: true,
  setShowSideBar2xl: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showSideBar, setShowSideBar] = React.useState<boolean>(initialAppContext.showSideBar)

  const [showSideBar2xl, setShowSideBar2xl] = React.useState<boolean>(initialAppContext.showSideBar2xl)

  console.log('showbar2xl', showSideBar2xl)

  return (
    <AppContext.Provider value={{ setShowSideBar, showSideBar, setShowSideBar2xl, showSideBar2xl }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
