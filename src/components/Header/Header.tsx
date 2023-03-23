/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'
import { AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/context/app.context'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { IoNotificationsOutline } from 'react-icons/io5'
import Popover from '../Popover'
import { HiOutlineBars3, HiOutlineLanguage } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'
import Search from '../Search'

const Header = () => {
  const {
    setShowSideBar,
    setShowSideBar2xl,
    theme,
    setTheme,
    showSideBar,
    showSideBar2xl,
    setShowSearchMobie,
    showSearchMobie
  } = useContext(AppContext)
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const handleClick = () => {
    setShowSideBar(!showSideBar)
    setShowSideBar2xl(!showSideBar2xl)
  }

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const handleChangeLanguage = () => {
    if (i18n.language === 'en') {
      changeLanguage('vi')
      localStorage.setItem('language', 'vi')
    } else {
      changeLanguage('en')
      localStorage.setItem('language', 'en')
    }
  }

  useEffect(() => {
    const language = localStorage.getItem('language')
    if (language) {
      changeLanguage(language as 'en' | 'vi')
    }
  }, [])

  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const handleShowSearchMobie = () => {
    setShowSearchMobie(true)
  }

  return (
    <>
      {!showSearchMobie && (
        <div className='color-[#0f0f0f] container sticky top-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-between bg-[#ffffff] pl-2 pr-2 shadow drop-shadow dark:bg-[#0f0f0f] md:h-20'>
          <div className='flex items-center gap-x-1'>
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10 '
              onClick={handleClick}
            >
              <HiOutlineBars3 className='h-5 w-5 text-black dark:text-white' />
            </button>

            {/* //* Trang chu Youtube */}
            <Popover
              className='flex items-center '
              renderPopover={
                <span className='relative z-50 mt-3 block h-full rounded-lg bg-gray-500 px-2 py-1 text-[11px] font-semibold md:mt-5 md:px-2 md:py-2 md:text-xs'>
                  Trang chủ YouTube
                </span>
              }
            >
              <Link to='/' className='flex cursor-pointer items-end gap-x-1 xl:ml-2'>
                <BsYoutube className='h-8 w-8 text-red-600 ' />
                <span className='text-lg font-semibold text-black dark:text-white'>YouTube</span>
              </Link>
            </Popover>
          </div>

          {/* //* search */}
          <Search />

          {/* //* group */}
          <div className='flex items-center gap-x-1 md:gap-x-4'>
            {/* //* searchMobie */}
            <Popover
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] md:hidden '
              renderPopover={
                <span className='relative z-50 mt-3 block h-full rounded-lg bg-gray-500 px-2 py-1 text-[11px] font-semibold'>
                  Tìm kiếm
                </span>
              }
              handleClick={handleShowSearchMobie}
            >
              <AiOutlineSearch className='h-6 w-6 text-black dark:text-white' />
            </Popover>

            {/* //* upload */}
            <Popover
              className=' flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-lg:hidden lg:h-10 lg:w-10  '
              renderPopover={
                <span className='relative z-50 mt-3 block h-full rounded-lg bg-gray-500 px-2 py-1 text-[11px] font-semibold md:mt-5 md:px-2 md:py-2 md:text-xs'>
                  Tạo
                </span>
              }
            >
              <AiOutlineUpload className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </Popover>

            {/* //* inform */}
            <Popover
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
              renderPopover={
                <span className='z-50 mt-5 block h-full rounded-lg bg-gray-500 px-2 py-2 text-xs font-semibold'>
                  Thông báo
                </span>
              }
            >
              <IoNotificationsOutline className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </Popover>

            <Popover
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
              handleClick={handleChangeLanguage}
              renderPopover={
                <span className='z-50 mt-5 block h-full rounded-lg bg-gray-500 px-2 py-2 text-xs font-semibold'>
                  {currentLanguage}
                </span>
              }
            >
              <HiOutlineLanguage className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </Popover>

            <Popover
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
              renderPopover={
                <span className='z-50 mt-5 block h-full rounded-lg bg-gray-500 px-2 py-2 text-xs font-semibold'>
                  Chế độ xem
                </span>
              }
              handleClick={handleChangeTheme}
            >
              {theme === 'dark' ? (
                <MdLightMode className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
              ) : (
                <MdDarkMode className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
              )}
            </Popover>

            {/* //* avatar */}
            <div className=' h-9 w-9 rounded-full lg:h-10 lg:w-10'>
              <img
                src='https://cdn.pixabay.com/photo/2022/09/24/16/32/bulldog-7476727_960_720.jpg'
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
