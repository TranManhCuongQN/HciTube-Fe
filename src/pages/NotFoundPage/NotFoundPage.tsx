import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import Img404 from 'src/assets/404.svg'
import useQueryConfig from 'src/hook/useQueryConfig'

const NotFoundPage = () => {
  const [remainingTime, setRemainingTime] = useState<{ minutes: number; seconds: number }>({ minutes: 1, seconds: 0 })
  const intervalRef = useRef<NodeJS.Timer>()
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { category } = queryConfig

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newSeconds = prevTime.seconds - 1
        const newMinutes = prevTime.minutes - (newSeconds < 0 ? 1 : 0)
        return { minutes: newMinutes, seconds: (60 + newSeconds) % 60 }
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [remainingTime])

  useEffect(() => {
    if (remainingTime.minutes === 0 && remainingTime.seconds === 0) {
      clearInterval(intervalRef.current)
      navigate(`/?category=${category || '1'}`)
    }
  }, [remainingTime, navigate, category])
  return (
    <>
      <Helmet>
        <title>Trang 404 - HciTube</title>
        <meta name='description' content='Trang 404 - HciTube' />
      </Helmet>
      <div className='absolute top-0 bottom-0 right-0 left-0'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-y-4'>
          <img src={Img404} alt='404' className='h-[40%] w-auto ' />
          <span className='text-lg font-semibold text-black dark:text-white md:text-xl'>Không tìm thấy trang này</span>
          <span className='text-sm text-black dark:text-white md:text-base'>
            Sau {remainingTime.minutes} phút {remainingTime.seconds} giây sẽ tự động chuyển về trang chủ
          </span>
          <button
            className='rounded-lg bg-green-600 p-3 text-xs font-bold text-white lg:text-sm'
            onClick={() => navigate(`/?category=${category || '1'}`)}
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
