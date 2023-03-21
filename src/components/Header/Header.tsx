import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'
import { AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { MdMic } from 'react-icons/md'
import { IoNotificationsOutline } from 'react-icons/io5'

const Header = () => {
  const { setShowSideBar, setShowSideBar2xl } = useContext(AppContext)
  const handleClick = () => {
    setShowSideBar(true)
    setShowSideBar2xl(true)
  }
  return (
    <div className='container sticky top-0 left-0 z-10 flex h-14 items-center justify-between border-b border-b-gray-500 bg-[#0f0f0f] pl-2 pr-2 shadow-xl md:h-20'>
      <div className='flex items-center gap-x-1'>
        <button
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'
          onClick={handleClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='white'
            className='h-5 w-5 '
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
          </svg>
        </button>
        <div className='flex items-center'>
          <Link to='/' className='flex cursor-pointer items-end gap-x-1'>
            <BsYoutube className='h-8 w-8 text-red-600 ' />
            <span className='text-lg font-semibold text-white'>YouTube</span>
          </Link>
        </div>
      </div>

      {/* //* search */}
      <div className='flex flex-grow items-center justify-center gap-x-4 max-sm:hidden'>
        <div className=' flex h-11 w-[70%] items-center md:w-[60%]'>
          <input
            type='text'
            className='h-full w-full rounded-l-full border border-[#1e1e1e] bg-[#2a2a2a] px-6 text-lg shadow placeholder:text-base'
            placeholder='Tìm kiếm'
          />
          <button className='ml-[1px] flex h-full items-center justify-center rounded-r-full  bg-[#222222] px-4 py-1 '>
            <AiOutlineSearch className='h-5 w-5' />
          </button>
        </div>
        <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
          <MdMic className='h-5 w-5 lg:h-6 lg:w-6' />
        </button>
      </div>

      {/* //* group */}
      <div className='flex items-center gap-x-2 md:gap-x-4'>
        {/* //* search */}
        <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] md:hidden'>
          <AiOutlineSearch className='h-5 w-5' />
        </button>

        {/* //* upload */}
        <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
          <AiOutlineUpload className='h-5 w-5 lg:h-6 lg:w-6' />
        </button>

        {/* //* inform */}
        <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'>
          <IoNotificationsOutline className='h-5 w-5 lg:h-6 lg:w-6' />
        </button>

        {/* //* avatar */}
        <div className=' h-9 w-9 rounded-full lg:h-10 lg:w-10'>
          <img
            src='https://cdn.pixabay.com/photo/2022/09/24/16/32/bulldog-7476727_960_720.jpg'
            alt='avatar'
            className='h-full w-full rounded-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Header
