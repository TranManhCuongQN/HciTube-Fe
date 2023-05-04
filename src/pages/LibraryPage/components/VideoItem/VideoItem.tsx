/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect } from 'react'
import { RxDividerHorizontal } from 'react-icons/rx'
import { NavLink, Link } from 'react-router-dom'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import { convertToRelativeTime } from 'src/utils/utils'

interface VideoItemProps {
  data: Video
}
const VideoItem = (props: VideoItemProps) => {
  const progressRef = useRef<HTMLDivElement>(null)

  const { data } = props
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
    <NavLink to={`detail/${data._id}`} className='mb-5 flex cursor-pointer flex-col gap-y-3 max-md:min-w-fit md:w-60 lg:w-[265px]' role='presentation'>
      <div
        className='aspect-video w-40 md:w-full h-fit md:rounded-xl'
      >
        <div className='relative overflow-hidden rounded-xl'>
            <img src={data?.thumbnail} alt='thumbnail' className='aspect-video w-full object-cover md:rounded-xl' />
            <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
              {formatTime(Number(data?.duration))}
            </span>
            {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
          </div>
      </div>

      <div className='flex w-40 md:w-full items-start gap-x-3'>
        <div className='flex flex-col text-[13px]'>
          <span className='mb-1 pr-6 font-semibold text-black line-clamp-2 dark:text-white '>
            {data?.title}
          </span>
          <NavLink
            to={`${data.channel?._id}/channel`}
            className='font-normal text-gray-500 dark:text-gray-400 text-[11px]'
          >
            {(data?.channel as User).fullName}
          </NavLink>
          <div className='flex flex-wrap items-center gap-x-1'>
            <span className='font-normal line-clamp-1 text-gray-500 dark:text-gray-400 text-[11px]'>
              {`${data?.view} lượt xem - ${convertToRelativeTime(data?.createdAt as string)}`}
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default VideoItem
