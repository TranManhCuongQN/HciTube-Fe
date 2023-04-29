/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { convertDuration, convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { playList } from 'src/types/playList.type'
import parse from 'html-react-parser'
import { RxDividerHorizontal } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const SwiperCustom = ({ dataVideo }: { dataVideo: playList }) => {
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
    if (innerWidth < 768) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 2)
    }
    if (innerWidth >= 768 && innerWidth < 920) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 3)
    }
    if (innerWidth >= 920 && innerWidth < 1280) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 4)
    }
    if (innerWidth >= 1280) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 5)
    }
  }
  return (
    <>
      {(dataVideo.videos?.length as number) > 0 && (
        <>
          {' '}
          <div className='my-6 h-[1px] w-full bg-gray-500'></div>
          <div className='flex w-full items-center justify-start gap-x-2'>
            <span className='text-sm font-semibold text-black dark:text-white max-lg:px-2 md:text-base '>
              {dataVideo?.title}
            </span>
            <button className='flex items-end gap-x-1 rounded-xl px-3 py-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-sm:py-1 max-sm:px-2'>
              <BsFillPlayFill className='h-6 w-6 text-black dark:text-white' />
              <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Phát tất cả</span>
            </button>
          </div>
          <span
            className='mb-3 text-xs text-black line-clamp-2 dark:text-white max-lg:px-2 md:text-sm'
            dangerouslySetInnerHTML={{ __html: String(parse(dataVideo?.description) || '') }}
          ></span>
          <div className='relative max-w-full'>
            <button
              className={`absolute top-12 left-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center  rounded-full bg-white text-xs  shadow max-lg:-left-3 lg:h-10 lg:w-10 ${
                isBeginning ? 'invisible' : 'visible'
              } `}
              onClick={goPrev}
            >
              <AiOutlineLeft className='h-5 w-5 text-black lg:h-6 lg:w-6' />
            </button>
            <Swiper
              pagination={false}
              modules={[Pagination]}
              ref={swiperRef}
              className='lg:mx-auto lg:max-w-[1150px]'
              onSlideChange={(swiper) => {
                handleSwiper(swiper)
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2
                },
                768: {
                  slidesPerView: 3
                },
                920: {
                  slidesPerView: 4
                },
                1280: {
                  slidesPerView: 5
                }
              }}
            >
              {dataVideo.videos?.map((item, index) => {
                return (
                  <SwiperSlide key={item._id}>
                    <NavLink
                      to={`/detail/${item._id}`}
                      className='mr-2 flex w-[220px] cursor-pointer flex-col gap-y-2 max-sm:w-44 max-[320px]:w-36'
                    >
                      <div className='relative h-[130px] w-full flex-shrink-0 rounded-lg max-sm:h-28 max-[320px]:h-20'>
                        <img src={item?.thumbnail} alt='avatar' className='h-full w-full rounded-lg object-cover' />
                        <div className='absolute bottom-1 right-1 z-40 rounded bg-black p-1 shadow'>
                          <span className='text-xs font-semibold text-white'>
                            {convertDuration(item?.duration as string)}
                          </span>
                        </div>
                      </div>
                      <div className='pr-3 md:pr-6'>
                        <span className='mb-1 text-sm font-bold text-black line-clamp-2 dark:text-white'>
                          {item.title}
                        </span>

                        <div className='flex flex-wrap items-center gap-x-1'>
                          <span className='text-xs  text-[#666d74] dark:text-gray-400 '>
                            {convertNumberToDisplayString(item?.view as number)} lượt xem
                          </span>
                          <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                          <span className='text-xs  text-[#666d74] dark:text-gray-400 '>
                            {convertToRelativeTime(item?.createdAt as string)}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <button
              className={`absolute top-12 right-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xs shadow max-sm:-right-2 lg:h-10 lg:w-10 ${
                isEnd ? 'invisible' : 'visible'
              } `}
              onClick={goNext}
            >
              <AiOutlineRight className='h-5 w-5 text-black  lg:h-6 lg:w-6' />
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default SwiperCustom
