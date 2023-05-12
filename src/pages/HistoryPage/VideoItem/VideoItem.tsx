/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useQueryConfig from 'src/hook/useQueryConfig'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import parse from 'html-react-parser'

interface VideoItemProps {
  data: Video
  watchTime?: number
}
const VideoItem = (props: VideoItemProps) => {
  const queryConfig = useQueryConfig()
  const { category } = queryConfig
  const progressRef = useRef<HTMLDivElement>(null)
  const { data, watchTime } = props

  let timeout: NodeJS.Timeout

  useEffect(() => {
    const valPercent = ((watchTime as number) / Number(data.duration)) * 100
    if (progressRef.current) {
      progressRef.current.style.background = `linear-gradient(to right, red ${valPercent}%, rgba(255, 255, 255, 0.3) ${valPercent}%`
    }
  }, [watchTime, data.duration])

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
      to={`/detail/${data._id}?category=${category || '1'}&watchTime=${watchTime}`}
      className=' ml-[-8px] flex  w-full cursor-pointer gap-y-3 rounded-lg p-2 hover:bg-[rgba(0,0,0,0.05)] lg:p-3'
      role='presentation'
    >
      <div className='mr-2 aspect-video h-fit w-40 rounded-lg lg:w-64'>
        <div className='relative w-40 overflow-hidden rounded-xl lg:w-64'>
          <img src={data?.thumbnail} alt='thumbnail' className='aspect-video w-40 object-cover md:rounded-xl lg:w-64' />
          <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200'>
            {formatTime(Number(data?.duration))}
          </span>
          {watchTime != 0 && <div ref={progressRef} className='absolute bottom-0 h-1 w-full'></div>}
        </div>
      </div>

      <div className='flex w-40 items-start gap-x-3 md:w-full'>
        <div className='flex flex-col'>
          <span className='pr-6 text-base font-semibold text-black line-clamp-2 dark:text-white '>{data?.title}</span>

          <Link
            to={`/${data.channel?._id}/channel`}
            className='text-xs font-normal text-gray-500 dark:text-gray-400 lg:hidden '
          >
            {`${(data?.channel as User).fullName}`}
          </Link>
          <span className='text-xs font-normal text-gray-500 dark:text-gray-400 lg:hidden'>{`${data?.view} lượt xem`}</span>

          <Link
            to={`/${data.channel?._id}/channel`}
            className='hidden text-xs font-normal text-gray-500 dark:text-gray-400 lg:flex '
          >
            {`${(data?.channel as User).fullName} - ${data?.view} lượt xem`}
          </Link>

          <span
            className='hidden text-xs font-normal text-gray-500 line-clamp-2 dark:text-gray-400 lg:flex'
            dangerouslySetInnerHTML={{ __html: String(parse((data.description as string) || '')) }}
          ></span>
        </div>
      </div>
    </Link>
  )
}

export default VideoItem
