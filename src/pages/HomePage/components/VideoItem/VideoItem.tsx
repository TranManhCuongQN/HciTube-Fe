/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState, useEffect } from 'react'
import { RxDividerHorizontal } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import useQueryConfig from 'src/hook/useQueryConfig'
import VideoPlayer from 'src/pages/HomePage/components/Video'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import { convertToRelativeTime } from 'src/utils/utils'

interface VideoItemProps {
  data: Video
}
const VideoItem = (props: VideoItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const queryConfig = useQueryConfig()
  const { category } = queryConfig

  const { data } = props
  let timeout: NodeJS.Timeout

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      if (isOpen) return
      setIsOpen(true)
    }, 500)
  }

  useEffect(() => {
    const valPercent = ((data?.watchTime as number) / Number(data.duration)) * 100
    if (progressRef.current) {
      progressRef.current.style.background = `linear-gradient(to right, red ${valPercent}%, rgba(255, 255, 255, 0.3) ${valPercent}%`
    }
  }, [isOpen, data.watchTime, data.duration])

  const handleMouseLeave = () => {
    setIsOpen(false)
    clearTimeout(timeout)
  }

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
      to={`detail/${data._id}?category=${category || '1'}`}
      className='mb-5 flex cursor-pointer flex-col gap-y-3'
      role='presentation'
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='aspect-video h-fit w-full md:rounded-xl'
      >
        {isOpen ? (
          <div className='video-animation' role='presentation'>
            <VideoPlayer lastPlayedTime={data?.watchTime as number} urlVideo={data?.video as string} />
          </div>
        ) : (
          <div className='relative overflow-hidden md:rounded-xl'>
            <img src={data?.thumbnail} alt='thumbnail' className='aspect-video w-full object-cover md:rounded-xl' />
            <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
              {formatTime(Number(data?.duration))}
            </span>
            {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
          </div>
        )}
      </div>

      <div className='flex items-start gap-x-3 px-3 md:px-0'>
        <Link to={`${data.channel?._id}/channel`} className='relative h-8 w-8 flex-shrink-0 '>
          <img src={(data?.channel as User).avatar} alt='avartar' className='h-full w-full rounded-full object-cover' />
        </Link>
        <div className='flex flex-col'>
          <span className='mb-1 pr-6 font-semibold text-black line-clamp-2 dark:text-white sm:text-sm md:font-bold lg:text-base'>
            {data?.title}
          </span>
          <Link
            to={`${data.channel?._id}/channel`}
            className='font-normal text-gray-500 dark:text-gray-400 sm:text-xs lg:text-sm'
          >
            {(data?.channel as User).fullName}
          </Link>
          <div className='flex flex-wrap items-center gap-x-1'>
            <span className='font-normal text-gray-500 dark:text-gray-400 sm:text-xs lg:text-sm'>
              {data?.view} lượt xem
            </span>
            <RxDividerHorizontal className='h-3 w-3 text-gray-500 dark:text-gray-400' />
            <span className='font-normal text-gray-500 dark:text-gray-400 sm:text-xs lg:text-sm'>
              {convertToRelativeTime(data?.createdAt as string)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoItem
