import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineLanguage } from 'react-icons/hi2'
import ToolTip from 'src/components/ToolTip'
import { locales } from 'src/i18n/i18n'

const ChangeLanguage = () => {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    const language = localStorage.getItem('language')
    if (language) {
      changeLanguage(language as 'en' | 'vi')
    }
  }, [])

  const handleChangeLanguage = () => {
    if (i18n.language === 'en') {
      changeLanguage('vi')
      localStorage.setItem('language', 'vi')
    } else {
      changeLanguage('en')
      localStorage.setItem('language', 'en')
    }
  }

  const { t } = useTranslation(['home'])
  return (
    <>
      <ToolTip position='bottom' content={t('side bar.language') + `${currentLanguage}`}>
        <button
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
          onClick={handleChangeLanguage}
        >
          <HiOutlineLanguage className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
        </button>
      </ToolTip>
    </>
  )
}

export default ChangeLanguage
