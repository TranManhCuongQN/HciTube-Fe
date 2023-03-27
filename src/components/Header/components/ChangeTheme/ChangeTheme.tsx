import React, { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import ToolTip from 'src/components/ToolTip'
import { useTranslation } from 'react-i18next'

const ChangeTheme = () => {
  const { theme, setTheme } = useContext(AppContext)
  const { t } = useTranslation(['home'])
  const handleChangeTheme = () => {
    if (theme === 'Light') {
      setTheme('Dark')
    } else {
      setTheme('Light')
    }
  }
  return (
    <>
      <ToolTip position='bottom' content={t('side bar.appearance') + `${theme}`}>
        <button
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
          onClick={handleChangeTheme}
        >
          {theme === 'Dark' ? (
            <MdDarkMode className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          ) : (
            <MdLightMode className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          )}
        </button>
      </ToolTip>
    </>
  )
}

export default ChangeTheme
