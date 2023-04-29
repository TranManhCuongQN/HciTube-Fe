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

    setIsEnd(swiper.activeIndex === swiper.slides.length - 5)
  }
  return (
    <>
      <div className='relative flex max-w-full items-center justify-between gap-x-5 py-2 px-3'>
        <div
          className={`absolute left-0 z-10 h-10 w-24 max-md:w-20 bg-gradient-to-r  from-white dark:from-[#0f0f0f] from-70% via-[#fffffff3] dark:via-[#0f0f0ffa] via-95% to-transparent ${
            isBeginning ? 'invisible' : 'visible'
          }`}
        ></div>
        <button
          className={`absolute left-0 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xs hover:border-0 hover:bg-[#E5E5E5] hover:outline-none dark:bg-black dark:hover:bg-[#3F3F3F] md:ml-3 lg:h-10 lg:w-10 ${
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
          className='w-full max-lg:mx-auto max-lg:px-5'
          onSlideChange={(swiper) => {
            handleSwiper(swiper)
          }}
        >
          {listFilter.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                className={classNames('mr-3 h-8 whitespace-nowrap rounded-lg px-3 max-[320px]:py-1', {
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
          className={`absolute right-0 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#3F3F3F] md:mr-3 lg:h-10 lg:w-10 ${
            isEnd ? 'invisible' : 'visible'
          } `}
          onClick={goNext}
        >
          <AiOutlineRight className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
        </button>

        <div
          className={`absolute right-0 z-10 h-10 w-24 max-md:w-20 bg-gradient-to-l  from-white dark:from-[#0f0f0f] from-70% via-[#fffffff3] dark:via-[#0f0f0ffa] via-95% to-transparent`}
        >
        </div>
      </div>
    </>
  )
}

export default ListFilter
