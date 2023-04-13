import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { convertNumberToDisplayString } from 'src/utils/utils'
import AsideBar from '../HomePage/components/AsideBar'
import { AiOutlineRight } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import classNames from 'classnames'
import { useState } from 'react'

const ChannelPage = () => {
  const [choose, setChoose] = useState<string>('channel')
  return (
    <div className='container flex gap-x-20 bg-[#ffffff] pl-2 pr-2 dark:bg-[#0f0f0f] lg:px-8'>
      <AsideBar />
      <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
        <div className='h-52 w-full'>
          <img
            src='https://i.pinimg.com/564x/17/3f/fc/173ffca741ea25ef06278e74ddf89ff0.jpg'
            alt='thumbnail'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='mx-10 mt-5 flex flex-wrap items-center justify-between gap-y-2'>
          <div className='flex items-center gap-x-5'>
            <div className='h-32 w-32 rounded-full max-md:h-24 max-md:w-24'>
              <img
                src='https://i.pinimg.com/736x/47/ce/d6/47ced656facf572c471fde541c60faa8.jpg'
                alt='avatar'
                className='h-full w-full flex-shrink-0 rounded-full object-cover'
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <span className='text-base font-semibold text-black dark:text-white md:text-lg'>Tips JavaScript</span>
              <div className='flex items-center gap-x-4'>
                <span className='text-xs font-semibold text-[#8e8883] md:text-sm'>
                  {convertNumberToDisplayString(16000)} người đăng ký
                </span>
                <span className='text-xs font-semibold text-[#8e8883] md:text-sm'>
                  {convertNumberToDisplayString(254)} video
                </span>
              </div>
              <NavLink
                to={path.about}
                className='flex items-center gap-x-2 text-xs font-semibold text-[#8e8883] md:text-sm'
              >
                About Tips Javascript!
                <AiOutlineRight className='h-4 w-4 text-black dark:text-white' />
              </NavLink>
            </div>
          </div>
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] py-2 px-4 text-xs font-semibold dark:bg-[#272727] dark:text-white md:text-sm'>
            <IoMdNotificationsOutline className='h-6 w-6 text-black dark:text-white' />
            Đã đăng ký
          </button>
        </div>
        <div className='mx-10 mt-5 flex items-center gap-x-16 border-b border-b-gray-400'>
          <button
            className={classNames(`p-3 text-xs font-semibold dark:text-white md:text-sm`, {
              'border-b-2 border-b-black font-semibold text-black dark:text-white': choose === 'channel',
              'text-gray-500': choose !== 'channel'
            })}
            type='button'
            onClick={() => setChoose('channel')}
          >
            TRANG CHỦ
          </button>
          <button
            className={classNames(`p-3 text-xs font-semibold dark:text-white md:text-sm`, {
              'border-b-2 border-b-black font-semibold text-black dark:text-white': choose === 'video',
              'text-gray-500': choose !== 'video'
            })}
            type='button'
            onClick={() => setChoose('video')}
          >
            VIDEO
          </button>
          <button
            className={classNames(`p-3 text-xs font-semibold dark:text-white md:text-sm`, {
              'border-b-2 border-b-black font-semibold text-black dark:text-white': choose === 'playlist',
              'text-gray-500': choose !== 'playlist'
            })}
            type='button'
            onClick={() => setChoose('playlist')}
          >
            DANH SÁCH PHÁT
          </button>
          <button
            className={classNames(`p-3 text-xs font-semibold dark:text-white md:text-sm`, {
              'border-b-2 border-b-black font-semibold text-black dark:text-white': choose === 'about',
              'text-gray-500': choose !== 'about'
            })}
            type='button'
            onClick={() => setChoose('about')}
          >
            GIỚI THIỆU
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChannelPage
