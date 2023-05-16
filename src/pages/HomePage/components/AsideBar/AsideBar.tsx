import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineVideoLibrary, MdOutlineVideoStable } from 'react-icons/md'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { RiVideoLine } from 'react-icons/ri'
import { BiLike } from 'react-icons/bi'
import { useContext, useState } from 'react'
import { AppContext } from 'src/context/app.context'
import path from 'src/constants/path'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'
import classNames from 'classnames'

const AsideBar = () => {
  const { showSideBar, setShowSideBar, isVerify, profile } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const url = location.pathname.split('/')[1]
  const [isCheck, setIsCheck] = useState<string>(url)

  const handleClickSubscribe = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để sử dụng trang này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate(path.login)
      return
    }
    setIsCheck(url)
    navigate(path.subscriptions)
  }

  const handleClickLibrary = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để sử dụng trang này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate(path.login)
      return
    }
    setIsCheck(url)
    navigate(path.library)
  }

  const handleClickHistory = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để sử dụng trang này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate(path.login)
      return
    }
    setIsCheck(url)
    navigate(path.history)
  }

  const handleClickVideoManager = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để sử dụng trang này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate(path.login)
      return
    }
    navigate(path.content)
  }

  const handleClickVideoFavorite = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để sử dụng trang này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate(path.login)
      return
    }
    setIsCheck(url)
    navigate(path.likedPlaylist)
  }
  // bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(7,7,7,0.2)]
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-30  h-full drop-shadow-md  ${
          showSideBar
            ? 'w-full overflow-y-auto overflow-x-hidden '
            : 'w-0 overflow-hidden'
        } overflow-x-hidden transition-all duration-200 ease-linear 2xl:hidden`}
        role='presentation'
      >
        <div
          className={`flex h-full flex-shrink-0 flex-col bg-[#ffffff] lg:px-5 py-2 transition-all dark:bg-[#0f0f0f] ${
            showSideBar
              ? 'w-44 overflow-y-auto overflow-x-hidden min-[375px]:w-52 md:w-64 mt-14 md:mt-16'
              : ' w-0 overflow-hidden pl-0 pr-0'
          } relative z-50 duration-200 ease-in-out`}
        >
          <button
            onClick={() => navigate('/')}
            className={classNames(
              'flex w-full items-end gap-x-6 lg:rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
              {
                'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === ''
              }
            )}
          >
            <IoMdHome className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Trang chủ</span>
          </button>

          <button
            className={classNames(
              'flex w-full items-end gap-x-6 lg:rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
              {
                'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'subscriptions'
              }
            )}
            onClick={handleClickSubscribe}
          >
            <MdOutlineVideoStable className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'> Kênh đăng ký</span>
          </button>

          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* */}
          <button
            className={classNames(
              'flex w-full items-end gap-x-6 lg:rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
              {
                'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'library'
              }
            )}
            onClick={handleClickLibrary}
          >
            <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'> Thư viện</span>
          </button>
          <button
            onClick={handleClickHistory}
            className={classNames(
              'flex w-full items-end gap-x-6 lg:rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
              {
                'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'history'
              }
            )}
          >
            <RxCounterClockwiseClock className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Video đã xem</span>
          </button>

          <button
            onClick={handleClickVideoManager}
            className={classNames(
              'flex w-full items-end gap-x-6 lg:rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
            )}
          >
            <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Video của bạn</span>
          </button>

          <button
            onClick={handleClickVideoFavorite}
            className={classNames(
              'flex w-full items-end gap-x-6 lg:rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
              {
                'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'liked-playlist'
              }
            )}
          >
            <BiLike className='h-6 w-6 text-black dark:text-white' />
            <span className='text-sm font-semibold text-black dark:text-white'>Video đã thích</span>
          </button>
          <div className='my-4 mx-2 border-t border-t-gray-600' />

          {/* //* Kênh đăng ký */}
          {isVerify === '2' && (
            <>
              {' '}
              <span className='px-3 text-sm font-bold text-black dark:text-white'>Kênh đăng ký</span>
              {(profile?.followings?.length as number) > 0 &&
                profile?.followings?.map((item, index) => (
                  <Link
                    to={`/${item.id}/channel`}
                    className=' flex  items-end gap-x-6 lg:rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
                    key={item._id}
                  >
                    <img src={item.avatar} alt='avatar' className='h-6 w-6 rounded-full text-black dark:text-white' />
                    <span className='text-sm font-semibold text-black line-clamp-1 dark:text-white'>
                      {item.fullName}
                    </span>
                  </Link>
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
                className='flex flex-shrink-0 items-center justify-between gap-x-2 lg:rounded-xl border border-[#2c2c2c] py-1 px-2 transition-all  ease-linear hover:bg-blue-100 '
              >
                <HiOutlineUserCircle className='h-5 w-5 text-[#4b91df]  lg:h-6 lg:w-6' />
                <span className='text-xs font-medium text-[#4b91df] md:text-sm'>Đăng nhập</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {
        showSideBar && (
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.4)] z-20"></div>
        )
      }


      {showSideBar && (
        <div
          className='sidebar-overlay fixed top-14 right-0 z-40 h-full bg-transparent '
          onClick={() => setShowSideBar(false)}
          role='presentation'
        ></div>
      )}

      <div className='fixed top-14 left-[calc(100vw-1536px)/2] bottom-0 w-60 flex-shrink-0 overflow-y-auto py-4 px-6 transition-all duration-1000 ease-linear max-2xl:hidden'>
        <button
          onClick={() => navigate('/')}
          className={classNames(
            'flex w-full items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
            {
              'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === ''
            }
          )}
        >
          <IoMdHome className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Trang chủ</span>
        </button>
        <button
          onClick={handleClickSubscribe}
          className={classNames(
            'flex w-full items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
            {
              'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'subscriptions'
            }
          )}
        >
          <MdOutlineVideoStable className='mr- h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Kênh đăng ký</span>
        </button>
        <div className='my-4 mx-2 border-t border-t-gray-600' />

        <button
          onClick={handleClickLibrary}
          className={classNames(
            'flex w-full items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
            {
              'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'library'
            }
          )}
        >
          <MdOutlineVideoLibrary className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Thư viện</span>
        </button>
        <button
          onClick={handleClickHistory}
          className={classNames(
            'flex w-full items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
            {
              'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'history'
            }
          )}
        >
          <RxCounterClockwiseClock className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Video đã xem</span>
        </button>

        <button
          onClick={handleClickVideoManager}
          className='mt-2 flex  w-full items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
        >
          <RiVideoLine className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Video của bạn</span>
        </button>

        <button
          onClick={handleClickVideoFavorite}
          className={classNames(
            'flex w-full items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]',
            {
              'bg-[#f2f2f2] dark:bg-[#272727]': isCheck === 'liked-playlist'
            }
          )}
        >
          <BiLike className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white'>Video đã thích</span>
        </button>
        <div className='my-4 mx-2 border-t border-t-gray-600' />

        {isVerify === '2' && (
          <>
            {' '}
            <span className='pl-2 text-sm font-semibold text-black dark:text-white'>Kênh đăng ký</span>
            {(profile?.followings?.length as number) > 0 &&
              profile?.followings?.map((item, index) => (
                <Link
                  to={`/${item.id}/channel`}
                  className='mt-2 flex  items-end gap-x-6 rounded-xl px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
                  key={item.id}
                >
                  <img src={item.avatar} alt='avatar' className='h-6 w-6 rounded-full' />
                  <span className='text-sm font-semibold text-black line-clamp-1 dark:text-white'>{item.fullName}</span>
                </Link>
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
