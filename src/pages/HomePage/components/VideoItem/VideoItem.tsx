/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState } from 'react'
import { RxDividerHorizontal } from 'react-icons/rx'
import Video from './Video'
interface VideoItemProps {
  data: {
    thumbnail: string
    avatar: string
    title: string
    user: string
    view: number
    dataSubmitted: number
    lastPlayedTime: number
  }
}
const VideoItem = (props: VideoItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { data } = props
  let timeout: NodeJS.Timeout
  
  const handleMouseEnter = () => {
    setIsOpen(true)
    if (videoRef.current) {
      videoRef.current.currentTime = data.lastPlayedTime
      if (videoRef.current.currentTime === videoRef.current.duration) {
        videoRef.current.currentTime = 0
      }
    }

    timeout = setTimeout(() => {
      videoRef.current?.play()
    }, 500)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
    clearTimeout(timeout)
  }

  return (
    <div className='mb-5 flex cursor-pointer flex-col gap-y-2'>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='aspect-video h-full w-full rounded-lg '>
        {isOpen ? (
          <Video lastPlayedTime={data.lastPlayedTime}/>
        ) : (
          <img src={data.thumbnail} alt='thumbnail' className='aspect-video rounded-lg object-cover' />
        )}
      </div>

      <div className='flex items-start gap-x-2'>
        <div className='relative h-8 w-8 flex-shrink-0 '>
          <img src={data.avatar} alt='avartar' className='h-full w-full rounded-full object-cover' />
        </div>
        <div className='flex flex-col gap-y-1'>
          <span className='text-xs font-bold text-black line-clamp-2 dark:text-white'>{data.title}</span>
          <span className='text-xs font-semibold text-[#666d74] dark:text-gray-400'>{data.user}</span>
          <div className='flex flex-wrap items-center gap-x-1'>
            <span className='text-xs font-semibold text-[#666d74] dark:text-gray-400'>{data.view} N lượt xem</span>
            <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
            <span className='text-xs font-semibold text-[#666d74] dark:text-gray-400'>
              {data.dataSubmitted} tháng trước
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem
