import React from 'react'

interface MainProps {
  openModal: () => void
}
const MainComponent = (props: MainProps) => {
  const { openModal } = props
  return (
    <div className='flex flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
      <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Trang tổng quan của kênh</span>
      <div className='flex flex-col gap-y-5 gap-x-5 bg-[#f9f9f9] dark:bg-[#1f1f1f] lg:flex-row lg:gap-x-5'>
        <div className='flex flex-col items-center justify-center gap-y-5 rounded-lg bg-white p-5 dark:bg-[#282828] md:p-8'>
          <div className='h-36 w-36 md:h-44 md:w-44'>
            <img
              src='https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3.svg'
              alt='avatar'
              className='h-full w-full object-cover'
            />
          </div>
          <div className='text-center text-xs text-black dark:text-white md:text-sm'>
            Bạn có muốn xem các chỉ số cho video gần đây của mình không?
          </div>
          <div className='text-center text-xs text-black dark:text-white md:text-sm'>
            Hãy đăng tải và xuất bản một video để bắt đầu.
          </div>
          <button className='bg-blue-600 p-2 text-xs font-semibold text-white md:p-3' onClick={openModal}>
            TẢI VIDEO LÊN
          </button>
        </div>

        <div className='flex flex-col items-start gap-y-5 rounded-lg bg-white p-5 dark:bg-[#282828] dark:shadow-2xl lg:w-72'>
          <span className='text-sm font-semibold text-black dark:text-white md:text-base'>
            Số liệu phân tích về kênh
          </span>
          <div className='flex flex-col border-b border-b-gray-300 py-2'>
            <span className='text-xs text-black dark:text-white md:text-sm'>Số người đăng ký hiện tại</span>
            <span className='text-base font-semibold text-black dark:text-white md:text-lg'>0</span>
          </div>
          <div className='flex w-full flex-col gap-y-2'>
            <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Tóm tắt</span>
            <div className='flex items-center justify-between'>
              <span className='text-xs text-black dark:text-white md:text-sm'>Số lượt xem</span>
              <span className='text-sm font-bold text-black dark:text-white md:text-base'>0</span>
            </div>
            <div className='flex w-full items-center justify-between'>
              <span className='text-xs text-black dark:text-white md:text-sm'>Thời gian xem</span>
              <span className='text-sm font-bold text-black dark:text-white md:text-base'>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainComponent
