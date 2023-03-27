import { NavLink } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineVideoLibrary, MdOutlineVideoStable } from 'react-icons/md'
import { SiSublimetext } from 'react-icons/si'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { RiVideoLine } from 'react-icons/ri'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { useTranslation } from 'react-i18next'

const AsideBar = () => {
  const { showSideBar, showSideBar2xl, setShowSideBar } = useContext(AppContext)
  const { t } = useTranslation(['home'])

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-30 h-full lg:left-6   ${
          showSideBar
            ? 'w-full overflow-y-auto overflow-x-hidden bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(7,7,7,0.2)]'
            : 'w-0 overflow-hidden bg-[#ffffff] dark:bg-[#0f0f0f]'
        } overflow-x-hidden transition-all duration-500 ease-linear 2xl:hidden`}
        role='presentation'
      >
        <div
          className={`flex h-full flex-shrink-0 flex-col bg-[#ffffff]  transition-all dark:bg-[#0f0f0f] ${
            showSideBar
              ? 'w-44 overflow-y-auto overflow-x-hidden pl-2 pr-2 min-[375px]:w-52 md:w-64'
              : ' w-0 overflow-hidden pl-0 pr-0'
          } relative z-50 duration-200 ease-in-out`}
        >
          <NavLink
            to=''
            className='mt-16 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727] md:mt-20'
          >
            <IoMdHome className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.home')}</span>
          </NavLink>

          <NavLink
            to=''
            className='mt-2 flex items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <MdOutlineVideoStable className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'> {t('side bar.subscriptions')}</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* */}
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'> {t('side bar.library')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <RxCounterClockwiseClock className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.history')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.your videos')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <AiOutlineClockCircle className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.watch later')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <BiLike className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.liked videos')}</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* Kênh đăng ký */}
          <span className='text-sm font-semibold text-black dark:text-white'>{t('side bar.subscriptions')}</span>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.ggpht.com/ytc/AL5GRJVgvAwa9TWshWQm6YFBeCDE7L-xDkOaHPEW9MSkp1I=s88-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full text-black dark:text-white'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>Duy Luân Dễ Thương</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>Hello everyone</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>Hello world</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>Xin chao</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>JavaScipt Mastery</span>
          </NavLink>
        </div>
      </div>

      {showSideBar && (
        <div
          className='sidebar-overlay fixed top-14 right-0 z-40 h-full bg-transparent '
          onClick={() => setShowSideBar(false)}
          role='presentation'
        ></div>
      )}

      {/* //* 2xl sreen */}
      {showSideBar2xl && (
        <div className='fixed top-14 left-6 bottom-0 w-60 flex-shrink-0 overflow-y-auto transition-all duration-1000 ease-linear max-2xl:hidden'>
          <NavLink
            to=''
            className='mt-5 flex items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <IoMdHome className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.home')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <MdOutlineVideoStable className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.subscriptions')}</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.library')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <RxCounterClockwiseClock className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.history')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.your videos')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <AiOutlineClockCircle className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.watch later')}</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <BiLike className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-medium text-black dark:text-white'>{t('side bar.liked videos')}</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          <span className='pl-2 text-sm font-semibold text-black dark:text-white'>{t('side bar.subscriptions')}</span>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.ggpht.com/ytc/AL5GRJVgvAwa9TWshWQm6YFBeCDE7L-xDkOaHPEW9MSkp1I=s88-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>Duy Luân Dễ Thương</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/7o10-AKkYj75pwWRr4BEW2U0pVkJmHgBBUajnzU3F_Hjq7gyDX4K5T8ugiA5JBscYtGbOrhmgg0=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>Được Dev</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink
            to=''
            className='mt-2 flex  items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium text-black line-clamp-1 dark:text-white'>JavaScipt Mastery</span>
          </NavLink>
        </div>
      )}
    </>
  )
}

export default AsideBar
