/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from 'react'

interface VideoProps {
  lastPlayedTime: number
  urlVideo: string
}
const Video = ({ lastPlayedTime, urlVideo }: VideoProps) => {
  console.log('lastPlayerTime:', lastPlayedTime)
  console.log('urlVideo:', urlVideo)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)

  const [timeElapsed, setTimeElapsed] = useState<string>('00:00')

  useEffect(() => {
    if (videoRef.current && lastPlayedTime) {
      videoRef.current.currentTime = lastPlayedTime
    }
  }, [lastPlayedTime])

  const videoDuration = videoRef.current?.duration || 0

  console.log('videoDuration:', videoDuration)

  const slider = (ref: React.RefObject<HTMLInputElement>, leftColor: string, rightColor: string) => {
    const valPercent = (Number(ref.current?.value) / Number(ref.current?.max)) * 100
    if (ref.current) {
      ref.current.style.background = `linear-gradient(to right, ${leftColor} ${valPercent}%, ${rightColor} ${valPercent}%`
    }
  }

  // Format time
  const formatTime = (duration: number) => {
    const result = new Date(duration * 1000).toISOString().slice(11, 19)
    const hour = result.slice(0, 2)
    const minute = result.slice(3, 5)
    const second = result.slice(6, 8)
    return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
  }

  // Update time elapsed
  const updateTimeElapsed = () => {
    const time = videoRef.current?.currentTime || 0
    setTimeElapsed(formatTime(Math.floor(time)))
  }

  // Progress bar
  useEffect(() => {
    const time = videoRef.current?.currentTime || 0
    const durationPercent = (time / videoDuration) * 100
    if (progressRef.current) {
      progressRef.current.value = String(durationPercent)
    }
    if (videoDuration != 0) slider(progressRef, 'red', 'rgba(255, 255, 255, 0.3)')
    else slider(progressRef, 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)')
  }, [timeElapsed, videoDuration])

  const handleClickProgress = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = (Number(progressRef.current?.value) / 100) * videoDuration
      updateTimeElapsed()
    }
  }

  return (
    <div className={`max-w-full`}>
      <div className={`h-full bg-black`}>
        <div className={`group relative h-full`} role='presentation'>
          <video
            src={urlVideo}
            ref={videoRef}
            autoPlay
            onTimeUpdate={updateTimeElapsed}
            className={`aspect-video h-full `}
            id='Video'
          />

          <div className='absolute bottom-0 left-0 right-0 flex flex-col justify-between'>
            <div className='z-50 ml-3 text-xs text-[#DDD]'>
              <span>{timeElapsed}</span>
              <span className='opacity-70 lg:opacity-100'> / </span>
              <span className='opacity-70 lg:opacity-100'>{formatTime(videoDuration)}</span>
            </div>

            <div className='z-50 w-full'>
              <input
                ref={progressRef}
                onInput={handleClickProgress}
                type='range'
                min={0}
                max={100}
                step={0.1}
                className='progress-slider mt-5 h-[0.1875rem] w-full cursor-pointer lg:my-0'
              />
            </div>

            <div className='from-0% via-20% to-90% absolute bottom-0 left-0 right-0 hidden h-[300%] bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0)] lg:block'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
