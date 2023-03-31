import React from 'react'
import AvatarLetter from 'src/components/AvatarLetter'
import { CgWindows } from 'react-icons/cg'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { BsBarChartLineFill } from 'react-icons/bs'

const UploadVideoPage = () => {
  return (
    <div className='container relative flex h-screen gap-x-5 bg-[#f9f9f9] pl-3 pr-3 dark:bg-[#1f1f1f] max-lg:flex-wrap'>
      {/* //* SideBar */}
      <div className='flex h-screen w-64 flex-shrink-0 flex-col gap-y-8 bg-white pb-5 dark:bg-[#282828] max-lg:w-full'>
        <div className='mt-5 flex flex-col items-center gap-y-3'>
          <AvatarLetter name='C' size='120' />
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-black dark:text-white '>Kênh của bạn</span>
          </div>
        </div>
        <NavLink
          to={path.upload}
          className={({ isActive }) =>
            `relative flex items-center justify-start gap-x-4 py-3 pl-9 hover:bg-[#f9f9f9] ${
              isActive
                ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600 dark:bg-[#1f1f1f]'
                : ''
            }`
          }
        >
          <CgWindows className='h-6 w-6 ' />
          <span className='text-sm font-semibold '>Trang tổng quản</span>
        </NavLink>
        <NavLink
          to='/content'
          className={({ isActive }) =>
            `relative flex items-center justify-start gap-x-4 py-3 pl-9 hover:bg-[#f9f9f9] ${
              isActive
                ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600'
                : ''
            }`
          }
        >
          <MdOutlineVideoLibrary className='h-6 w-6 ' />
          <span className='text-sm font-semibold '>Nội dung</span>
        </NavLink>
        <NavLink
          to='/chart'
          className={({ isActive }) =>
            `relative flex items-center justify-start gap-x-4 py-3 pl-9 hover:bg-[#f9f9f9] ${
              isActive
                ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600'
                : ''
            }`
          }
        >
          <BsBarChartLineFill className='h-6 w-6 ' />
          <span className='text-sm font-semibold '>Số liệu phân tích</span>
        </NavLink>
      </div>

      {/* //* Main */}
      <div className='flex flex-col max-lg:w-full'>
        <span className='my-10 text-xl font-semibold text-black max-lg:text-base'>Trang tổng quan của kênh</span>
        <div className='mr-2 ml-2 flex items-start gap-y-5 gap-x-5 bg-[#f9f9f9] max-lg:w-full max-lg:flex-wrap'>
          <div className='flex flex-col items-center justify-center gap-y-5 rounded-lg bg-white p-10 max-lg:w-full'>
            <div className='h-48 w-48'>
              <img
                src='https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3.svg'
                alt='avatar'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='text-center text-sm text-black '>
              Bạn có muốn xem các chỉ số cho video gần đây của mình không?
            </div>
            <div className='text-center text-sm text-black '>Hãy đăng tải và xuất bản một video để bắt đầu.</div>
            <button className='bg-blue-600 p-3 text-sm font-semibold text-white'>TẢI VIDEO LÊN</button>
          </div>

          <div className='flex flex-col items-start gap-y-5 rounded-lg bg-white p-10 p-5 max-lg:w-full'>
            <span className='text-base font-semibold text-black'>Số liệu phân tích về kênh</span>
            <div className='flex flex-col border-b border-b-gray-300 py-2'>
              <span className='text-sm text-black'>Số người đăng ký hiện tại</span>
              <span className='text-xl font-semibold text-black'>0</span>
            </div>
            <div className='flex w-full flex-col gap-y-2'>
              <span className='text-base font-semibold text-black'>Tóm tắt</span>
              <div className='flex w-full items-center justify-between'>
                <span className='text-sm text-black'>Số lượt xem</span>
                <span className='text-sm text-black'>0</span>
              </div>
              <div className='flex w-full items-center justify-between'>
                <span className='text-sm text-black'>Thời gian xem</span>
                <span className='text-sm text-black'>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadVideoPage
