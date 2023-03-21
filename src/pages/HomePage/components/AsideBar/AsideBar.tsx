import { Link, NavLink } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineVideoLibrary, MdOutlineVideoStable } from 'react-icons/md'
import { SiSublimetext } from 'react-icons/si'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { RiVideoLine } from 'react-icons/ri'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { BsYoutube } from 'react-icons/bs'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

const AsideBar = () => {
  const { showSideBar, setShowSideBar, showSideBar2xl, setShowSideBar2xl } = useContext(AppContext)
  const handleCLick = () => {
    setShowSideBar(false)
  }

  const handleClick2xl = () => {
    setShowSideBar2xl(false)
  }
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-30 h-screen w-full bg-[rgba(7,7,7,0.05)] ${
          showSideBar ? 'opacity-1 visible' : 'invisible opacity-0'
        } 2xl:hidden`}
      >
        <div
          className={
            'z-40 flex h-full w-44 flex-shrink-0 flex-col overflow-hidden overflow-y-auto bg-[#0f0f0f] pl-2 pr-2 min-[375px]:w-52 md:w-64'
          }
        >
          <div className='fixed top-0 left-0 z-50 flex h-14 w-52 items-center gap-x-1 bg-[#0f0f0f] pl-2 transition-all'>
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'
              onClick={handleCLick}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                className='h-5 w-5 '
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </button>
            <div className='flex items-center'>
              <Link to='/' className='flex cursor-pointer items-end gap-x-1'>
                <BsYoutube className='h-8 w-8 text-red-600 ' />
                <span className='text-lg font-semibold text-white'>YouTube</span>
              </Link>
            </div>
          </div>
          <NavLink to='' className='mt-14 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <IoMdHome className='h-6 w-6' />
            <span className='text-sm font-medium'>Trang chủ</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <SiSublimetext className='h-6 w-6' />
            <span className='text-sm font-medium'>Short</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <MdOutlineVideoStable className='h-6 w-6' />
            <span className='text-sm font-medium'>Kênh đăng ký</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* */}
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <MdOutlineVideoLibrary className='h-6 w-6' />
            <span className='text-sm font-medium'>Thư viện</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <RxCounterClockwiseClock className='h-6 w-6' />
            <span className='text-sm font-medium'>Video đã xem</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <RiVideoLine className='h-6 w-6' />
            <span className='text-sm font-medium'>Video của bạn</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <AiOutlineClockCircle className='h-6 w-6' />
            <span className='text-sm font-medium'>Xem sau</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <BiLike className='h-6 w-6' />
            <span className='text-sm font-medium'>Video đã thích</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* Kênh đăng ký */}
          <span className='text-sm font-semibold'>Kênh đăng ký</span>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.ggpht.com/ytc/AL5GRJVgvAwa9TWshWQm6YFBeCDE7L-xDkOaHPEW9MSkp1I=s88-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>Duy Luân Dễ Thương</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/7o10-AKkYj75pwWRr4BEW2U0pVkJmHgBBUajnzU3F_Hjq7gyDX4K5T8ugiA5JBscYtGbOrhmgg0=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>Được Dev</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-30 h-screen bg-[rgba(7,7,7,0.5)] max-2xl:hidden ${
          showSideBar2xl ? 'opacity-1 visible' : 'invisible opacity-0'
        }`}
      >
        <div
          className={
            'z-40 flex h-full w-72 flex-shrink-0 flex-col overflow-hidden overflow-y-auto bg-[#0f0f0f] pl-2 pr-2 '
          }
        >
          <div className='fixed top-0 left-0 z-50 flex h-14  items-center gap-x-1 bg-[#0f0f0f] pl-2 transition-all'>
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'
              onClick={handleClick2xl}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                className='h-5 w-5 '
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </button>
            <div className='flex items-center'>
              <Link to='/' className='flex cursor-pointer items-end gap-x-1'>
                <BsYoutube className='h-8 w-8 text-red-600 ' />
                <span className='text-lg font-semibold text-white'>YouTube</span>
              </Link>
            </div>
          </div>
          <NavLink to='' className='mt-14 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <IoMdHome className='h-6 w-6' />
            <span className='text-sm font-medium'>Trang chủ</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <SiSublimetext className='h-6 w-6' />
            <span className='text-sm font-medium'>Short</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <MdOutlineVideoStable className='h-6 w-6' />
            <span className='text-sm font-medium'>Kênh đăng ký</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* */}
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <MdOutlineVideoLibrary className='h-6 w-6' />
            <span className='text-sm font-medium'>Thư viện</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <RxCounterClockwiseClock className='h-6 w-6' />
            <span className='text-sm font-medium'>Video đã xem</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <RiVideoLine className='h-6 w-6' />
            <span className='text-sm font-medium'>Video của bạn</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <AiOutlineClockCircle className='h-6 w-6' />
            <span className='text-sm font-medium'>Xem sau</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <BiLike className='h-6 w-6' />
            <span className='text-sm font-medium'>Video đã thích</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* Kênh đăng ký */}
          <span className='text-sm font-semibold'>Kênh đăng ký</span>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.ggpht.com/ytc/AL5GRJVgvAwa9TWshWQm6YFBeCDE7L-xDkOaHPEW9MSkp1I=s88-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>Duy Luân Dễ Thương</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/7o10-AKkYj75pwWRr4BEW2U0pVkJmHgBBUajnzU3F_Hjq7gyDX4K5T8ugiA5JBscYtGbOrhmgg0=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>Được Dev</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
          <NavLink to='' className='mt-2 flex h-full items-end gap-x-4 rounded-xl px-3 py-2 hover:bg-[#272727]'>
            <img
              src='https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj'
              alt='avatar'
              className='h-6 w-6 rounded-full'
            />
            <span className='text-sm font-medium line-clamp-1'>JavaScipt Mastery</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default AsideBar
