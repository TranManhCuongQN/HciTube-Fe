/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
const ListFilter = () => {
  const [filter, setFilter] = useState<number>(1)
  const { t } = useTranslation()
  const listFilter = t('list filter', { returnObjects: true })
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
    console.log(innerWidth)
    if (innerWidth < 640) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 2)
    }
    if (innerWidth >= 640) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 3)
    }
  }
  return (
    <>
      <div className='relative py-2 px-3 flex max-w-full items-center justify-between gap-x-5'>
          <div className={`absolute left-0 md:ml-2 md:w-9 bg-white dark:bg-[#0f0f0f] w-8 h-8 lg:w-10 lg:h-10 z-20 ${isBeginning ? 'invisible' : 'visible'}`}></div>
          <button
            className={`absolute left-0 z-30 hover:border-0 hover:outline-none flex h-8 w-8 md:ml-3 cursor-pointer items-center justify-center rounded-full text-xs bg-white dark:bg-black hover:bg-[#E5E5E5] dark:hover:bg-[#3F3F3F] lg:hidden lg:h-10 lg:w-10 ${
              isBeginning ? 'invisible' : 'visible'
            } `}
            onClick={goPrev}
          >
            <AiOutlineLeft className='h-5 w-5 text-black  dark:text-white lg:h-6 lg:w-6' />
          </button>
        <Swiper
          pagination={false}
          modules={[Pagination]}
          ref={swiperRef}
          className='w-full max-lg:mx-auto max-lg:w-5/6 max-lg:px-5'
          onSlideChange={(swiper) => {
            handleSwiper(swiper)
          }}
          breakpoints={{
            0: {
              slidesPerView: 2
            },
            325: {
              slidesPerView: 2
            },
            640: {
              slidesPerView: 3
            },
            1280: {
              slidesPerView: 7
            }
          }}
        >
          {listFilter.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                className={classNames('whitespace-nowrap rounded-lg px-3 h-8 max-[320px]:py-1 mr-3', {
                  'bg-[#f2f2f2]  text-black dark:bg-[#272727]  dark:text-white ': filter !== item.id,
                  'bg-black text-white dark:bg-[#f1f1f1] dark:text-black': filter === item.id
                })}
                onClick={() => setFilter(item.id)}
              >
                <span className='text-sm'>{item.name}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`absolute right-0 z-10 flex h-8 w-8 md:mr-3 cursor-pointer items-center justify-center rounded-full text-xs hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#3F3F3F] lg:hidden lg:h-10 lg:w-10 ${
            isEnd ? 'invisible' : 'visible'
          } `}
          onClick={goNext}
        >
          <AiOutlineRight className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
        </button>
      </div>
    </>
  )
}

export default ListFilter
