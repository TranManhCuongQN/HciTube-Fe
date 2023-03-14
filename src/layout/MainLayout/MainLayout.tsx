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
      <div className='container'>
        {' '}
        <div className='flex items-baseline gap-x-10'>
          <MainSideBar />
          <div className='flex w-full flex-wrap gap-y-2 overflow-hidden'>
            {title.map((item, index) => {
              return (
                <button
                  className={classNames('mx-2 rounded-xl  px-5 py-3  ', {
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
