/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import VideoPlayer from '../Video'
import { Video } from 'src/types/video.type'
import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import parse from 'html-react-parser'

interface VideoItemProps {
  data: Video
}
const VideoItem = ({ data }: VideoItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const progressRef = useRef<HTMLDivElement>(null)

  let timeout: NodeJS.Timeout

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setIsOpen(true)
    }, 1000)
  }

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

  useEffect(() => {
    const valPercent = (Math.round(data?.watchTime as number) / Math.round(Number(data.duration))) * 100

    if (progressRef.current) {
      progressRef.current.style.background = `linear-gradient(to right, red ${valPercent}%, rgba(255, 255, 255, 0.3) ${valPercent}%`
    }
  }, [isOpen, data.watchTime, data.duration])

  return (
    <NavLink
      to={`/detail/${data._id}`}
      className='mt-4 flex  cursor-pointer flex-col lg:flex-row'
      role='presentation'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='flex aspect-video h-full w-full md:rounded-xl lg:w-[360px]'>
        {isOpen ? (
          <div
            className='video-animation--fast relative w-full overflow-hidden md:rounded-xl lg:w-[360px]'
            role='presentation'
          >
            <VideoPlayer lastPlayedTime={data?.watchTime as number} urlVideo={data?.video as string} />
            {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
          </div>
        ) : (
          <div className='relative w-full  overflow-hidden md:rounded-xl lg:w-[360px]'>
            <img
              src={data?.thumbnail}
              alt='thumbnail'
              className='aspect-video  w-full object-cover  md:rounded-xl lg:w-[360px]'
            />
            <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
              {formatTime(Number(data?.duration))}
            </span>
            {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
          </div>
        )}
      </div>

      <div className='my-2 flex flex-col lg:ml-4'>
        <div className='flex items-start pl-3 lg:hidden'>
          <img src={data?.channel?.avatar} alt='' className='mr-3 h-10 w-10 rounded-full md:h-14 md:w-14' />
          <div className='pr-10 '>
            <h1 className='text-sm font-medium text-black line-clamp-2 dark:text-white md:text-xl'>{data?.title}</h1>
            <div className='flex flex-col gap-y-1 text-xs font-semibold text-gray-500 dark:text-gray-400 md:text-base '>
              <span className='line-clamp-2'>
                {' '}
                {convertNumberToDisplayString(data?.view as number)} người xem -{' '}
                {convertToRelativeTime(data?.createdAt as string)}{' '}
              </span>
            </div>
          </div>
        </div>

        <div className='hidden flex-col lg:flex'>
          <h1 className='text-lg font-semibold text-black line-clamp-2 dark:text-white '>{data?.title}</h1>
          <div className='flex flex-col text-xs font-medium text-gray-700 dark:text-gray-400 '>
            <span>
              {convertNumberToDisplayString(data?.view as number)} người xem -{' '}
              {convertToRelativeTime(data?.createdAt as string)}
            </span>
            <div className='flex items-center py-3'>
              <img src={data.channel?.avatar} alt='' className='mr-3 h-6 w-6 rounded-full' />
              <span className='block '>{data.channel?.fullName}</span>
            </div>
            <span
              className='mb-2 block line-clamp-2'
              dangerouslySetInnerHTML={{ __html: String(parse(data?.description as string) || '') }}
            ></span>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default VideoItem
