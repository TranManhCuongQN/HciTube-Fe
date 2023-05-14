/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from 'react'
import {AiOutlineLoading} from 'react-icons/ai'


interface VideoProps {
  lastPlayedTime: number
  urlVideo: string
}
const Video = ({ lastPlayedTime, urlVideo }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    playVideo();
  }, [isLoading])

  const playVideo = () => {
    videoRef.current?.play()
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = lastPlayedTime || 0
      videoRef.current.play()
    }
  })




  return (
    <div className={`max-w-full aspect-video w-full`}>
      <div className={`h-full bg-black aspect-video w-full`}>
        <div className={`group relative h-full`} role='presentation'>
          <video 
            src={urlVideo}  
            ref={videoRef} 
            onCanPlay={() => setIsLoading(false)}
            className={`aspect-video h-full w-full`} 
            id='Video' 
          />
          {
            isLoading &&
            <div className={`absolute top-0 aspect-video h-full w-full object-contain flex items-center justify-center`}>
              <AiOutlineLoading className='absolute h-[20%] w-[20%] text-white animate-spin'/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Video
