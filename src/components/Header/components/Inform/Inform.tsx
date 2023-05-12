import React, { useContext, useEffect, useState } from 'react'
import { IoNotificationsOutline, IoNotifications } from 'react-icons/io5'
import { BsBell } from 'react-icons/bs'
import ToolTip from 'src/components/ToolTip'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import { AppContext } from 'src/context/app.context'
import { convertToRelativeTime } from 'src/utils/utils'
import { useNavigate } from 'react-router-dom'

const Inform = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false)
  const { profile } = useContext(AppContext)
  const informRef = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(informRef, () => setIsShow(false))
  const navigate = useNavigate()

  console.log(profile?.notification)

  const handleClick = (item: any) => {
    setIsShow(false)
    navigate(`/detail/${item.id}?category=1`)
  }

  return (
    <>
      <ToolTip position='bottom' content={'Thông báo'}>
        <button
          className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? (
            <IoNotifications className='pointer-events-none h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          ) : (
            <IoNotificationsOutline className='lg:w- pointer-events-none h-5 w-5 text-black dark:text-white lg:h-6' />
          )}
        </button>
        {isShow && (
          <div
            className='absolute top-12 right-0 flex h-[530px] w-[400px] flex-col rounded-xl bg-white p-4 shadow transition-all ease-linear dark:bg-[#282828]'
            ref={informRef}
          >
            <span className='text-left text-base text-black dark:text-white'>Thông báo</span>
            <div className='w-full border-b border-b-gray-400 pt-2'></div>
            {profile?.notification?.length === 0 && (
              <div className='flex h-full w-full flex-col items-center justify-center gap-y-5'>
                <BsBell className='h-28 w-28 text-[#909090] dark:text-[#717171] ' />
                <span className='text-base font-semibold text-[#6a6a6a]'>Thông báo hiển thị ở đây</span>
              </div>
            )}
            {profile?.notification?.map((item, index) => (
              <div
                className='my-5 flex items-start justify-between px-2 py-3'
                key={index}
                role='presentation'
                onClick={() => handleClick(item.video)}
              >
                <img
                  src={item.channel.avatar}
                  alt='avatar'
                  className='h-12 w-12 flex-shrink-0 rounded-full object-cover'
                />
                <div className='flex flex-col items-start'>
                  <span className='w-32 break-words text-xs font-semibold text-black dark:text-white md:text-sm'>
                    {item.video.title}
                  </span>
                  <span className='text-xs text-[#909090] dark:text-[#717171] '>
                    {convertToRelativeTime(item.createdAt)}
                  </span>
                </div>
                <img src={item.video.thumbnail} alt='thumbnail' className='h-14 w-24 flex-shrink-0 rounded-lg' />
              </div>
            ))}
          </div>
        )}
      </ToolTip>
    </>
  )
}

export default Inform
