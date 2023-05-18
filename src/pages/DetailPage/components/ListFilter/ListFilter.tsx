/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import classNames from 'classnames'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import useQueryConfig from 'src/hook/useQueryConfig'
import { omit } from 'lodash'

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
  const { category, playList, favorite } = queryConfig
  const { id } = useParams()

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

    setIsEnd(swiper.activeIndex === swiper.slides.length - 5)
  }

  const handleClick = (item: string) => {
    setFilter(item)
    if (playList) {
      navigate({
        pathname: `/detail/${id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: item,
              playList: playList as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'favorite']
          )
        ).toString()
      })
    } else if (favorite) {
      navigate({
        pathname: `/detail/${id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: item,
              favorite: favorite as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: `/detail/${id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: item
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList', 'favorite']
          )
        ).toString()
      })
    }
  }
  return (
    <>
      <div className='relative flex max-w-full items-center justify-between gap-x-5 py-2 px-3'>
        <div
          className={`from-70% via-95% absolute left-0 z-10 h-10 w-24  bg-gradient-to-r from-white via-[#fffffff3] to-transparent dark:from-[#0f0f0f] dark:via-[#0f0f0ffa] max-md:w-20 ${
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
          className={`absolute right-0 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#3F3F3F] md:mr-3 lg:h-10 lg:w-10 ${
            isEnd ? 'invisible' : 'visible'
          } `}
          onClick={goNext}
        >
          <AiOutlineRight className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
        </button>

        <div
          className={`from-70% via-95% absolute right-0 z-10 h-10 w-24  bg-gradient-to-l from-white via-[#fffffff3] to-transparent dark:from-[#0f0f0f] dark:via-[#0f0f0ffa] max-md:w-20`}
        ></div>
      </div>
    </>
  )
}

export default ListFilter
