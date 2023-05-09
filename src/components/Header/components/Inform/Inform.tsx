import React, { useContext, useEffect, useState } from 'react'
import { IoNotificationsOutline, IoNotifications } from 'react-icons/io5'
import { BsBell } from 'react-icons/bs'
import ToolTip from 'src/components/ToolTip'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import socket from 'src/api/socket'
import { AppContext } from 'src/context/app.context'

const Inform = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false)
  const { isVerify } = useContext(AppContext)
  const informRef = React.useRef<HTMLButtonElement>(null)
  useOnClickOutside(informRef, () => setIsShow(false))
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [events, setEvents] = useState([])

  return (
    <>
      <ToolTip position='bottom' content={'Thông báo'}>
        <button
          className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
          onClick={() => setIsShow(!isShow)}
          ref={informRef}
        >
          {isShow ? (
            <IoNotifications className='pointer-events-none h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          ) : (
            <IoNotificationsOutline className='lg:w- pointer-events-none h-5 w-5 text-black dark:text-white lg:h-6' />
          )}
        </button>
        {isShow && (
          <div className='absolute top-12 right-0 flex h-[530px] w-[400px] flex-col rounded-xl bg-white p-4 shadow transition-all ease-linear dark:bg-[#282828]'>
            <span className='text-left text-base text-black dark:text-white'>Thông báo</span>
            <div className='w-full border-b border-b-gray-400 pt-2'></div>
            <div className='flex h-full w-full flex-col items-center justify-center gap-y-5'>
              <BsBell className='h-28 w-28 text-[#909090] dark:text-[#717171] ' />
              <span className='text-base font-semibold text-[#6a6a6a]'>Thông báo hiển thị ở đây</span>
            </div>
          </div>
        )}
      </ToolTip>
    </>
  )
}

export default Inform
