/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import { NavLink } from 'react-router-dom'
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
import 'swiper/css/navigation'
import { Pagination } from 'swiper'

const ChannelPage = () => {
  const [choose, setChoose] = useState<string>('channel')
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
    setIsEnd(swiper.activeIndex === swiper.slides.length - 2)
  }

  console.log(isBeginning, isEnd)

  return (
    <div className='container flex gap-x-20 bg-[#ffffff] pl-2 pr-2 dark:bg-[#0f0f0f] lg:px-8'>
      <AsideBar />
      <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
        <div className='h-52 w-full'>
          <img
            src='https://i.pinimg.com/564x/17/3f/fc/173ffca741ea25ef06278e74ddf89ff0.jpg'
            alt='thumbnail'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='mt-5 flex flex-wrap items-center justify-between gap-y-2 max-[320px]:px-2 lg:mx-10'>
          <div className='flex items-center gap-x-5'>
            <div className='h-32 w-32 rounded-full max-md:h-24 max-md:w-24 max-[320px]:h-16 max-[320px]:w-16'>
              <img
                src='https://i.pinimg.com/736x/47/ce/d6/47ced656facf572c471fde541c60faa8.jpg'
                alt='avatar'
                className='h-full w-full flex-shrink-0 rounded-full object-cover'
              />
            </div>
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
          </div>
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] py-2 px-4 text-xs font-semibold dark:bg-[#272727] dark:text-white md:text-sm'>
            <IoMdNotificationsOutline className='h-6 w-6 text-black dark:text-white' />
            Đã đăng ký
          </button>
        </div>

        <div className=' relative max-w-full'>
          <button
            className={`absolute top-7 left-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs  hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] md:hidden lg:h-10 lg:w-10 ${
              isBeginning ? 'invisible' : 'visible'
            } `}
            onClick={goPrev}
          >
            <AiOutlineLeft className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          </button>
          <Swiper
            pagination={false}
            modules={[Pagination]}
            className=' mx-10 mt-5 flex items-center gap-x-16 border-b border-b-gray-400'
            ref={swiperRef}
            onSlideChange={(swiper) => {
              handleSwiper(swiper)
            }}
            breakpoints={{
              0: {
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
              <button
                className={classNames(`whitespace-nowrap p-3 text-xs font-semibold  md:text-sm`, {
                  'border-b-2 border-b-black font-semibold text-black dark:border-b-white dark:text-white ':
                    choose === 'channel',
                  'text-gray-500 ': choose !== 'channel'
                })}
                type='button'
                onClick={() => setChoose('channel')}
              >
                TRANG CHỦ
              </button>
            </SwiperSlide>

            <SwiperSlide>
              {' '}
              <button
                className={classNames(`p-3 text-xs font-semibold md:text-sm`, {
                  'border-b-2 border-b-black font-semibold text-black dark:border-b-white dark:text-white':
                    choose === 'video',
                  'text-gray-500': choose !== 'video'
                })}
                type='button'
                onClick={() => setChoose('video')}
              >
                VIDEO
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                className={classNames(`whitespace-nowrap p-3 text-xs font-semibold  md:text-sm`, {
                  'border-b-2 border-b-black font-semibold text-black dark:border-b-white dark:text-white':
                    choose === 'playlist',
                  'text-gray-500': choose !== 'playlist'
                })}
                type='button'
                onClick={() => setChoose('playlist')}
              >
                DANH SÁCH PHÁT
              </button>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <button
                className={classNames(`whitespace-nowrap p-3 text-xs font-semibold  md:text-sm`, {
                  'border-b-2 border-b-black font-semibold text-black dark:border-b-white dark:text-white':
                    choose === 'about',
                  'text-gray-500': choose !== 'about'
                })}
                type='button'
                onClick={() => setChoose('about')}
              >
                GIỚI THIỆU
              </button>
            </SwiperSlide>
          </Swiper>
          <button
            className={`absolute top-7 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs  hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] md:hidden lg:h-10 lg:w-10 ${
              isEnd ? 'invisible' : 'visible'
            } `}
            onClick={goNext}
          >
            <AiOutlineRight className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChannelPage
