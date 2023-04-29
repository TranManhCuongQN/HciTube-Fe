/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState , useEffect, useRef } from 'react'

interface VideoProps {
  lastPlayedTime: number
  urlVideo: string
}
const Video = ({ lastPlayedTime, urlVideo }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = lastPlayedTime;
      videoRef.current.play();
    }
  },)

  return (
    <div className={`max-w-full`}>
      <div className={`h-full bg-black`}>
        <div className={`group relative h-full`} role='presentation'>
          <video
            src={urlVideo}
            ref={videoRef}
            className={`aspect-video h-full `}
            id='Video'
          />

        </div>
      </div>
    </div>
  )
}

export default Video
