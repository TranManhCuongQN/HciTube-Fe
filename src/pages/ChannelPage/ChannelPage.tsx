/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import path from 'src/constants/path'
import { convertNumberToDisplayString } from 'src/utils/utils'
import AsideBar from '../HomePage/components/AsideBar'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'

const ChannelPage = () => {
  const location = useLocation()
  console.log(location.pathname.replace('/', ''))
  const [choose, setChoose] = useState<string>(location.pathname.replace('/', ''))
  const swiperRef = useRef<SwiperRef>(null)
  const [isBeginning, setIsBeginning] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(false)

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

  console.log(isBeginning, isEnd)

  return (
    <div className='container flex gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
      <AsideBar />
      <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
        <div className='h-52 w-full'>
          <img
            src='https://i.pinimg.com/564x/17/3f/fc/173ffca741ea25ef06278e74ddf89ff0.jpg'
            alt='thumbnail'
            className='h-full w-full rounded object-cover'
          />
        </div>
        <div className='pt-4 pb-1 flex w-full px-10 justify-between gap-y-2 max-sm:flex-col md:px-20 lg:px-40'>
          <div className='flex flex-1 justify-start items-start gap-x-5 pt-2'>
            <div className='h-32 w-32 rounded-full max-lg:h-24 max-lg:w-24 max-[320px]:h-20 max-[320px]:w-20'>
              <img
                src='https://i.pinimg.com/736x/47/ce/d6/47ced656facf572c471fde541c60faa8.jpg'
                alt='avatar'
                className='h-full w-full flex-shrink-0 rounded-full object-cover'
              />
            </div>

            <div className="flex flex-1 flex-row justify-between  max-sm:items-start max-sm:gap-y-5 max-sm:flex-col">
              <div className='flex flex-col gap-y-2'>
                <span className='text-base font-semibold text-black dark:text-white md:text-lg'>Tips JavaScript</span>
                <div className='flex items-center gap-x-4'>
                  <span className='text-xs font-semibold text-[#8e8883] md:text-sm'>
                    {convertNumberToDisplayString(16000)} người đăng ký
                  </span>
                  <span className='text-xs font-semibold text-[#8e8883] md:text-sm'>
                    {convertNumberToDisplayString(254)} video
                  </span>
                </div>
                <NavLink
                  to={path.about}
                  className='flex items-center gap-x-2 text-xs font-semibold text-[#8e8883] md:text-sm'
                >
                  About Tips Javascript!
                  <AiOutlineRight className='h-4 w-4 text-black dark:text-white' />
                </NavLink>
              </div>

              <button className='flex items-center h-fit gap-x-2 rounded-2xl bg-[#f2f2f2] py-2 px-4 text-xs font-semibold dark:bg-[#272727] dark:text-white max-sm:px-3 max-sm:py-1 md:text-sm'>
                <IoMdNotificationsOutline className='h-6 w-6 text-black dark:text-white' />
                Đã đăng ký
              </button>
            </div>
          </div>
         
        </div>

        <div className='flex relative  mt-5 max-w-full md:px-20 lg:px-40 border-b border-b-gray-500  '>
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
                to={path.channel}
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
                to={path.video}
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
                to={path.playList}
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
                to={path.about}
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
    </div>
  )
}

export default ChannelPage
