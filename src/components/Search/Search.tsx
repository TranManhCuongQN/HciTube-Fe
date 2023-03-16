import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Voice from '../Voice'
const Search = () => {
  return (
    <div className='flex flex-grow items-center justify-center gap-x-4 max-sm:hidden'>
      <div className=' flex h-12 w-[70%] items-center '>
        <input
          type='text'
          className='h-full w-full rounded-l-full border border-[#1e1e1e] bg-[#2a2a2a] px-6 text-lg shadow'
          placeholder='Tìm kiếm'
        />
        <button className='ml-[1px] flex h-full w-[100px] items-center justify-center  rounded-r-full bg-[#222222] py-1'>
          <AiOutlineSearch className='h-7 w-7' />
        </button>
      </div>
      <Voice />
    </div>
  )
}

export default Search
