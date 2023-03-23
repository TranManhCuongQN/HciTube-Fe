import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Popover from '../Popover'
import Voice from '../Voice'
const Search = () => {
  return (
    <div className='flex flex-grow items-center justify-center max-sm:hidden'>
      <div className=' flex h-11 items-center md:h-12 md:w-[70%] 2xl:w-[60%] '>
        <input
          type='text'
          className='h-full w-full rounded-l-full border border-[#d8d8d8] px-6 text-lg text-black outline-none placeholder:text-base dark:border-[#1e1e1e] dark:bg-[#2a2a2a] dark:text-white'
          placeholder='Tìm kiếm'
        />
        <Popover
          className='ml-[1px] flex h-12 cursor-pointer items-center justify-center  rounded-r-full bg-[#f8f8f8] px-4 py-1 dark:bg-[#222222]'
          renderPopover={
            <span className='z-50 mt-3 block h-full rounded-lg bg-gray-500 px-2 py-2 text-xs font-semibold'>
              Tìm kiếm
            </span>
          }
        >
          <AiOutlineSearch className='h-9 w-9 text-black dark:text-white' />
        </Popover>
      </div>
      <Voice />
    </div>
  )
}

export default Search
