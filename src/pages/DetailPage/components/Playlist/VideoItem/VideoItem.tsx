/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import {BsPlayFill} from 'react-icons/bs'

interface VideoItemProps {
  data: Video
}
const VideoItem = (props: VideoItemProps) => {
  const progressRef = useRef<HTMLDivElement>(null)

  const { data } = props
  console.log(props)


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

  const active = false;

  return (
    <NavLink to={`detail/${data._id}`} 
      className={`${active ? 'bg-[rgba(0,0,0,0.05)] dark:bg-[#212121]' : ''} p-3  lg:ml-[-8px] flex items-center cursor-pointer gap-y-3 w-full hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[#212121]`} 
      role='presentation'
    >
      <BsPlayFill className={`${active ? 'hidden md:flex ' : 'hidden'} max-lg:pr-3  items-center text-4xl px-1 text-[#606060] dark:text-[#CCB4A3]`}/>
      <div className='aspect-video w-40 lg:w-24 h-fit mr-2 rounded-lg'>
        <div className='w-40 lg:w-24 relative overflow-hidden rounded-xl'>
            <img src={data?.thumbnail} alt='thumbnail' className='aspect-video w-40 lg:w-24 object-cover rounded-md ' />
            <span className='absolute right-1 bottom-1 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
              {formatTime(Number(data.duration))}
            </span>
            {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
          </div>
      </div>

      <div className='flex md:w-full items-start gap-x-3'>
        <div className='flex flex-col '>
          <span className='pr-6 text-sm font-semibold text-black line-clamp-2 dark:text-white '>
            {data?.title}
          </span>
          <NavLink
            to={`${data.channel?._id}/channel`}
            className='font-normal text-gray-500 dark:text-gray-400 text-xs '
          >
            {`${(data?.channel as User).fullName}`}
          </NavLink>
        </div>
      </div>
    </NavLink>
  )
}

export default VideoItem
