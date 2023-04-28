/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import VideoPlayer from '../Video'
import { Video } from 'src/types/video.type'
import Lauv from 'src/assets/Lauv.mp4'


interface VideoItemProps {
  data: Video
}
const VideoItem = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const progressRef = useRef<HTMLDivElement>(null)

  const data  = {
    _id: 1,
    watchTime: 60,
    duration: 300,
    video: Lauv,
    thumbnail: "https://i.ytimg.com/vi/wvcSGGdnnII/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAkHiFIQhYgGBeDo2NEMmE_OaW1qA"
  }
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
    const valPercent = ((data?.watchTime as number) / Number(data.duration)) * 100
    if (progressRef.current) {
      progressRef.current.style.background = `linear-gradient(to right, red ${valPercent}%, rgba(255, 255, 255, 0.3) ${valPercent}%`
    }
  }, [isOpen, data.watchTime, data.duration])

  return (
    <NavLink to={`detail/${data._id}`} className='flex flex-col  lg:flex-row cursor-pointer mt-4' role='presentation'>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='flex w-full aspect-video lg:w-[360px] h-full md:rounded-xl'
      >
        {isOpen ? (
          <div className=' w-full lg:w-[360px]' role='presentation'>
            <VideoPlayer lastPlayedTime={data?.watchTime as number} urlVideo={data?.video} />
          </div>
        ) : (
          <div className='relative overflow-hidden  w-full lg:w-[360px] md:rounded-xl'>
            <img src={data?.thumbnail} alt='thumbnail' className='aspect-video  w-full lg:w-[360px]  object-cover md:rounded-xl' />
            <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
              {formatTime(Number(data?.duration))}
            </span>
            {data?.watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
          </div>
        )}
      </div>

      <div className="flex flex-col my-2 lg:ml-4">
        <div className="flex items-start lg:hidden pl-3">
          <img 
            src="https://yt3.ggpht.com/JOoDtyUm8ofOw8PCSuhLo_Qxge-RSyC7kjtN9fYIY3x8t04UcGTGrO-6n3i9J6lRxc0HiZLvcYk=s68-c-k-c0x00ffffff-no-rj" alt="" 
            className="h-10 w-10 md:h-14 md:w-14 mr-3 rounded-full" 
          />
          <div className="pr-10 ">
            <h1 className="font-medium text-black line-clamp-2 dark:text-white text-sm md:text-xl">
              đưa em về nhàa - GREY D x CHILLIES | Official Music Video
            </h1>
            <div className="flex flex-col gap-y-1 text-gray-500 dark:text-gray-400 font-semibold text-xs md:text-base ">
              <span className="line-clamp-2">ST.319 Entertainment - 311 N người xem - 11 ngày trước</span>
              <div className="font-bold mt-1">
                <span className="bg-[#F2F2F2] dark:bg-[#272727] px-1 py-[0.2rem] rounded-md">Mới</span>
                <span className="bg-[#F2F2F2] dark:bg-[#272727] px-1 py-[0.2rem] ml-1 rounded-md">4K</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden flex-col lg:flex">
          <h1 className="font-semibold text-black line-clamp-2 dark:text-white text-lg ">
            đưa em về nhàa - GREY D x CHILLIES | Official Music Video
          </h1>
          <div className="flex flex-col font-medium text-gray-700 dark:text-gray-400 text-xs ">
            <span>311 N người xem - 11 ngày trước</span>
            <div className="flex items-center py-3">
              <img src="https://yt3.ggpht.com/JOoDtyUm8ofOw8PCSuhLo_Qxge-RSyC7kjtN9fYIY3x8t04UcGTGrO-6n3i9J6lRxc0HiZLvcYk=s68-c-k-c0x00ffffff-no-rj" alt="" className="h-6 w-6 mr-3" />
              <span className="block ">ST.319 Entertainment</span>
            </div>
            <span className="block mb-2 line-clamp-2">MV 'đưa em về nhàa' là cuộn băng ghi lại những khoảnh khắc đáng nhớ của GREY D và Chillies khi cùng nhau tập luyện, thu âm ...</span>
            <div className="text-[#606060] dark:text-current font-bold">
              <span className="bg-[#F2F2F2] dark:bg-[#272727] px-1 py-[0.2rem] rounded-md">Mới</span>
              <span className="bg-[#F2F2F2] dark:bg-[#272727] px-1 py-[0.2rem] ml-1 rounded-md">4K</span>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default VideoItem
