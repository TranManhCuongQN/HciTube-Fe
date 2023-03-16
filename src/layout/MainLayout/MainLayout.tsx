/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import Header from 'src/components/Header'
import MainSideBar from 'src/components/MainSideBar'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { RiVideoLine } from 'react-icons/ri'
import { SiSublimetext } from 'react-icons/si'

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
    id: 6,
    name: 'Mới tải lên gần đây'
  },
  {
    id: 7,
    name: 'Đã xem '
  },
  {
    id: 8,
    name: 'Đề xuất mới'
  }
]
const MainLayout = () => {
  const [filter, setFilter] = useState<string>('Tất cả')



  return (
    <>
      <Header />
      <div className='container px-1 '>
        {' '}
        <div className='flex items-baseline gap-x-10'>
          <MainSideBar />
          <div className='flex relative items-center px-4 w-full h-14 flex-nowrap gap-y-2 overflow-hidden' id='Swiper'>
              {/* Prev button */}
              <div className='hidden absolute h-10 w-[9rem] left-0'>
                <div className='flex items-center justify-start h-full'>
                  <div className="absolute left-20 w-5 h-full bg-gradient-to-l from-[#0f0f0f22] to-[#0f0f0f]"></div>
                  <div className="flex justify-start items-center h-full w-20 bg-[#0f0f0f]">
                    <button className='p-2 ml-2 bg-[#0f0f0f] rounded-full hover:bg-[#2F2F2F] z-20'>
                      <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='white'
                            className='h-8 w-8 '
                          >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                      </svg>
                    </button>
                  </div>

                </div>
                
              </div>

              {title.map((item, index) => {
                return (
                  <button
                    className={classNames('h-[2.5rem] mx-2 rounded-xl  px-5  whitespace-nowrap', {
                      'bg-[#272727] font-medium text-white': filter !== item.name,
                      'bg-[#f1f1f1] text-black': filter === item.name
                    })}
                    key={index}
                    onClick={() => setFilter(item.name)}
                  >
                    {item.name}
                  </button>
                )
              })}
              {/* Next button */}
              <div className='absolute h-10 w-[9rem] right-0'>
                <div className='flex items-center justify-end h-full'>
                  <div className="absolute right-20 w-5 h-full bg-gradient-to-r from-[#0f0f0f22] to-[#0f0f0f]"></div>
                  <div className="flex justify-end items-center h-full w-20 bg-[#0f0f0f]">
                    <button className='p-2 mr-4 bg-[#0f0f0f] rounded-full hover:bg-[#2F2F2F] z-20'>
                      <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='white'
                            className='h-8 w-8 '
                          >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                      </svg>
                    </button>
                  </div>

                </div>
                
              </div>
            </div>
          <div className='fixed bottom-0 left-0 flex h-16 w-full items-center justify-around gap-y-2  border-t border-white shadow-2xl lg:hidden'>
            <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
              <IoMdHome className='h-6 w-6' />
              <span className='text-xs font-semibold'>Trang chủ</span>
            </Link>
            <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
              <SiSublimetext className='h-6 w-6' />
              <span className='text-xs font-semibold'>Shorts</span>
            </Link>
            <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
              <RiVideoLine className='h-6 w-6' />
              <span className='text-xs font-semibold'>Kênh đăng ký</span>
            </Link>
            <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
              <MdOutlineVideoLibrary className='h-6 w-6' />
              <span className='text-xs font-semibold'>Thư viện</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayout
