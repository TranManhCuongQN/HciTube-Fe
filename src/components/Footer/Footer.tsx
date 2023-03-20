import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { SiSublimetext } from 'react-icons/si'
import { RiVideoLine } from 'react-icons/ri'
import { MdOutlineVideoLibrary } from 'react-icons/md'

const Footer = () => {
  return (
    <div className='container fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t border-t-gray-500 bg-[#0f0f0f] shadow-lg xl:hidden'>
      <div className='flex h-full flex-col items-center'>
        <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
          <IoMdHome className='h-6 w-6' />
          <span className='text-xs font-semibold'>Trang chủ</span>
        </Link>
      </div>
      <div className='flex h-full flex-col items-center'>
        <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
          <SiSublimetext className='h-6 w-6' />
          <span className='text-xs font-semibold'>Shorts</span>
        </Link>
      </div>
      <div className='flex h-full flex-col items-center'>
        <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
          <RiVideoLine className='h-6 w-6' />
          <span className='text-xs font-semibold'>Kênh đăng ký</span>
        </Link>
      </div>
      <div className='flex h-full flex-col items-center'>
        <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
          <MdOutlineVideoLibrary className='h-6 w-6' />
          <span className='text-xs font-semibold'>Thư viện</span>
        </Link>
      </div>
    </div>
  )
}

export default Footer
