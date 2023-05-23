/* eslint-disable jsx-a11y/media-has-caption */

import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import { RxDividerHorizontal } from 'react-icons/rx'
import VideoPlayer from 'src/components/Video'
import playListAPI from 'src/api/playlist.api'
import { useQuery } from 'react-query'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SwiperCustom from './components'
import parse from 'html-react-parser'
import Skeleton from 'src/components/Skeleton'
import path from 'src/constants/path'
import useQueryConfig from 'src/hook/useQueryConfig'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

const Home = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]
  const queryConfig = useQueryConfig()
  const { category } = queryConfig
  const { profile } = useContext(AppContext)

  const {
    data: dataPlayList,
    isLoading: isLoadingPlayList,
    isSuccess: isSuccessPlayList
  } = useQuery({
    queryKey: ['channelPlayList', id],
    queryFn: () => playListAPI.getPlayListById(id)
  })

  const {
    data: dataVideo,
    isLoading: isLoadingVideo,
    isSuccess: isSuccessVideo
  } = useQuery({
    queryKey: ['channelVideo', id],
    queryFn: () => playListAPI.getVideoById(id)
  })

  return (
    <div className='flex flex-col md:px-20 lg:px-40'>
      {isLoadingVideo && (
        <div className='my-6 flex w-full flex-col items-center gap-y-5 lg:mx-auto lg:max-w-[1150px] lg:flex-row'>
          <Skeleton className='h-64 w-full flex-shrink-0 rounded-lg object-cover max-sm:h-52 max-[320px]:h-44 md:w-2/3 md:pr-5 lg:w-[500px]' />

          <div className='flex w-full flex-col items-start justify-center gap-y-5 md:w-2/3 md:px-5'>
            <Skeleton className='h-5 w-full rounded-lg' />
            <Skeleton className='h-5 w-2/3 rounded-lg' />
            <Skeleton className='h-5 w-2/3 rounded-lg' />
          </div>
        </div>
      )}

      {isSuccessVideo && dataVideo.data.data.length > 0 && (
        <div className='mt-6 flex w-full flex-col items-center gap-y-5 lg:mx-auto lg:max-w-[1150px] lg:flex-row'>
          <div className='w-full flex-shrink-0 rounded-lg max-md:h-48 max-sm:h-52 max-[320px]:h-44 md:w-2/3 md:pr-5 lg:h-64 lg:w-[500px] '>
            <VideoPlayer lastPlayedTime={0} urlVideo={dataVideo?.data?.data[0]?.video} />
          </div>
          <div className='flex flex-col items-start justify-center gap-y-1 md:w-2/3 md:px-5 lg:gap-y-5'>
            <span className='text-sm font-bold text-black line-clamp-1 dark:text-white md:text-base'>
              {dataVideo?.data?.data[0]?.title}
            </span>

            <div className='flex flex-wrap items-center gap-x-1'>
              <span className='text-xs  text-[#666d74] dark:text-gray-400 md:text-sm'>
                {convertNumberToDisplayString(dataVideo?.data.data[0].view as number)} lượt xem
              </span>
              <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
              <span className='text-xs  text-[#666d74] dark:text-gray-400 md:text-sm'>
                {convertToRelativeTime(dataVideo?.data?.data[0]?.createdAt as string)}
              </span>
            </div>

            <span
              className='break-words text-xs  text-black dark:text-white max-lg:hidden md:text-sm '
              dangerouslySetInnerHTML={{
                __html: String(parse((dataVideo?.data?.data[0]?.description as string) || ''))
              }}
            ></span>
            <Link
              to={`/detail/${dataVideo?.data.data[0]._id}?category=${category || '1'}`}
              className='text-xs  font-semibold text-black dark:text-white max-lg:hidden'
            >
              ĐỌC THÊM
            </Link>
          </div>
        </div>
      )}

      {isSuccessVideo && profile?._id === id && dataVideo.data.data.length === 0 && (
        <div className='flex h-full w-full items-center justify-center'>
          <div className='flex h-full flex-col items-center justify-center gap-y-3 max-lg:hidden'>
            <div className='h-48 w-48'>
              <img
                src='https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg'
                alt='avatar-home'
                className='h-full w-full object-cover'
              />
            </div>
            <span className='text-base font-semibold text-black dark:text-white'>Tải một video lên để bắt đầu</span>
            <span className='text-sm text-gray-500'>
              Bắt đầu chia sẻ câu chuyện của bạn và kết nối với người xem. Các video mà bạn tải lên sẽ xuất hiện ở đây.
            </span>
            <Link
              to={path.upload}
              className='rounded-xl bg-blue-700 p-2 text-sm font-semibold text-white dark:bg-blue-400 dark:text-black'
            >
              Tải video lên
            </Link>
          </div>
          <div className='flex h-56 w-full flex-col items-center justify-center lg:hidden'>
            <span className='text-base font-semibold text-black dark:text-white'>
              Hiện tại chỉ hỗ trợ upload video trên desktop
            </span>
          </div>
        </div>
      )}

      {isSuccessVideo && dataVideo.data.data.length === 0 && profile?.id !== id && (
        <div className='flex h-72 w-full items-center justify-center'>
          <span className='text-sm font-semibold text-black dark:text-white md:text-lg'>
            Không có video nào được đăng tải
          </span>
        </div>
      )}

      {/* //* VideoList */}
      {isLoadingPlayList &&
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <div className='my-6 h-[1px] w-full bg-gray-500'></div>
              <div className='flex w-full items-center justify-start gap-x-2'>
                <Skeleton className='h-5 w-28 rounded-lg max-lg:px-2 ' />
                <Skeleton className='ml-5 h-7 w-36 rounded-xl' />
              </div>
              <Skeleton className='my-5 h-10 w-full rounded-lg max-lg:px-2 max-sm:h-8' />
              <div className='flex items-center justify-between max-lg:hidden'>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div className='flex flex-col gap-y-3' key={index}>
                      <Skeleton className='h-[130px] w-[220px] rounded-lg' />
                      <Skeleton className='h-5 w-56 rounded-md' />
                      <Skeleton className='h-5 w-32 rounded-md' />
                    </div>
                  ))}
              </div>
              <div className='flex items-center justify-between max-md:hidden lg:hidden'>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div className='flex flex-col gap-y-3' key={index}>
                      <Skeleton className='h-[130px] w-[200px] rounded-lg' />
                      <Skeleton className='h-5 w-44 rounded-md' />
                      <Skeleton className='h-5 w-28 rounded-md' />
                    </div>
                  ))}
              </div>
              <div className='flex items-center justify-between md:hidden'>
                {Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <div className='flex flex-col gap-y-3' key={index}>
                      <Skeleton className='h-[130px] w-[170px] rounded-lg' />
                      <Skeleton className='h-5 w-40 rounded-md' />
                      <Skeleton className='h-5 w-28 rounded-md' />
                    </div>
                  ))}
              </div>
            </div>
          ))}

      {isSuccessPlayList &&
        (dataPlayList?.data.data.length as number) > 0 &&
        dataPlayList?.data.data.map((item, index) => <SwiperCustom key={index} dataVideo={item} />)}
    </div>
  )
}

export default Home
