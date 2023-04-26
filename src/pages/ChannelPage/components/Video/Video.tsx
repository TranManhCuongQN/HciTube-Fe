import { convertDuration, convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import { RxDividerHorizontal } from 'react-icons/rx'
import { useQuery } from 'react-query'
import playListAPI from 'src/api/playlist.api'
import { NavLink, useLocation } from 'react-router-dom'

const Video = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]
  const { data: dataVideo } = useQuery({
    queryKey: ['channelVideo', id],
    queryFn: () => playListAPI.getVideoById(id)
  })

  console.log('dataVideo:', dataVideo)
  return (
    <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 max-lg:grid-cols-2 md:px-20 lg:grid-cols-3 lg:px-40'>
      {(dataVideo?.data.data.length as number) > 0 &&
        dataVideo?.data.data.map((item, index) => (
          <NavLink to={`/detail/${item._id}`} className='flex cursor-pointer flex-col gap-y-2' key={item._id}>
            <div className='relative w-full flex-shrink-0 rounded-lg'>
              <img src={item?.thumbnail} alt='avatar' className='aspect-video w-full rounded-lg object-cover' />
              <div className='absolute bottom-1 right-1 z-40 rounded bg-black p-1 shadow'>
                <span className='text-xs font-semibold text-white'>{convertDuration(item?.duration as string)}</span>
              </div>
            </div>

            <div className='pr-3 md:pr-6'>
              <span className='mb-1 text-sm font-bold text-black line-clamp-2 dark:text-white'>{item?.title}</span>

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
  )
}

export default Video
