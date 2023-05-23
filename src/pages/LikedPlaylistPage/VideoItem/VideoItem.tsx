/* eslint-disable jsx-a11y/media-has-caption */
import { omit } from 'lodash'
import { useRef, useEffect, useContext } from 'react'
import { Link, useNavigate, createSearchParams } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import useQueryConfig from 'src/hook/useQueryConfig'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import { convertToRelativeTime } from 'src/utils/utils'

interface VideoItemProps {
  data: Video
  index: number
}
const VideoItem = (props: VideoItemProps) => {
  const queryConfig = useQueryConfig()
  const { category } = queryConfig
  const { profile } = useContext(AppContext)
  const progressRef = useRef<HTMLDivElement>(null)
  const { data, index } = props
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      pathname: `/detail/${data._id}`,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            favorite: profile?._id as string,
            category: category || ('1' as string)
          },
          ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList']
        )
      ).toString()
    })
  }

  let timeout: NodeJS.Timeout

  useEffect(() => {
    const valPercent = ((data?.watchTime as number) / Number(data.duration)) * 100
    if (progressRef.current) {
      progressRef.current.style.background = `linear-gradient(to right, red ${valPercent}%, rgba(255, 255, 255, 0.3) ${valPercent}%`
    }
  }, [data.watchTime, data.duration])

  // Format time
  const formatTime = (duration: number) => {
    if (duration) {
      const result = new Date(duration * 1000).toISOString()?.slice(11, 19)
      const hour = result.slice(0, 2)
      const minute = result.slice(3, 5)
      const second = result.slice(6, 8)
      return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
    }
    return '00:00'
  }

  return (
    <div
      onClick={handleClick}
      className=' flex w-full cursor-pointer gap-y-3 rounded-xl p-2 hover:bg-[#F2F2F2] dark:hover:bg-[#272727] lg:p-3'
      role='presentation'
    >
      <span className='flex items-center pr-2 text-sm font-semibold text-[#606060] lg:pr-3 '>{index + 1}</span>
      <div className='mr-2 aspect-video h-fit w-40 rounded-lg lg:w-64'>
        <div className='relative w-40 overflow-hidden rounded-xl lg:w-64'>
          <img src={data?.thumbnail} alt='thumbnail' className='aspect-video w-40 object-cover md:rounded-xl lg:w-64' />
          <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
            {formatTime(Number(data?.duration))}
          </span>
          {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
        </div>
      </div>

      <div className='flex w-40 items-start gap-x-3 md:w-full'>
        <div className='flex flex-col '>
          <span className='mb-2 pr-6 text-base font-semibold text-black line-clamp-2 dark:text-white '>
            {data?.title}
          </span>
          <Link
            to={`/${data.channel?._id}/channel`}
            className='text-xs font-normal text-gray-500 dark:text-gray-400 lg:hidden '
          >
            {`${(data?.channel as User).fullName}`}
          </Link>
          <Link
            to={`/${data.channel?._id}/channel`}
            className='hidden text-xs font-normal text-gray-500 dark:text-gray-400 lg:flex '
          >
            {`${(data?.channel as User).fullName} - ${data?.view} lượt xem - ${convertToRelativeTime(
              data?.createdAt as string
            )}`}
          </Link>
          {/* <div className='flex flex-wrap items-center gap-x-1'>
            <span className='font-normal line-clamp-1 text-gray-500 dark:text-gray-400 text-[11px]'>
              {`${data?.view} lượt xem - ${convertToRelativeTime(data?.createdAt as string)}`}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default VideoItem
