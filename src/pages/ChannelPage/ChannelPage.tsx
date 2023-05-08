/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { convertNumberToDisplayString } from 'src/utils/utils'
import AsideBar from '../HomePage/components/AsideBar'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import classNames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import parse from 'html-react-parser'

import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import { AppContext } from 'src/context/app.context'
import { useMutation, useQuery } from 'react-query'
import playListAPI from 'src/api/playlist.api'
import Skeleton from 'src/components/Skeleton'
import { subscriberApi } from 'src/api/subscriber.api'
import { toast } from 'react-toastify'
import { setProfileToLocalStorage } from 'src/utils/auth'

const ChannelPage = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]
  const [choose, setChoose] = useState<string>(location.pathname.split('/')[2])
  const swiperRef = useRef<SwiperRef>(null)
  const [isBeginning, setIsBeginning] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const { profile, setProfile, isVerify } = useContext(AppContext)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    data: profileData,
    isLoading,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['channelProfile', id],
    queryFn: () => playListAPI.getChannelById(id)
  })

  const deleteSubscribeChannelMutation = useMutation({
    mutationFn: () =>
      subscriberApi.deleteSubscribeChannel({
        channel: id
      }),
    onSuccess: (data) => {
      toast.dismiss()
      toast.success('Hủy đăng ký kênh thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
      refetch()
    }
  })

  const subscribeChannelMutation = useMutation({
    mutationFn: () =>
      subscriberApi.subscribeChannel({
        channel: id
      }),
    onSuccess: (data) => {
      toast.dismiss()
      toast.success('Đăng ký kênh thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      console.log('dataFolloing:', data.data.data.user)
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
      refetch()
    }
  })

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const handleSwiper = (swiper: any) => {
    setIsBeginning(swiper.activeIndex === 0)
    if (innerWidth < 325) setIsEnd(swiper.activeIndex === swiper.slides.length - 1)
    if (innerWidth >= 325 && innerWidth < 640) setIsEnd(swiper.activeIndex === swiper.slides.length - 2)
    if (innerWidth >= 640 && innerWidth < 765) setIsEnd(swiper.activeIndex === swiper.slides.length - 3)
    if (innerWidth >= 765) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 4)
    }
  }

  useEffect(() => {
    if (profileData) {
      const isSubscribed = profileData.data.data.subscribers?.findIndex((item) => item._id === profile?.id)
      if (isSubscribed !== -1) {
        setIsSubscribed(true)
      } else {
        setIsSubscribed(false)
      }
    }
  }, [profileData, profile?.id])

  console.log(isBeginning, isEnd)

  const handleSubscribe = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    subscribeChannelMutation.mutate()
  }
  const handleUnSubscribe = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    deleteSubscribeChannelMutation.mutate()
  }

  return (
    <div className='container flex gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
      <AsideBar />
      {isLoading && (
        <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
          <Skeleton className='h-52 w-full' />
          <div className='flex w-full justify-between gap-y-2 px-10 pt-4 pb-1 max-sm:flex-col md:px-20 lg:px-40'>
            <div className='flex flex-1 items-start justify-start gap-x-5 pt-2'>
              <Skeleton className='h-32 w-32 flex-shrink-0 rounded-full max-lg:h-24 max-lg:w-24 max-[320px]:h-20 max-[320px]:w-20' />
              <div className='flex flex-1 flex-row justify-between  max-sm:flex-col max-sm:items-start max-sm:gap-y-5'>
                <div className='flex flex-col gap-y-5'>
                  <Skeleton className='h-5 w-52 rounded-lg' />
                  <div className='flex items-center gap-x-4'>
                    <Skeleton className='h-5 w-20 rounded-lg' />
                    <Skeleton className='h-5 w-20 rounded-lg' />
                  </div>
                  <Skeleton className='h-5 w-52 rounded-lg' />
                </div>
              </div>
            </div>
            <Skeleton className='h-8 w-32 rounded-lg max-sm:w-full' />
          </div>
        </div>
      )}
      {isSuccess && (
        <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
          <div className='h-52 w-full'>
            <img
              src={profileData?.data?.data?.thumbnail}
              alt='thumbnail'
              className='h-full w-full rounded object-cover'
            />
          </div>
          <div className='flex w-full justify-between gap-y-2 px-10 pt-4 pb-1 max-sm:flex-col md:px-20 lg:px-40'>
            <div className='flex flex-1 items-start justify-start gap-x-5 pt-2'>
              <div className='h-32 w-32 rounded-full max-lg:h-24 max-lg:w-24 max-[320px]:h-20 max-[320px]:w-20'>
                <img
                  src={profileData?.data?.data.avatar}
                  alt='avatar'
                  className='h-full w-full flex-shrink-0 rounded-full object-cover'
                />
              </div>

              <div className='flex flex-1 flex-row justify-between  max-sm:flex-col max-sm:items-start max-sm:gap-y-5'>
                <div className='flex flex-col gap-y-2'>
                  <span className='text-base font-semibold text-black dark:text-white md:text-lg'>
                    {profileData?.data?.data?.fullName}
                  </span>
                  <div className='flex items-center gap-x-4'>
                    <span className='text-xs font-semibold text-[#8e8883] md:text-sm'>
                      {convertNumberToDisplayString(profileData?.data?.data.subscribers?.length as number)} người đăng
                      ký
                    </span>
                    {/* <span className='text-xs font-semibold text-[#8e8883] md:text-sm'>
                      {convertNumberToDisplayString(254)} video
                    </span> */}
                  </div>
                  <NavLink
                    to={`/${id}/about`}
                    className='flex items-center gap-x-2 text-xs font-semibold text-[#8e8883] md:text-sm'
                    onClick={() => setChoose('about')}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: String(parse((profileData?.data?.data?.description as string) || ''))
                      }}
                    ></span>
                    <AiOutlineRight className='h-4 w-4 text-black dark:text-white' />
                  </NavLink>
                </div>

                {profileData.data.data.id === profile?._id && (
                  <div className='flex flex-wrap items-center gap-3'>
                    <Link
                      to={path.profile}
                      className='rounded-xl bg-[#f2f2f2] p-2 text-xs font-semibold text-black dark:bg-[#272727] dark:text-white md:text-sm'
                    >
                      Tùy chỉnh kênh
                    </Link>
                    <Link
                      to={path.content}
                      className='rounded-xl bg-[#f2f2f2] p-2 text-xs font-semibold text-black dark:bg-[#272727] dark:text-white md:text-sm'
                    >
                      Quản lý video
                    </Link>
                  </div>
                )}

                {profileData?.data.data.id !== profile?.id &&
                  (isSubscribed ? (
                    <button
                      className='flex h-fit items-center gap-x-2 rounded-2xl bg-[#f2f2f2] py-2 px-4 text-xs font-semibold dark:bg-[#272727] dark:text-white max-sm:px-3 max-sm:py-1 md:text-sm'
                      onClick={handleUnSubscribe}
                    >
                      <IoMdNotificationsOutline className='h-6 w-6 text-black dark:text-white' />
                      Đã đăng ký
                    </button>
                  ) : (
                    <button
                      className='flex h-fit items-center gap-x-2 rounded-2xl bg-[#0f0f0f] py-2 px-4 text-xs font-semibold  text-white dark:bg-[#f1f1f1] dark:text-black max-sm:px-3 max-sm:py-1 md:text-sm'
                      onClick={handleSubscribe}
                    >
                      Đăng ký
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className='relative mt-5  flex max-w-full border-b border-b-gray-500 md:px-20 lg:px-40  '>
            <button
              className={`absolute bottom-2 left-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full  text-xs hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] md:hidden lg:h-10 lg:w-10 ${
                isBeginning ? 'invisible' : 'visible'
              } `}
              onClick={goPrev}
            >
              <AiOutlineLeft className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </button>

            <Swiper
              pagination={false}
              modules={[Pagination]}
              className='max-md:mx-auto max-md:w-5/6'
              ref={swiperRef}
              onSlideChange={(swiper) => {
                handleSwiper(swiper)
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1
                },
                325: {
                  slidesPerView: 2
                },
                640: {
                  slidesPerView: 3
                },
                765: {
                  slidesPerView: 4
                }
              }}
            >
              <SwiperSlide>
                {' '}
                <NavLink
                  to={`/${id}/channel`}
                  className={classNames(`whitespace-nowrap py-3 px-8 text-xs font-bold  md:text-sm`, {
                    'border-b-2 border-b-black font-bold text-black dark:border-b-white dark:text-white ':
                      choose === 'channel',
                    'text-gray-500 ': choose !== 'channel'
                  })}
                  type='button'
                  onClick={() => setChoose('channel')}
                >
                  TRANG CHỦ
                </NavLink>
              </SwiperSlide>

              <SwiperSlide>
                {' '}
                <NavLink
                  to={`/${id}/video`}
                  className={classNames(`whitespace-nowrap py-3 px-8 text-xs font-bold md:text-sm`, {
                    'border-b-2 border-b-black font-bold text-black dark:border-b-white dark:text-white':
                      choose === 'video',
                    'text-gray-500': choose !== 'video'
                  })}
                  type='button'
                  onClick={() => setChoose('video')}
                >
                  VIDEO
                </NavLink>
              </SwiperSlide>
              <SwiperSlide>
                <NavLink
                  to={`/${id}/playlist`}
                  className={classNames(`whitespace-nowrap py-3 px-8 text-xs font-bold  md:text-sm`, {
                    'border-b-2 border-b-black font-bold text-black dark:border-b-white dark:text-white':
                      choose === 'playlist',
                    'text-gray-500': choose !== 'playlist'
                  })}
                  type='button'
                  onClick={() => setChoose('playlist')}
                >
                  DANH SÁCH PHÁT
                </NavLink>
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <NavLink
                  to={`${id}/about`}
                  className={classNames(`whitespace-nowrap py-3 px-8 text-xs font-bold  md:text-sm`, {
                    'border-b-2 border-b-black font-bold text-black dark:border-b-white dark:text-white':
                      choose === 'about',
                    'text-gray-500': choose !== 'about'
                  })}
                  type='button'
                  onClick={() => setChoose('about')}
                >
                  GIỚI THIỆU
                </NavLink>
              </SwiperSlide>
            </Swiper>

            <button
              className={`absolute bottom-2 right-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full  text-xs hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] md:hidden lg:h-10 lg:w-10 ${
                isEnd ? 'invisible' : 'visible'
              } `}
              onClick={goNext}
            >
              <AiOutlineRight className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </button>
          </div>

          <Outlet />
        </div>
      )}
    </div>
  )
}

export default ChannelPage
