import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const ListFilter = () => {
  const [filter, setFilter] = useState<number>(1)
  const { t } = useTranslation()
  const listFilter = t('list filter', { returnObjects: true })
  return (
    <>
      <div className='mt-6 flex h-12 w-full items-center gap-x-2 md:h-16 md:gap-x-5'>
        <Swiper slidesPerView={3} navigation={true} modules={[Pagination]} className='w-full md:hidden'>
          {listFilter.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                className={classNames('rounded-lg px-3 py-1  ', {
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

        {/* //* md, lg screen*/}
        {listFilter.map((item, index) => (
          <button
            className={classNames('flex-shrink-0  rounded-lg py-2 px-4 max-md:hidden ', {
              'bg-[#f2f2f2]  text-black dark:bg-[#272727] dark:text-white': filter !== item.id,
              'bg-black text-white dark:bg-[#f1f1f1] dark:text-black': filter === item.id
            })}
            key={index}
            onClick={() => setFilter(item.id)}
          >
            <span className='text-sm'>{item.name}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default ListFilter
