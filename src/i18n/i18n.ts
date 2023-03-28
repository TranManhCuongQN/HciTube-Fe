import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'
import DETAIL_EN from 'src/locales/en/detail.json'
import DETAIL_VI from 'src/locales/vi/detail.json'
import Auth_EN from 'src/locales/en/auth.json'
import Auth_VI from 'src/locales/vi/auth.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    detail: DETAIL_EN,
    auth: Auth_EN
  },
  vi: {
    home: HOME_VI,
    detail: DETAIL_VI,
    auth: Auth_VI
  }
} as const

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'detail', 'auth'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    // Xét thành false bởi vì react nó có khả năng chống xss khi bạn render jsx rồi (không cần dùng tính năng này)
    escapeValue: false // react already safes from xss
  }
})
