/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState } from 'react'
import { RxDividerHorizontal } from 'react-icons/rx'
interface VideoItemProps {
  data: {
    thumbnail: string
    avatar: string
    title: string
    user: string
    view: number
    dataSubmitted: number
  }
}
const VideoItem = (props: VideoItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [lastPlayedTime, setLastPlayedTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { data } = props
  let timeout: NodeJS.Timeout

  const handleMouseEnter = () => {
    setIsOpen(true)
    if (videoRef.current) {
      videoRef.current.currentTime = lastPlayedTime
      if (videoRef.current.currentTime === videoRef.current.duration) {
        videoRef.current.currentTime = 0
        setLastPlayedTime(0)
      }
    }

    timeout = setTimeout(() => {
      videoRef.current?.play()
    }, 500)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
    setLastPlayedTime(videoRef?.current?.currentTime as number)
    videoRef.current?.pause()
    clearTimeout(timeout)
  }

  return (
    <div className='mb-5 flex cursor-pointer flex-col gap-y-2'>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='h-[12rem] w-full rounded-lg '>
        {isOpen ? (
          <video
            src='https://res.cloudinary.com/dnmazjnlr/video/upload/v1679565900/samples/Video/y2mate.com_-_Playlistth%E1%BB%8F_7_m%C3%A0u_nh%E1%BA%A1c_relax_gi%C3%B3_c%C3%B4_g%C3%A1i_n%C3%A0y_c%E1%BB%A7a_ai_y%C3%AAu_anh_%C4%91i_m%E1%BA%B9_anh_b%C3%A1n_b%C3%A1nh_l%C3%A0_anh_tan_720pFHR_rrwkta.mp4'
            className='aspect-video h-full w-full rounded-lg object-cover'
            ref={videoRef}
            muted
            controls
          />
        ) : (
          <img src={data.thumbnail} alt='thumbnail' className='h-full w-full rounded-lg object-cover' />
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
