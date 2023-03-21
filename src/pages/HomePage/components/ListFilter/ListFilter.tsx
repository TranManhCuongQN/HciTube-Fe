import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import classNames from 'classnames'
const title = [
  {
    id: 1,
    name: 'Tất cả'
  },
  {
    id: 2,
    name: 'Âm nhạc'
  },
  {
    id: 3,
    name: 'Trò chơi'
  },
  {
    id: 4,
    name: 'Trực tiếp'
  },
  {
    id: 5,
    name: 'Bóng đá'
  },
  {
    id: 7,
    name: 'Đã xem '
  }
]

const ListFilter = () => {
  const [filter, setFilter] = useState<string>('Tất cả')
  return (
    <>
      <div className='mt-6 flex h-12 w-full items-center gap-x-2 bg-[#ffffff] dark:bg-[#0f0f0f] md:h-16 md:gap-x-5'>
        <Swiper
          slidesPerView={4}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          modules={[Pagination]}
          className='w-full md:hidden'
        >
          {title.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                className={classNames('rounded-lg px-2 py-1  ', {
                  'bg-[#f2f2f2]  text-black dark:bg-[#272727]  dark:text-white ': filter !== item.name,
                  'bg-black text-white dark:bg-[#f1f1f1] dark:text-black': filter === item.name
                })}
                onClick={() => setFilter(item.name)}
              >
                <span className='text-sm'>{item.name}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* //* md, lg screen*/}
        {title.map((item, index) => (
          <button
            className={classNames('flex-shrink-0  rounded-lg py-2 px-4 max-md:hidden ', {
              'bg-[#f2f2f2]  text-black dark:bg-[#272727] dark:text-white': filter !== item.name,
              'bg-black text-white dark:bg-[#f1f1f1] dark:text-black': filter === item.name
            })}
            key={index}
            onClick={() => setFilter(item.name)}
          >
            <span className='text-sm'>{item.name}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default ListFilter
