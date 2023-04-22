import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import Dropdown from 'src/components/Dropdown'
import Chart from './Components'
const AnalyticsPage = () => {
  const [option, setOption] = useState<string>('views')
  const childRef = useRef<HTMLDivElement>(null)
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)
  const [date, setDate] = useState<string>('7 ngày qua')

  const handleCloseDropDown = () => {
    setIsOpenDropDown(false)
  }

  const handleOpenDropDown = () => {
    setIsOpenDropDown(true)
  }

  const handleUpdateDate = (date: string) => {
    setDate(date)
    handleCloseDropDown()
  }
  return (
    <>
      <div className='flex w-full flex-col gap-y-2 overflow-hidden lg:mt-4 lg:gap-y-5'>
        <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Số liệu phân tích về kênh</span>
        <div className='my-5 flex flex-col items-end gap-y-3'>
          <div className='text-xs font-semibold text-black dark:text-white md:text-sm'> Chọn khoảng thời gian</div>
          <Dropdown
            childRef={childRef}
            isOpen={isOpenDropDown}
            handleClose={handleCloseDropDown}
            handleOpen={handleOpenDropDown}
            renderData={
              <div
                className='absolute top-0 left-0 z-40 flex h-40 w-full flex-col items-start overflow-hidden overflow-y-auto rounded-lg bg-[#ffffff] shadow dark:bg-[#1f1f1f]'
                ref={childRef}
              >
                <button
                  className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() => handleUpdateDate('7 ngày qua')}
                >
                  <span className='text-xs text-black dark:text-white md:text-sm'>7 ngày qua</span>
                </button>
                <button
                  className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() => handleUpdateDate('28 ngày qua')}
                >
                  <span className='text-xs text-black dark:text-white md:text-sm'>28 ngày qua</span>
                </button>
                <button
                  className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() => handleUpdateDate('90 ngày qua')}
                >
                  <span className='text-xs text-black dark:text-white md:text-sm'>90 ngày qua</span>
                </button>
                <button
                  className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() => handleUpdateDate('365 ngày qua')}
                >
                  <span className='text-xs text-black dark:text-white md:text-sm'>365 ngày qua</span>
                </button>
              </div>
            }
          >
            {date}
          </Dropdown>
        </div>

        <div className='mb-5 flex w-full flex-col rounded-lg border border-gray-200 bg-white dark:border-[#303030] dark:bg-[#282828]'>
          <div className='flex items-stretch justify-between'>
            <button
              className={classNames(`relative flex w-1/3 flex-col  items-center p-8`, {
                '-translate-y-[1px] bg-white after:absolute after:top-0 after:left-0 after:right-0 after:h-1 after:rounded-lg after:bg-blue-600 dark:bg-[#282828]':
                  option === 'views',
                'border border-gray-200 bg-[#f9f9f9] dark:border-[#303030] dark:bg-[#1f1f1f]': option !== 'views'
              })}
              onClick={() => setOption('views')}
            >
              <span className='text-xs text-black dark:text-white md:text-sm'>Số lượt xem</span>
              <span className='text-sm font-semibold text-black dark:text-white md:text-lg '>1</span>
            </button>

            <button
              className={classNames(`relative flex w-1/3 flex-col items-center p-8 `, {
                '-translate-y-[1px] bg-white after:absolute after:top-0 after:left-0 after:right-0 after:h-1 after:rounded-lg after:bg-blue-600 dark:bg-[#282828]':
                  option === 'times',
                'border border-gray-200 bg-[#f9f9f9] dark:border-[#303030] dark:bg-[#1f1f1f]': option !== 'times'
              })}
              onClick={() => setOption('times')}
            >
              <span className='text-xs text-black dark:text-white md:text-sm'>Thời gian xem (giờ)</span>
              <span className='text-sm font-semibold text-black dark:text-white md:text-lg'>1</span>
            </button>
            <button
              className={classNames(`relative flex w-1/3 flex-col items-center  p-8`, {
                '-translate-y-[1px] bg-white after:absolute after:top-0 after:left-0 after:right-0 after:h-1 after:rounded-lg after:bg-blue-600 dark:bg-[#282828]':
                  option === 'subscribers',
                'border border-gray-200 bg-[#f9f9f9] dark:border-[#303030] dark:bg-[#1f1f1f]': option !== 'subscribers'
              })}
              onClick={() => setOption('subscribers')}
            >
              <span className='text-xs text-black dark:text-white md:text-sm'>Số lượt người đăng ký</span>
              <span className='text-sm font-semibold text-black dark:text-white md:text-lg'>1</span>
            </button>
          </div>{' '}
          <Chart />
        </div>
      </div>
    </>
  )
}

export default AnalyticsPage
