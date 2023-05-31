/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
const Thumbnail = (props: any) => {
  const thumbnailRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { thumbnailProps, videoSrc, isLoadedVideo } = props
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)

  // Format time
  const formatTime = (duration: number) => {
    if (duration) {
      const result = new Date(duration * 1000).toISOString().slice(11, 19)
      const hour = result.slice(0, 2)
      const minute = result.slice(3, 5)
      const second = result.slice(6, 8)
      return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
    }
  }

  let videoDuration = 1
  const { mouseClientX, thumbnailCurrentTime, rectProgress } = thumbnailProps
  if (videoRef.current && thumbnailCurrentTime) {
    videoDuration = videoRef.current?.duration
    videoRef.current.currentTime = thumbnailCurrentTime
  }
  const progressPercent = Math.round(((thumbnailCurrentTime ? thumbnailCurrentTime : 0) / videoDuration) * 100)
  if (thumbnailRef.current && mouseClientX && rectProgress) {
    const halfOfThumbnailWidth = thumbnailRef.current?.offsetWidth / 2
    if (mouseClientX - rectProgress.left < halfOfThumbnailWidth) thumbnailRef.current.style.left = '0'
    else if (rectProgress.right - mouseClientX <= halfOfThumbnailWidth) {
      thumbnailRef.current.style.removeProperty('left')
      thumbnailRef.current.style.right = `0`
    } else {
      thumbnailRef.current.style.removeProperty('right')
      thumbnailRef.current.style.left = `calc(${progressPercent}% - ${halfOfThumbnailWidth}px)`
    }
  }

  return (
    <div ref={thumbnailRef} className='absolute bottom-6 flex aspect-video flex-col items-center' id='Thumbnail'>
      <div className='relative flex aspect-video h-[6rem] w-[9rem] items-center rounded-sm border-[1.4px] border-solid border-white bg-black'>
        <video
          src={videoSrc}
          ref={videoRef}
          className='aspect-video h-full w-full rounded-sm object-contain'
          onCanPlay={() => setThumbnailLoaded(true)}
          playsInline
          autoPlay
        />
        {!thumbnailLoaded && (
          <div
            className={`
             absolute
            top-0 z-20 mx-auto flex aspect-video h-full w-full items-center justify-center bg-black object-contain`}
          >
            <AiOutlineLoading className='absolute h-6 w-6 animate-spin text-white' />
          </div>
        )}
        {isLoadedVideo && (
          <div
            className={`
             absolute
            top-0 z-20 mx-auto flex aspect-video h-full w-full items-center justify-center bg-transparent object-contain`}
          >
            <AiOutlineLoading className='absolute h-6 w-6 animate-spin text-white' />
          </div>
        )}
      </div>
      <span className=' mt-3 rounded-sm bg-[rgba(0,0,0,0.2)] px-1 text-xs font-medium text-white'>
        {formatTime(Math.floor(thumbnailCurrentTime))}
      </span>
    </div>
  )
}

export default Thumbnail
