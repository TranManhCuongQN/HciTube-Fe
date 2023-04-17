import React from 'react'
import AvatarLetter from 'src/components/AvatarLetter'
import { CgWindows } from 'react-icons/cg'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { BsBarChartLineFill } from 'react-icons/bs'
import { AiOutlineProfile } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
const Sidebar = () => {
  return (
    <div className='flex flex-col gap-y-4 bg-white pb-4 dark:bg-[#282828]  lg:w-60 lg:flex-shrink-0'>
      <div className='mt-5 flex flex-col items-center gap-y-3'>
        <AvatarLetter className='h-24 w-24' name={'Cuong'} classNameChild='text-4xl ' />
        <div className='flex flex-col'>
          <span className='text-xs font-semibold text-black dark:text-white md:text-sm '>Kênh của bạn</span>
        </div>
      </div>
      <NavLink
        to={path.profile}
        className={({ isActive }) =>
          `relative flex items-center justify-start gap-x-4 py-2 pl-9 text-xs hover:bg-[#f9f9f9] dark:hover:bg-[#1f1f1f] md:py-3 md:text-sm  ${
            isActive
              ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600 dark:bg-[#1f1f1f]'
              : 'text-black dark:text-white'
          }`
        }
      >
        <AiOutlineProfile className='h-6 w-6 ' />
        <span className='text-sx font-semibold md:text-sm'>Trang hồ sơ</span>
      </NavLink>
      <NavLink
        to={path.upload}
        className={({ isActive }) =>
          `relative flex items-center justify-start gap-x-4 py-2 pl-9 text-xs hover:bg-[#f9f9f9] dark:hover:bg-[#1f1f1f] md:py-3 md:text-sm  ${
            isActive
              ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600 dark:bg-[#1f1f1f]'
              : 'text-black dark:text-white'
          }`
        }
      >
        <CgWindows className='h-6 w-6 ' />
        <span className='text-sx font-semibold md:text-sm'>Trang tổng quản</span>
      </NavLink>
      <NavLink
        to={path.content}
        className={({ isActive }) =>
          `relative flex items-center justify-start gap-x-4 py-2 pl-9 text-xs hover:bg-[#f9f9f9] dark:hover:bg-[#1f1f1f] md:py-3 md:text-sm ${
            isActive
              ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600 dark:bg-[#1f1f1f]'
              : 'text-black dark:text-white'
          }`
        }
      >
        <MdOutlineVideoLibrary className='h-6 w-6 ' />
        <span className='text-xs font-semibold md:text-sm'>Nội dung</span>
      </NavLink>
      <NavLink
        to={path.analytics}
        className={({ isActive }) =>
          `relative flex items-center justify-start gap-x-4 py-2 pl-9 text-xs hover:bg-[#f9f9f9] dark:hover:bg-[#1f1f1f] md:py-3 md:text-sm  ${
            isActive
              ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600 dark:bg-[#1f1f1f]'
              : 'text-black dark:text-white'
          }`
        }
      >
        <BsBarChartLineFill className='h-6 w-6 ' />
        <span className='text-xs font-semibold md:text-sm'>Số liệu phân tích</span>
      </NavLink>
      <NavLink
        to={path.changePassword}
        className={({ isActive }) =>
          `relative flex items-center justify-start gap-x-4 py-2 pl-9 text-xs hover:bg-[#f9f9f9] dark:hover:bg-[#1f1f1f] md:py-3 md:text-sm  ${
            isActive
              ? 'bg-[#f9f9f9] text-red-600 after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-red-600 dark:bg-[#1f1f1f]'
              : 'text-black dark:text-white'
          }`
        }
      >
        <RiLockPasswordLine className='h-6 w-6 ' />
        <span className='text-xs font-semibold md:text-sm'>Đổi mật khẩu</span>
      </NavLink>
    </div>
  )
}

export default Sidebar
