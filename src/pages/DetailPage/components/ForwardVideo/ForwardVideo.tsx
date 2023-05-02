import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import {useState, useCallback, useEffect, useRef} from 'react'


const ForwardVideo = () => {
  const [count, setCount] = useState<number>(10);
  const [hidden, setHidden] = useState<boolean>(false);
  const nextVideoRef = useRef<HTMLButtonElement>(null);

  const { data } = useQuery({
    queryKey: 'videoList',
    queryFn: () => videoApi.getVideoAll()
  })

  const { id } = useParams()

  useEffect(() => {
    const timer = setInterval(() => {
      if(!hidden) setCount(count - 1)
    }, 1000);
    return () => clearInterval(timer);
  }, [count])



  const getNextVideo = useCallback((curentID : string) => {
    let videoIndex = -1;
    data?.data.data.forEach((item, index) => {
      if(item._id === id) {
        videoIndex = index;
      }
    })
    if(videoIndex >= 0) return data?.data.data[videoIndex + 1];
    return {};
  }, []) 

  const nextVideo = getNextVideo(id || "");

  const formatTime = (duration: number) => {
    const result = new Date(duration * 1000).toISOString().slice(11, 19)
    const hour = result.slice(0, 2)
    const minute = result.slice(3, 5)
    const second = result.slice(6, 8)
    return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
  }

  const handleClickForwardBtn = () => {
    window.location.href = `${nextVideo?._id}`
  }


  if(count == 0) {
    window.location.href = `${nextVideo?._id}`
  }

  return (
    <div className={`${hidden ? "lg:z-20" : "z-40"} absolute w-full h-full flex items-center justify-center bg-black max-md:p-3`}>
      <div className={`${hidden ? "hidden" : "flex"} flex-col gap-y-2 md:gap-y-5 `}>
        <p className="text-sm font-medium text-gray-400 ">
          Video tiếp theo sau
          <span className="text-white">{` ${count}`}</span>
        </p>

        <div className="flex gap-x-3">
          <div className='relative'>
            <img src={nextVideo?.thumbnail} alt='thumbnail' className='aspect-video w-40 md:w-44 h-full object-cover rounded-lg' />
            <span className='absolute right-1 bottom-1 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
              {formatTime(Number(nextVideo?.duration))}
            </span>
          </div>

          <div className="flex flex-col flex-wrap text-white w-40 md:w-44">
            <h1 className="text-sm font-semibold line-clamp-2">{nextVideo?.title}</h1>
            <span className="text-xs font-medium text-gray-400 ">{nextVideo?.channel?.fullName}</span>
          </div>
        </div>

        <div className="flex gap-x-3 text-white font-semibold text-xs md:text-sm">
          <button
            onClick={() => setHidden(true)}
            className="md:uppercase rounded-full bg-[#1a1a1a] hover:bg-[] w-40 md:w-44 py-2 cursor-pointer">
              Hủy
          </button>
          <button 
            ref={nextVideoRef} 
            onClick={handleClickForwardBtn} 
            className="md:uppercase rounded-full bg-[#4d4d4d] hover:bg-[] w-40 md:w-44 py-2 cursor-pointer">
            Phát ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForwardVideo;