import { User } from 'src/types/user.type'

export const LocalStorageEventTarget = new EventTarget()
export const saveAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLocalStorageEvent = new Event('clearLocalStorage')
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLocalStorage = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLocalStorage = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
