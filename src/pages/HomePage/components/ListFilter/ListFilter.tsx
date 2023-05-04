/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import classNames from 'classnames'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import useQueryConfig from 'src/hook/useQueryConfig'

interface ListFilterProps {
  dataCategories: {
    id: string
    name: string
  }[]
  filter: string
  setFilter: (id: string) => void
}
const ListFilter = ({ dataCategories, filter, setFilter }: ListFilterProps) => {
  const swiperRef = useRef<SwiperRef>(null)
  const [isBeginning, setIsBeginning] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(false)
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { category } = queryConfig

  useEffect(() => {
    if (category) {
      setFilter(category)
    }
  }, [category, setFilter])
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

  const handleClick = (item: string) => {
    setFilter(item)
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            category: item
          },
          ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy']
        )
      ).toString()
    })
  }
  return (
    <>
      <div className='relative flex max-w-full items-center justify-between gap-x-5 py-2 px-3 xl:px-8'>
        <div
          className={`absolute left-0 z-20 h-8 w-8 bg-white dark:bg-[#0f0f0f] md:ml-2 md:w-9 lg:h-10 lg:w-10 ${
            isBeginning ? 'invisible' : 'visible'
          }`}
        ></div>
        <button
          className={`absolute left-0 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xs hover:border-0 hover:bg-[#E5E5E5] hover:outline-none dark:bg-black dark:hover:bg-[#3F3F3F] md:ml-3 lg:hidden lg:h-10 lg:w-10 ${
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
        >
          {dataCategories.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                className={classNames('mr-3 h-8 whitespace-nowrap rounded-lg px-3 max-[320px]:py-1', {
                  'bg-[#f2f2f2]  text-black dark:bg-[#272727]  dark:text-white ': filter !== item.id,
                  'bg-black text-white dark:bg-[#f1f1f1] dark:text-black': filter === item.id
                })}
                onClick={() => handleClick(item.id)}
              >
                <span className='text-sm'>{item.name}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`absolute right-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#3F3F3F] md:mr-3 lg:hidden lg:h-10 lg:w-10 ${
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
