import { Link } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { SiSublimetext } from 'react-icons/si'
import { RiVideoLine } from 'react-icons/ri'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { useTranslation } from 'react-i18next'

const AsideBarSub = () => {
  const { showSideBar2xl, showSideBar } = useContext(AppContext)
  const { t } = useTranslation(['home'])
  return (
    <>
      {/* //* scren md lg */}
      {!showSideBar && (
        <div
          className={`mt-3 flex flex-shrink-0 flex-col gap-y-4 transition-all
       delay-100 duration-100 ease-linear max-xl:hidden 2xl:hidden`}
        >
          <div className='flex flex-col'>
            <Link
              to=''
              className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            >
              <IoMdHome className='h-6 w-6 text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>{t('side bar.home')}</span>
            </Link>
          </div>

          <div className='flex flex-col'>
            <Link
              to=''
              className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            >
              <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>{t('side bar.subscriptions')}</span>
            </Link>
          </div>
          <div className='flex flex-col'>
            <Link
              to=''
              className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            >
              <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>{t('side bar.library')}</span>
            </Link>
          </div>
        </div>
      )}

      {/* //* screen 2xl */}
      {!showSideBar2xl && (
        <div
          className={`mt-3 flex flex-shrink-0 flex-col gap-y-4 transition-all duration-1000 ease-linear max-2xl:hidden`}
        >
          <div className='flex flex-col'>
            <Link
              to=''
              className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            >
              <IoMdHome className='h-6 w-6 text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>{t('side bar.home')}</span>
            </Link>
          </div>

          <div className='flex flex-col'>
            <Link
              to=''
              className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            >
              <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>{t('side bar.subscriptions')}</span>
            </Link>
          </div>
          <div className='flex flex-col'>
            <Link
              to=''
              className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            >
              <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>{t('side bar.library')}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default AsideBarSub
