import classNames from 'classnames'
import React, { useState } from 'react'
import Chart from './Components'
const AnalyticsPage = () => {
  const [option, setOption] = useState<string>('views')
  return (
    <>
      <div className='flex w-full flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
        <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Số liệu phân tích về kênh</span>
        <div className='mb-5 flex w-full flex-col rounded-lg border border-gray-200 bg-white dark:border-[#303030] dark:bg-[#282828]'>
          <div className='flex items-center justify-between'>
            <button
              className={classNames(`relative flex w-1/3 flex-col items-center  p-8`, {
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
              className={classNames(`relative flex w-1/3 flex-col items-center  p-8`, {
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
          </div>
          <Chart />
        </div>
      </div>
    </>
  )
}

export default AnalyticsPage
