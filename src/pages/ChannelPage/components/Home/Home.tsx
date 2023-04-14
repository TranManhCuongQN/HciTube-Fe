/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import React from 'react'
import { convertNumberToDisplayString } from 'src/utils/utils'
import { RxDividerHorizontal } from 'react-icons/rx'
const Home = () => {
  return (
    <div className='my-10 flex flex-col'>
      <div className='flex w-full flex-col gap-y-5 px-3 md:w-10/12 md:flex-row md:gap-x-5 lg:mx-10'>
        <div className='w-full flex-shrink-0 rounded-lg max-md:h-52 max-[320px]:h-44 md:w-1/2 '>
          <video
            src='https://res.cloudinary.com/dnmazjnlr/video/upload/v1679565900/samples/Video/y2mate.com_-_Playlistth%E1%BB%8F_7_m%C3%A0u_nh%E1%BA%A1c_relax_gi%C3%B3_c%C3%B4_g%C3%A1i_n%C3%A0y_c%E1%BB%A7a_ai_y%C3%AAu_anh_%C4%91i_m%E1%BA%B9_anh_b%C3%A1n_b%C3%A1nh_l%C3%A0_anh_tan_720pFHR_rrwkta.mp4'
            className='aspect-video h-full w-full rounded-lg object-cover'
            controls
          />
        </div>
        <div className='flex flex-col items-start gap-y-3 lg:gap-y-5'>
          <span className='text-sm font-bold text-black line-clamp-1 dark:text-white md:text-base'>
            Người Yêu Ơi Anh Đi Nhé...Bình Yên Bên Ai Em Nhé Lofi - Anh Đi Nhé Lofi | Nhạc Lofi Hot Tiktok 2023
          </span>

          <div className='flex flex-wrap items-center gap-x-1'>
            <span className='text-xs  text-[#666d74] dark:text-gray-400 md:text-sm'>
              {convertNumberToDisplayString(10000)} lượt xem
            </span>
            <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
            <span className='text-xs  text-[#666d74] dark:text-gray-400 md:text-sm'>3 tháng trước</span>
          </div>

          <span className='break-words text-xs  text-black dark:text-white md:text-sm'>
            Người Yêu Ơi Anh Đi Nhé...Bình Yên Bên Ai Em Nhé Lofi - Anh Đi Nhé Lofi | Nhạc Lofi Hot Tiktok 2023
          </span>

          <button className='text-xs  font-semibold text-black dark:text-white'>ĐỌC THÊM</button>
        </div>
      </div>
      <div className='my-5 mx-10 h-[1px] w-10/12 bg-gray-500 '></div>
    </div>
  )
}

export default Home
