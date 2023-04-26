/* eslint-disable jsx-a11y/media-has-caption */

import { convertNumberToDisplayString } from 'src/utils/utils'
import { RxDividerHorizontal } from 'react-icons/rx'

import playListAPI from 'src/api/playlist.api'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import SwiperCustom from './components'

const Home = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]

  const { data: dataPlayList } = useQuery({
    queryKey: ['channelPlayList', id],
    queryFn: () => playListAPI.getPlayListById(id)
  })

  return (
    <div className='flex flex-col md:px-20 lg:px-40'>
      {/* //* Introduction */}
      <div className='mt-6 flex w-full flex-col items-center gap-y-5 lg:mx-auto lg:max-w-[1150px] lg:flex-row'>
        <div className='w-full flex-shrink-0 rounded-lg max-md:h-48 max-sm:h-52 max-[320px]:h-44 md:w-2/3 md:pr-5 lg:h-64 lg:w-[500px] '>
          <video
            src='https://res.cloudinary.com/dnmazjnlr/video/upload/v1679565900/samples/Video/y2mate.com_-_Playlistth%E1%BB%8F_7_m%C3%A0u_nh%E1%BA%A1c_relax_gi%C3%B3_c%C3%B4_g%C3%A1i_n%C3%A0y_c%E1%BB%A7a_ai_y%C3%AAu_anh_%C4%91i_m%E1%BA%B9_anh_b%C3%A1n_b%C3%A1nh_l%C3%A0_anh_tan_720pFHR_rrwkta.mp4'
            className='aspect-video h-full w-full rounded-lg object-cover'
            controls
          />
        </div>
        <div className='flex flex-col items-start justify-center gap-y-1 md:w-2/3 md:px-5 lg:gap-y-5'>
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

          <span className='break-words text-xs  text-black dark:text-white max-lg:hidden md:text-sm '>
            ♬ Playlist : Lofi - Chill: Nụ Cười Em Là Nắng, Chạy Về Khóc Với Anh,... ♪ Design by Tuyen Orinn ♪ Background
            - Sưu Tầm Mọi người ủng hộ mình sớm đạt được 10.000 Subscribers nhé!
          </span>

          <button className='text-xs  font-semibold text-black dark:text-white max-lg:hidden'>ĐỌC THÊM</button>
        </div>
      </div>

      {/* //* VideoList */}
      {(dataPlayList?.data.data.length as number) > 0 &&
        dataPlayList?.data.data.map((item, index) => <SwiperCustom key={index} dataVideo={item} />)}
    </div>
  )
}

export default Home
