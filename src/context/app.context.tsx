import { profile } from 'console'
import { userInfo } from 'os'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { User } from 'src/types/user.type'
import { ExtendedVideo } from 'src/types/video.type'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  showSideBar: boolean
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>

  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
  showSearchMobie: boolean
  setShowSearchMobie: React.Dispatch<React.SetStateAction<boolean>>
  isVerify: '0' | '1' | '2'
  setIsVerify: React.Dispatch<React.SetStateAction<'0' | '1' | '2'>>
  extendedVideos: ExtendedVideo[]
  setExtendedVideos: React.Dispatch<React.SetStateAction<ExtendedVideo[]>>
  thumbnail: string[]
  setThumbnail: React.Dispatch<React.SetStateAction<string[]>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initialAppContext: AppContextInterface = {
  showSideBar: false,
  setShowSideBar: () => null,
  theme: localStorage.getItem('theme') || 'Light',
  setTheme: () => null,
  showSearchMobie: false,
  setShowSearchMobie: () => null,
  isVerify: getAccessTokenFromLocalStorage() !== '' ? '2' : getProfileFromLocalStorage() ? '1' : '0',
  setIsVerify: () => null,
  extendedVideos: [],
  setExtendedVideos: () => null,
  thumbnail: [],
  setThumbnail: () => null,
  profile: getProfileFromLocalStorage(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showSearchMobie, setShowSearchMobie] = useState<boolean>(initialAppContext.showSearchMobie)
  const [showSideBar, setShowSideBar] = React.useState<boolean>(initialAppContext.showSideBar)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  const [theme, setTheme] = React.useState<string>(initialAppContext.theme)
  const element = document.documentElement

  const [isVerify, setIsVerify] = useState<'0' | '1' | '2'>(initialAppContext.isVerify)

  const [extendedVideos, setExtendedVideos] = useState<ExtendedVideo[]>(initialAppContext.extendedVideos)

  const [thumbnail, setThumbnail] = useState<string[]>(initialAppContext.thumbnail)

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
        theme,
        setTheme,
        showSearchMobie,
        setShowSearchMobie,
        isVerify,
        setIsVerify,
        extendedVideos,
        setExtendedVideos,
        thumbnail,
        setThumbnail,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
