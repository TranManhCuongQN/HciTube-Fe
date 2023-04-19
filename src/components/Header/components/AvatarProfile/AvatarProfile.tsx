import React, { useContext, useState } from 'react'
import AvatarLetter from 'src/components/AvatarLetter'
import { AppContext } from 'src/context/app.context'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { BsBarChartLineFill } from 'react-icons/bs'
import { AiOutlineProfile } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { CgWindows } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

const AvatarProfile = () => {
  const { profile } = useContext(AppContext)
  const [isShow, setIsShow] = useState<boolean>(false)
  const avatarRef = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(avatarRef, () => setIsShow(false))
  return (
    <>
      <div
        className=' relative h-8 w-8 cursor-pointer rounded-full lg:h-10 lg:w-10 '
        onClick={() => setIsShow(!isShow)}
        role='presentation'
        ref={avatarRef}
      >
        {profile?.avatar ? (
          <img src={profile?.avatar} alt='avatar' className='h-full w-full rounded-full object-cover' />
        ) : (
          <AvatarLetter className='h-full w-full' name={profile?.fullName as string} />
        )}

        {isShow && (
          <div className='absolute top-11 right-5 flex w-[250px] flex-col justify-start gap-y-5 rounded-lg bg-[#ffffff] shadow dark:bg-[#282828] '>
            <div className='flex items-center gap-x-5 border-b-2 border-gray-400 p-2'>
              <div className='h-9 w-9'>
                {profile?.avatar ? (
                  <img src={profile?.avatar} alt='avatar' className='h-full w-full rounded-full object-cover' />
                ) : (
                  <AvatarLetter className='h-full w-full' name={profile?.fullName as string} />
                )}
              </div>
              <span className='text-sm font-semibold text-black dark:text-white md:text-base'>{profile?.fullName}</span>
            </div>

            <Link
              to={path.profile}
              className='flex items-center gap-x-6  py-2 hover:bg-[#f2f2f2] dark:hover:bg-red-500'
            >
              <AiOutlineProfile className='ml-4 h-6 w-6 text-black dark:text-white ' />
              <span className='text-sm font-medium text-black dark:text-white'>Trang hồ sơ</span>
            </Link>

            <Link to={path.upload} className='flex items-center gap-x-6  py-2 hover:bg-[#f2f2f2] dark:hover:bg-red-500'>
              <CgWindows className='ml-4 h-6 w-6 text-black dark:text-white ' />
              <span className='text-sm font-medium text-black dark:text-white'>Trang tổng quản</span>
            </Link>

            <Link
              to={path.content}
              className='flex items-center gap-x-6  py-2 hover:bg-[#f2f2f2] dark:hover:bg-red-500'
            >
              <MdOutlineVideoLibrary className='ml-4 h-6 w-6 text-black dark:text-white' />
              <span className='text-sm font-medium text-black dark:text-white'>Nội dung</span>
            </Link>

            <Link
              to={path.analytics}
              className='flex items-center gap-x-6  py-2 hover:bg-[#f2f2f2] dark:hover:bg-red-500'
            >
              <BsBarChartLineFill className='ml-4 h-6 w-6 text-black dark:text-white' />
              <span className='text-sm font-medium text-black dark:text-white'>Số liệu phân tích</span>
            </Link>

            <Link
              to={path.changePassword}
              className='mb-5 flex items-center gap-x-6 py-2 hover:bg-[#f2f2f2] dark:hover:bg-red-500'
            >
              <RiLockPasswordLine className='ml-4 h-6 w-6 text-black dark:text-white ' />
              <span className='text-sm font-medium text-black dark:text-white'>Đổi mật khẩu</span>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default AvatarProfile
