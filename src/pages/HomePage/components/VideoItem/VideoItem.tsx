/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState, useEffect } from 'react'
import { RxDividerHorizontal } from 'react-icons/rx'
import Video from '../Video'
interface VideoItemProps {
  data: {
    thumbnail: string
    avatar: string
    title: string
    user: string
    view: number
    dataSubmitted: number
    lastPlayedTime: number
    videoDuration: number
  }
}
const VideoItem = (props: VideoItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const { data } = props
  let timeout: NodeJS.Timeout
  
  const handleMouseEnter = () => {
    
    timeout = setTimeout(() => {
      setIsOpen(true)
    }, 500)
  }


  useEffect(() => {
    const valPercent = data.lastPlayedTime / data.videoDuration * 100;
    if(progressRef.current) {
      progressRef.current.style.background = `linear-gradient(to right, red ${valPercent}%, rgba(255, 255, 255, 0.3) ${valPercent}%`
    }
  }, [isOpen]) 

  const handleMouseLeave = () => {
    setIsOpen(false)
    clearTimeout(timeout)
  }

    // Format time
    const formatTime = (duration: number) => {
      const result = new Date(duration * 1000).toISOString().slice(11, 19)
      const hour = result.slice(0, 2)
      const minute = result.slice(3, 5)
      const second = result.slice(6, 8)
      return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
    }

  return (
    <div className='mb-5 flex cursor-pointer flex-col gap-y-3'>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='aspect-video h-full w-full md:rounded-xl'>
        {isOpen ? (
          <div className="">
            <Video lastPlayedTime={data.lastPlayedTime}/>
          </div>
        ) : (
          <div className="relative md:rounded-xl overflow-hidden">
            <img src={data.thumbnail} alt='thumbnail' className='aspect-video w-full md:rounded-xl object-cover' />
            <span className="absolute right-2 bottom-2 px-1 rounded-sm text-xs text-slate-200 bg-[rgba(0,0,0,0.8)]">{formatTime(data.videoDuration)}</span>
            {data.lastPlayedTime != 0 && <div ref={progressRef} className="absolute w-full h-1 bottom-0"></div>}
          </div>
        )}
      </div>

      <div className='flex items-start gap-x-3 px-3 md:px-0'>
        <div className='relative h-8 w-8 flex-shrink-0 '>
          <img src={data.avatar} alt='avartar' className='h-full w-full rounded-full object-cover' />
        </div>
        <div className='flex flex-col gap-y-1'>
          <span className='sm:text-sm lg:text-base sm:font-normal lg:font-bold text-black line-clamp-2 pr-6 mb-1 dark:text-white'>{data.title}</span>
          <span className='sm:text-xs lg:text-sm font-normal text-[#666d74] dark:text-gray-400'>{data.user}</span>
          <div className='flex flex-wrap items-center gap-x-1'>
            <span className='sm:text-xs lg:text-sm font-normal text-[#666d74] dark:text-gray-400'>{data.view} N lượt xem</span>
            <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
            <span className='sm:text-xs lg:text-sm font-normal text-[#666d74] dark:text-gray-400'>
              {data.dataSubmitted} tháng trước
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem
