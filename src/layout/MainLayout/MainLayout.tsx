import React, { useState } from 'react'
import Header from 'src/components/Header'
import MainSideBar from 'src/components/MainSideBar'
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
        <div className='grid w-full grid-cols-12 gap-x-4'>
          <MainSideBar />
          <div className='col-span-9'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-wrap items-center gap-y-2'>
                {title.map((item, index) => {
                  return (
                    <button
                      className={classNames('mx-2 rounded-xl  px-4 py-2  ', {
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayout
