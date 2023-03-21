import { Link } from 'react-router-dom'
import { IoMdHome } from 'react-icons/io'
import { SiSublimetext } from 'react-icons/si'
import { RiVideoLine } from 'react-icons/ri'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

const AsideBarSub = () => {
  const { showSideBar2xl } = useContext(AppContext)
  return (
    <>
      {/* //* scren md lg */}
      <div className={'mt-3 flex flex-shrink-0 flex-col gap-y-4 max-md:hidden 2xl:hidden'}>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <IoMdHome className='h-6 w-6' />
            <span className='text-xs font-semibold'>Trang chủ</span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <SiSublimetext className='h-6 w-6' />
            <span className='text-xs font-semibold'>Shorts</span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <RiVideoLine className='h-6 w-6' />
            <span className='text-xs font-semibold'>Kênh đăng ký</span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <MdOutlineVideoLibrary className='h-6 w-6' />
            <span className='text-xs font-semibold'>Thư viện</span>
          </Link>
        </div>
      </div>

      {/* //* screen 2xl */}
      <div className={`mt-3 flex flex-shrink-0 flex-col gap-y-4 max-2xl:hidden ${showSideBar2xl ? 'hidden' : 'block'}`}>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <IoMdHome className='h-6 w-6' />
            <span className='text-xs font-semibold'>Trang chủ</span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <SiSublimetext className='h-6 w-6' />
            <span className='text-xs font-semibold'>Shorts</span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <RiVideoLine className='h-6 w-6' />
            <span className='text-xs font-semibold'>Kênh đăng ký</span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <Link to='' className='flex flex-col items-center rounded-xl py-2 px-2 hover:bg-[#272727]'>
            <MdOutlineVideoLibrary className='h-6 w-6' />
            <span className='text-xs font-semibold'>Thư viện</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default AsideBarSub
