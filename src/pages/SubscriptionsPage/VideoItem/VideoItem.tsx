/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useQueryConfig from 'src/hook/useQueryConfig'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import { convertToRelativeTime } from 'src/utils/utils'

interface VideoItemProps {
  data: Video
}
const VideoItem = (props: VideoItemProps) => {
  const progressRef = useRef<HTMLDivElement>(null)
  const queryConfig = useQueryConfig()
  const { category } = queryConfig

  const { data } = props

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
    <Link
      to={`/detail/${data._id}?category=${category || '1'}`}
      className='mb-5 col-span-1 w-40 sm:w-full flex md:flex-1 cursor-pointer flex-col gap-y-3'
      role='presentation'
    >
      <div className='aspect-video h-fit w-40 sm:w-full md:rounded-xl'>
        <div className='relative overflow-hidden rounded-xl'>
          <img src={data?.thumbnail} alt='thumbnail' className='aspect-video w-full object-cover md:rounded-xl' />
          <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
            {formatTime(Number(data?.duration))}
          </span>
          {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
        </div>
      </div>

      <div className='flex w-40 items-start gap-x-3 sm:w-full'>
        <div className='flex flex-col text-sm'>
          <span className='mb-1 pr-6 font-bold text-black line-clamp-2 dark:text-white '>{data?.title}</span>
          <Link
            to={`/${data.channel?._id}/channel`}
            className='text-xs font-semibold text-gray-500 dark:text-gray-400'
          >
            {(data?.channel as User).fullName}
          </Link>
          <div className='flex flex-wrap items-center gap-x-1'>
            <span className='text-xs font-semibold text-gray-500 line-clamp-1 dark:text-gray-400'>
              {`${data?.view} lượt xem - ${convertToRelativeTime(data?.createdAt as string)}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
  
export default VideoItem
