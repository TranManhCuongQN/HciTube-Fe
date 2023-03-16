import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'
import { AiOutlineSearch, AiOutlineArrowLeft } from 'react-icons/ai'
import { MdMic } from 'react-icons/md'
import { RiVideoAddLine } from 'react-icons/ri'
import { IoNotificationsOutline } from 'react-icons/io5'

const Header = () => {
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false)

  const handleClickSearch = () => {
    setIsActiveSearch(true)
  }

  const handleClickBack = () => {
    setIsActiveSearch(false)
  }
  return (
    <div className='container sticky shadow px-1'>
      {isActiveSearch ? (
        <div className='flex h-20 w-full items-center justify-between'>
          <button
            className='mx-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'
            onClick={handleClickBack}
          >
            <AiOutlineArrowLeft className='h-7 w-7' />
          </button>
          <div className='flex h-12 w-[380px] items-center'>
            <input
              type='text'
              className='h-full w-full rounded-l-full border border-[#1e1e1e] bg-[#2a2a2a] px-6 text-lg shadow'
              placeholder='Tìm kiếm'
            />
            <button className='ml-[1px] flex h-full w-[70px] items-center justify-center  rounded-r-full bg-[#222222] py-1'>
              <AiOutlineSearch className='h-7 w-7' />
            </button>
          </div>
          <button className='mx-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'>
            <MdMic className='h-7 w-7' />
          </button>
        </div>
      ) : (
        <div className='flex h-20 w-full items-center justify-between gap-x-4'>
          <div className='flex items-center gap-x-2 pl-4'>
            <div className='mx-2 mr-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] max-[470px]:hidden'>
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
            </div>
            <div className='flex items-center'>
              <Link to='/' className='flex cursor-pointer items-end'>
                <BsYoutube className='h-10 w-12 text-red-600' />
                <span className='pb-1 text-xl font-semibold text-white'>YouTube</span>
              </Link>
            </div>
          </div>

          <div className='flex flex-grow items-center justify-center gap-x-4 max-sm:hidden'>
            <div className=' flex h-12 w-[70%] items-center max-w-[650px]'>
              <input
                type='text'
                className='h-full w-full rounded-l-full border border-[#1e1e1e] bg-[#2a2a2a] px-6 text-lg shadow'
                placeholder='Tìm kiếm'
              />
              <button className='ml-[1px] flex h-full items-center justify-center rounded-r-full  bg-[#222222] px-4 py-1'>
                <AiOutlineSearch className='h-7 w-7' />
              </button>
            </div>
            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'>
              <MdMic className='h-7 w-7' />
            </button>
          </div>

          <div className='flex items-center pr-6 gap-x-2 sm:gap-x-4'>
            <button
              className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] sm:hidden'
              onClick={handleClickSearch}
            >
              <AiOutlineSearch className='h-7 w-7' />
            </button>

            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] max-[470px]:hidden sm:hidden'>
              <MdMic className='h-7 w-7' />
            </button>

            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] max-[470px]:hidden'>
              <RiVideoAddLine className='h-7 w-7' />
            </button>
            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] max-sm:hidden'>
              <IoNotificationsOutline className='h-7 w-7' />
            </button>
            <div className='mx-2 h-11 w-11 rounded-full'>
              <img
                src='https://cdn.pixabay.com/photo/2022/09/24/16/32/bulldog-7476727_960_720.jpg'
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
