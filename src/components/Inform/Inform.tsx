import React from 'react'
import Popover from '../Popover'
import { IoNotificationsOutline } from 'react-icons/io5'
const Inform = () => {
  return (
    <>
      <Popover
        className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
        renderPopover={
          <span className='z-50 mt-5 block h-full rounded-lg bg-gray-500 px-2 py-2 text-xs font-semibold'>
            Thông báo
          </span>
        }
      >
        <IoNotificationsOutline className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
      </Popover>
    </>
  )
}

export default Inform
