import React from 'react'
import Popover from '../Popover'
import { IoNotificationsOutline, IoNotifications } from 'react-icons/io5'
import { BsBell } from 'react-icons/bs'
import { useClickOutSide } from 'src/hook/useClickOutSide'
const Inform = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false)
  const inforRef = React.useRef<HTMLDivElement>(null)
  useClickOutSide(inforRef.current, () => setIsShow(false))

  return (
    <>
      <Popover
        className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
        renderPopover={
          <span className='z-50 mt-5 block h-full rounded-lg bg-gray-500 px-2 py-2 text-xs font-semibold'>
            Thông báo
          </span>
        }
        handleClick={() => setIsShow(!isShow)}
      >
        {isShow ? (
          <IoNotifications className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
        ) : (
          <IoNotificationsOutline className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
        )}

        {isShow && (
          <div
            className='absolute top-12 right-0 flex h-[530px] w-[400px] flex-col rounded-xl bg-white p-4 shadow transition-all ease-linear dark:bg-[#282828]'
            ref={inforRef}
          >
            <span className='text-left text-base text-black dark:text-white'>Thông báo</span>
            <div className='w-full border-b border-b-gray-400 pt-2'></div>
            <div className='flex h-full w-full flex-col items-center justify-center gap-y-5'>
              <BsBell className='h-28 w-28 text-[#909090] dark:text-[#717171] ' />
              <span className='text-base font-semibold text-[#6a6a6a]'>Thông báo hiển thị ở đây</span>
            </div>
          </div>
        )}
      </Popover>
    </>
  )
}

export default Inform
