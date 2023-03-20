import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'

const Header = () => {
  return (
    <div className='container sticky top-0 left-0 z-50 flex h-14 items-center justify-between border-b border-b-gray-500 bg-[#0f0f0f] pl-2 pr-2 shadow-xl'>
      <div className='flex items-center'>
        <Link to='/' className='flex cursor-pointer items-end gap-x-1'>
          <BsYoutube className='h-8 w-8 text-red-600 ' />
          <span className='text-lg font-semibold text-white'>YouTube</span>
        </Link>
      </div>
      <div className='flex items-center gap-x-2'>
        <button className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'>
          <AiOutlineSearch className='h-7 w-7' />
        </button>
        <div className=' h-9 w-9 rounded-full'>
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
