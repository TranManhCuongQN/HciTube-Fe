/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import { BsPlayFill } from 'react-icons/bs'
import useQueryConfig from 'src/hook/useQueryConfig'

interface VideoItemProps {
  data: Video
}
const VideoItem = (props: VideoItemProps) => {
  const progressRef = useRef<HTMLDivElement>(null)
  const queryConfig = useQueryConfig()
  const location = useLocation();
  const { playList, category } = queryConfig
  let active = false
  const { data } = props


  if(location.pathname.split('/')[2] == data._id) active = true;


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
      to={`/detail/${data._id}?playList=${playList}&category=${category || '1'}`}
      className={`${
        active ? 'bg-[rgba(0,0,0,0.05)] dark:bg-[#212121]' : ''
      } flex  w-full cursor-pointer items-center gap-y-3 py-3 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[#212121]`}
      role='presentation'
    >
      <BsPlayFill
        className={`${
          active ? 'opacity-1 ' : 'opacity-0'
        } flex justify-center mx-1 items-center min-w-[24px] text-[#606060] dark:text-[#CCB4A3]`}
      />
      <div className='mr-2 aspect-video h-fit w-40 rounded-lg lg:w-24 '>
        <div className='relative w-40 overflow-hidden rounded-xl lg:w-24'>
          <img src={data?.thumbnail} alt='thumbnail' className='aspect-video w-40 rounded-md object-cover lg:w-24 ' />
          <span className='absolute right-1 bottom-1 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
            {formatTime(Number(data.duration))}
          </span>
          {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
        </div>
      </div>

      <div className='flex items-start gap-x-3 md:w-full'>
        <div className='flex flex-col '>
          <span className='pr-10 text-sm font-semibold text-black line-clamp-2 whitespace-normal dark:text-white'>{data?.title}</span>
          <div className='text-xs font-normal text-gray-500 dark:text-gray-400 '>
            {`${(data?.channel as User).fullName}`}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoItem
