/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { HiOutlineBars3 } from 'react-icons/hi2'
import Search from './components/Search'
import LightLogo from 'src/assets/logo-light.svg'
import DarkLogo from 'src/assets/logo-dark.svg'
import ToolTip from '../ToolTip'
import Inform from './components/Inform'
import ChangeTheme from './components/ChangeTheme'
import path from 'src/constants/path'
import AvatarProfile from './components/AvatarProfile'

const Header = () => {
  const { setShowSideBar, showSideBar, setShowSearchMobie, showSearchMobie, isVerify, theme } = useContext(AppContext)

  const handleClick = () => {
    setShowSideBar(!showSideBar)
  }

  const handleShowSearchMobie = () => {
    setShowSearchMobie(true)
  }

  return (
    <>
      {!showSearchMobie && (
        <div className='color-[#0f0f0f] container sticky top-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-between bg-white pl-2 pr-2 shadow-sm dark:bg-[#0f0f0f] md:h-16 lg:px-8'>
          <div className='flex items-center gap-x-1'>
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10 2xl:hidden '
              onClick={handleClick}
            >
              <HiOutlineBars3 className='h-5 w-5 text-black dark:text-white' />
            </button>

            {/* //* Trang chu Youtube */}
            {/* <ToolTip position='bottom' content={t('side bar.youtube home')}>
              <Link to='/' className='flex cursor-pointer items-end gap-x-1 xl:ml-2'>
                <BsYoutube className='h-6 w-6 text-red-600 md:h-8 md:w-8' />
                <span className='text-base font-semibold text-black dark:text-white md:text-lg'>YouTube</span>
              </Link>
            </ToolTip> */}
            <Link to='/' className='flex cursor-pointer xl:ml-2'>
              {theme == 'Dark' ? <img src={DarkLogo} alt='Logo HciTube' /> : <img src={LightLogo} alt='Logo HciTube' />}
            </Link>
          </div>

          {/* //* search */}
          <Search />

          {/* //* group */}
          <div className='flex items-center gap-x-1 md:gap-x-4'>
            {/* //* searchMobie */}

            <ToolTip position='bottom' content='Tìm kiếm'>
              <button
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] md:hidden '
                onClick={handleShowSearchMobie}
              >
                <AiOutlineSearch className='h-6 w-6 text-black dark:text-white' />
              </button>
            </ToolTip>

            {/* //* upload */}
            {isVerify === '2' && (
              <>
                <ToolTip position='bottom' content='Tạo'>
                  <Link
                    to={path.upload}
                    className=' flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-lg:hidden lg:h-10 lg:w-10'
                  >
                    <AiOutlineUpload className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
                  </Link>
                </ToolTip>

                {/* //* inform */}
                <Inform />
              </>
            )}

            {/* //* Change theme */}
            <ChangeTheme />

            {/* //* avatar */}
            {isVerify === '2' && <AvatarProfile />}

            {isVerify !== '2' && (
              <Link
                to={path.login}
                className='flex flex-shrink-0 items-center justify-between gap-x-2 rounded-xl border border-[#2c2c2c] py-1 px-2 transition-all  ease-linear hover:bg-blue-100 '
              >
                <HiOutlineUserCircle className='h-5 w-5 text-[#4b91df]  lg:h-6 lg:w-6' />
                <span className='text-xs font-medium text-[#4b91df] md:text-sm'>Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header
