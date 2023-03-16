import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineVideoLibrary, MdOutlineVideoStable } from 'react-icons/md'
import { SiSublimetext } from 'react-icons/si'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { RiVideoLine } from 'react-icons/ri'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'

const MainSideBar = () => {
  return (
    <>
      <div className='flex w-60 ml-4 flex-shrink-0 flex-col max-xl:hidden'>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <IoMdHome className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Trang chủ</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <SiSublimetext className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Short</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <MdOutlineVideoStable className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Kênh đăng ký</span>
        </NavLink>
        <div className='w-full h-[0.05rem] my-4 bg-[#363636]' />

        {/* //* */}
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <MdOutlineVideoLibrary className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Thư viện</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <RxCounterClockwiseClock className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Video đã xem</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <RiVideoLine className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Video của bạn</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <AiOutlineClockCircle className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Xem sau</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <BiLike className='h-7 w-7' />
          <span className='ml-1 text-lg font-medium'>Video đã thích</span>
        </NavLink>
        <div className='w-full h-[0.05rem] my-4 bg-[#363636]' />

        {/* //* Kênh đăng ký */}
        <span className='text-lg font-semibold'>Kênh đăng ký</span>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <img
            src='https://yt3.ggpht.com/ytc/AL5GRJVgvAwa9TWshWQm6YFBeCDE7L-xDkOaHPEW9MSkp1I=s88-c-k-c0x00ffffff-no-rj'
            alt='avatar'
            className='h-8 w-8 rounded-full'
          />
          <span className='text-lg font-medium line-clamp-1'>Duy Luân Dễ Thương</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <img
            src='https://yt3.ggpht.com/ytc/AL5GRJVgvAwa9TWshWQm6YFBeCDE7L-xDkOaHPEW9MSkp1I=s88-c-k-c0x00ffffff-no-rj'
            alt='avatar'
            className='h-8 w-8 rounded-full'
          />
          <span className='text-lg font-medium line-clamp-1'>Duy Luân Dễ Thương</span>
        </NavLink>
        <NavLink to='' className='flex items-center gap-x-6 rounded-xl px-4 py-3 hover:bg-[#272727]'>
          <img
            src='https://yt3.ggpht.com/ytc/AL5GRJVgvAwa9TWshWQm6YFBeCDE7L-xDkOaHPEW9MSkp1I=s88-c-k-c0x00ffffff-no-rj'
            alt='avatar'
            className='h-8 w-8 rounded-full'
          />
          <span className='text-lg font-medium line-clamp-1'>Duy Luân Dễ Thương 12345</span>
        </NavLink>
      </div>

      <div className='flex w-24 flex-shrink-0 flex-col gap-y-3 max-lg:hidden xl:hidden'>
        <NavLink to='' className='flex flex-col w-17 items-center gap-y-2 rounded-xl py-4 hover:bg-[#272727]'>
          <IoMdHome className='h-7 w-7' />
          <span className='ml-1 text-[0.75rem] font-medium'>Trang chủ</span>
        </NavLink>
        <NavLink to='' className='flex flex-col w-17 items-center gap-y-2 rounded-xl py-4 hover:bg-[#272727]'>
          <SiSublimetext className='h-7 w-7' />
          <span className='ml-1 text-[0.75rem] font-medium'>Shorts</span>
        </NavLink>
        <NavLink to='' className='flex flex-col w-17 items-center gap-y-2 rounded-xl py-4 hover:bg-[#272727]'>
          <RiVideoLine className='h-7 w-7' />
          <span className='ml-1 text-[0.75rem] font-medium'>Kênh đăng ký</span>
        </NavLink>
        <NavLink to='' className='flex flex-col w-17 items-center gap-y-2 rounded-xl py-4 hover:bg-[#272727]'>
          <MdOutlineVideoLibrary className='h-7 w-7' />
          <span className='ml-1 text-[0.75rem] font-medium'>Thư viện</span>
        </NavLink>
      </div>

      {/* //*Mobie Tablet */}
    </>
  )
}

export default MainSideBar
