import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import { useState, useCallback, useEffect, useRef } from 'react'

const ForwardVideo = () => {
  const [count, setCount] = useState<number>(10)
  const [hidden, setHidden] = useState<boolean>(false)
  const nextVideoRef = useRef<HTMLButtonElement>(null)

  const { data } = useQuery({
    queryKey: 'videoList',
    queryFn: () => videoApi.getVideoAll()
  })

  const { id } = useParams()

  useEffect(() => {
    const timer = setInterval(() => {
      if (!hidden) setCount(count - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [count])

  const getNextVideo = useCallback((curentID: string) => {
    let videoIndex = -1
    data?.data.data.forEach((item, index) => {
      if (item._id === id) {
        videoIndex = index
      }
    })
    if (videoIndex >= 0) return data?.data.data[videoIndex + 1]
    return {}
  }, [])

  const nextVideo = getNextVideo(id || '')

  const formatTime = (duration: number) => {
    const result = new Date(duration * 1000).toISOString().slice(11, 19)
    const hour = result.slice(0, 2)
    const minute = result.slice(3, 5)
    const second = result.slice(6, 8)
    return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
  }

  const navigate = useNavigate()

  const handleClickForwardBtn = () => {
    window.location.href = `${nextVideo?._id}`
  }

  if (count == 0) {
    window.location.href = `${nextVideo?._id}`
  }

  return (
    <div
      className={`${
        hidden ? 'lg:z-20' : 'z-40'
      } absolute flex h-full w-full items-center justify-center bg-black max-md:p-3`}
    >
      <div className={`${hidden ? 'hidden' : 'flex'} flex-col gap-y-2 md:gap-y-5 `}>
        <p className='text-sm font-medium text-gray-400 '>
          Video tiếp theo sau
          <span className='text-white'>{` ${count}`}</span>
        </p>

        <div className='flex gap-x-3'>
          <div className='relative'>
            <img
              src={nextVideo?.thumbnail}
              alt='thumbnail'
              className='aspect-video h-full w-40 rounded-lg object-cover md:w-44'
            />
            <span className='absolute right-1 bottom-1 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
              {formatTime(Number(nextVideo?.duration))}
            </span>
          </div>

          <div className='flex w-40 flex-col flex-wrap text-white md:w-44'>
            <h1 className='text-sm font-semibold line-clamp-2'>{nextVideo?.title}</h1>
            <span className='text-xs font-medium text-gray-400 '>{nextVideo?.channel?.fullName}</span>
          </div>
        </div>

        <div className='flex gap-x-3 text-xs font-semibold text-white md:text-sm'>
          <button
            onClick={() => setHidden(true)}
            className='w-40 cursor-pointer rounded-full bg-[#1a1a1a] py-2 hover:bg-[] md:w-44 md:uppercase'
          >
            Hủy
          </button>
          <button
            ref={nextVideoRef}
            onClick={handleClickForwardBtn}
            className='w-40 cursor-pointer rounded-full bg-[#4d4d4d] py-2 hover:bg-[] md:w-44 md:uppercase'
          >
            Phát ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForwardVideo
