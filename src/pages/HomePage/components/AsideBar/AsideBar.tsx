import { Link, NavLink } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineVideoLibrary, MdOutlineVideoStable } from 'react-icons/md'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { RiVideoLine } from 'react-icons/ri'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import path from 'src/constants/path'
import { HiOutlineUserCircle } from 'react-icons/hi'

const AsideBar = () => {
  const { showSideBar, setShowSideBar, isVerify, profile } = useContext(AppContext)

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-30 h-full lg:left-6   ${
          showSideBar
            ? 'w-full overflow-y-auto overflow-x-hidden bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(7,7,7,0.2)]'
            : 'w-0 overflow-hidden bg-[#ffffff] dark:bg-[#0f0f0f]'
        } overflow-x-hidden transition-all duration-300 ease-linear 2xl:hidden`}
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
            to={path.home}
            className='mt-16 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727] md:mt-20'
          >
            <IoMdHome className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Trang chủ</span>
          </NavLink>

          <NavLink
            to=''
            className=' flex items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <MdOutlineVideoStable className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'> Kênh đăng ký</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* */}
          <NavLink
            to={path.library}
            className=' flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'> Thư viện</span>
          </NavLink>
          <NavLink
            to=''
            className=' flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <RxCounterClockwiseClock className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Video đã xem</span>
          </NavLink>
          {isVerify === '2' && (
            <NavLink
              to={path.content}
              className=' flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            >
              <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
              <span className='text-sm font-semibold text-black dark:text-white'>Video của bạn</span>
            </NavLink>
          )}

          <NavLink
            to=''
            className=' flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <AiOutlineClockCircle className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Xem sau</span>
          </NavLink>
          <NavLink
            to={path.likedPlaylist}
            className=' flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <BiLike className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Video đã thích</span>
          </NavLink>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* Kênh đăng ký */}
          {isVerify === '2' && (
            <>
              {' '}
              <span className='text-sm font-semibold text-black dark:text-white'>Kênh đăng ký</span>
              {(profile?.followings?.length as number) > 0 &&
                profile?.followings?.map((item, index) => (
                  <NavLink
                    to={`${item.id}/channel`}
                    className=' flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
                    key={item._id}
                  >
                    <img src={item.avatar} alt='avatar' className='h-6 w-6 rounded-full text-black dark:text-white' />
                    <span className='text-sm font-semibold text-black line-clamp-1 dark:text-white'>
                      {item.fullName}
                    </span>
                  </NavLink>
                ))}
              {(profile?.followings?.length as number) === 0 && (
                <div className='my-5 flex w-full items-center justify-center'>
                  <span className='text-sm font-semibold text-black dark:text-white'>Bạn chưa đăng ký kênh nào</span>
                </div>
              )}
            </>
          )}

          {isVerify !== '2' && (
            <div className='my-5 flex w-full flex-col items-center justify-center gap-y-5'>
              <span className='text-sm font-semibold text-black dark:text-white'>
                Hãy đăng nhập để thích video, bình luận và đăng ký kênh.
              </span>
              <Link
                to={path.login}
                className='flex flex-shrink-0 items-center justify-between gap-x-2 rounded-xl border border-[#2c2c2c] py-1 px-2 transition-all  ease-linear hover:bg-blue-100 '
              >
                <HiOutlineUserCircle className='h-5 w-5 text-[#4b91df]  lg:h-6 lg:w-6' />
                <span className='text-xs font-medium text-[#4b91df] md:text-sm'>Đăng nhập</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {showSideBar && (
        <div
          className='sidebar-overlay fixed top-14 right-0 z-40 h-full bg-transparent '
          onClick={() => setShowSideBar(false)}
          role='presentation'
        ></div>
      )}

      <div className='fixed top-14 left-[calc(100vw-1536px)/2] bottom-0 w-60 flex-shrink-0 overflow-y-auto p-3 transition-all duration-1000 ease-linear max-2xl:hidden'>
        <NavLink
          to={path.home}
          className=' flex items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
        >
          <IoMdHome className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Trang chủ</span>
        </NavLink>
        <NavLink
          to=''
          className='mt-2 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
        >
          <MdOutlineVideoStable className='mr- h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Kênh đăng ký</span>
        </NavLink>
        <div className='my-4 mx-2 border-t border-t-gray-600' />

        <NavLink
          to={path.library}
          className='mt-2 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
        >
          <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Thư viện</span>
        </NavLink>
        <NavLink
          to=''
          className='mt-2 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
        >
          <RxCounterClockwiseClock className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Video đã xem</span>
        </NavLink>
        {isVerify === '2' && (
          <NavLink
            to={path.content}
            className='mt-2 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
          >
            <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Video của bạn</span>
          </NavLink>
        )}

        <NavLink
          to=''
          className='mt-2 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
        >
          <AiOutlineClockCircle className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Video xem sau</span>
        </NavLink>
        <NavLink
          to={path.likedPlaylist}
          className='mt-2 flex items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
        >
          <BiLike className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Video đã thích</span>
        </NavLink>
        <div className='my-4 mx-2 border-t border-t-gray-600' />

        {isVerify === '2' && (
          <>
            {' '}
            <span className='pl-2 text-sm font-semibold text-black dark:text-white'>Kênh đăng ký</span>
            {(profile?.followings?.length as number) > 0 &&
              profile?.followings?.map((item, index) => (
                <NavLink
                  to={`${item.id}/channel`}
                  className='mt-2 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
                  key={item.id}
                >
                  <img src={item.avatar} alt='avatar' className='h-6 w-6 rounded-full' />
                  <span className='text-sm font-semibold text-black line-clamp-1 dark:text-white'>{item.fullName}</span>
                </NavLink>
              ))}
            {(profile?.followings?.length as number) === 0 && (
              <div className='my-5 flex w-full items-center justify-center'>
                <span className='text-sm font-semibold text-black dark:text-white'>Bạn chưa đăng ký kênh nào</span>
              </div>
            )}
          </>
        )}
        {isVerify !== '2' && (
          <div className='my-5 flex w-full flex-col items-center justify-center gap-y-5'>
            <span className='text-sm font-semibold text-black dark:text-white'>
              Hãy đăng nhập để thích video, bình luận và đăng ký kênh.
            </span>
            <Link
              to={path.login}
              className='flex flex-shrink-0 items-center justify-between gap-x-2 rounded-xl border border-[#2c2c2c] py-1 px-2 transition-all  ease-linear hover:bg-blue-100 '
            >
              <HiOutlineUserCircle className='h-5 w-5 text-[#4b91df]  lg:h-6 lg:w-6' />
              <span className='text-xs font-medium text-[#4b91df] md:text-sm'>Đăng nhập</span>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default AsideBar
