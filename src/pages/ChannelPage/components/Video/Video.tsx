import { convertDuration, convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import { RxDividerHorizontal } from 'react-icons/rx'
import { useQuery } from 'react-query'
import playListAPI from 'src/api/playlist.api'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Skeleton from 'src/components/Skeleton'
import path from 'src/constants/path'

const Video = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]
  const {
    data: dataVideo,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['channelVideo', id],
    queryFn: () => playListAPI.getVideoById(id)
  })

  console.log('dataVideo:', dataVideo)
  return (
    <>
      {isLoading && (
        <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 max-lg:grid-cols-2 max-[320px]:grid-cols-1 md:px-20 lg:grid-cols-3 lg:px-40'>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div className='flex flex-col gap-y-3' key={index}>
                <Skeleton className='h-[130px] w-[220px] rounded-lg max-md:w-[170px]' />
                <Skeleton className='h-5 w-56 rounded-md max-md:w-40' />
                <Skeleton className='h-5 w-32 rounded-md max-md:w-20' />
              </div>
            ))}
        </div>
      )}
      {isSuccess && dataVideo.data.data.length > 0 && (
        <>
          <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 max-lg:grid-cols-2 md:px-20 lg:grid-cols-3 lg:px-40'>
            {(dataVideo?.data.data.length as number) > 0 &&
              dataVideo?.data.data.map((item, index) => (
                <NavLink to={`/detail/${item._id}`} className='flex cursor-pointer flex-col gap-y-2' key={item._id}>
                  <div className='relative w-full flex-shrink-0 rounded-lg'>
                    <img src={item?.thumbnail} alt='avatar' className='aspect-video w-full rounded-lg object-cover' />
                    <div className='absolute bottom-1 right-1 z-40 rounded bg-black p-1 shadow'>
                      <span className='text-xs font-semibold text-white'>
                        {convertDuration(Number(item?.duration as string))}
                      </span>
                    </div>
                  </div>

                  <div className='pr-3 md:pr-6'>
                    <span className='mb-1 text-sm font-bold text-black line-clamp-2 dark:text-white'>
                      {item?.title}
                    </span>

                    <div className='flex flex-wrap items-center gap-x-1'>
                      <span className='text-xs  text-[#666d74] dark:text-gray-400 '>
                        {convertNumberToDisplayString(item?.view as number)} lượt xem
                      </span>
                      <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                      <span className='text-xs  text-[#666d74] dark:text-gray-400 '>
                        {convertToRelativeTime(item?.createdAt as string)}
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        </>
      )}
      {isSuccess && dataVideo.data.data.length === 0 && (
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
    </>
  )
}

export default Video
