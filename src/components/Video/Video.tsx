/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from 'react'
import { MdZoomOutMap, MdZoomInMap } from 'react-icons/md'
import { BiSkipNext, BiSkipPrevious, BiPlay, BiPause, BiRectangle } from 'react-icons/bi'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { TbRectangle } from 'react-icons/tb'
import { IoMdSettings } from 'react-icons/io'
import Lauv from 'src/assets/Lauv.mp4'
import Evy from 'src/assets/EVY.mp4'
import ToolTip from './ToolTip'

import Thumbnail from './Thumbnail'
import { isUndefined } from 'lodash'

declare global {
  interface HTMLInputElement {
    oldvalue?: number
  }
  interface ThumbnailProps extends Object {
    mouseClientX?: number
    thumbnailCurrentTime?: number;
    rectProgress?: DOMRect
  }
}


const playlistSrc = [Lauv, Evy];


const Video = ({ handleTheaterMode }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)
  const volumeRef = useRef<HTMLInputElement>(null)

  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(true)
  const [hidden, setHidden] = useState<boolean>(true)
  const [timeElapsed, setTimeElapsed] = useState<string>('00:00')
  const [zoomOut, setZoomOut] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)
  const [theaterMode, setTheaterMode] = useState<boolean>(false)
  const [thumbnailProps, setThumbnailProps] = useState<ThumbnailProps>()


  const videoDuration = videoRef.current?.duration || 0
  const slider = (ref: React.RefObject<HTMLInputElement>, leftColor: string, rightColor: string) => {
    let valPercent = (Number(ref.current?.value) / Number(ref.current?.max)) * 100
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

  const handlePlayAndPause = () => {
    if (playing == false) {
      playVideo()
    } else {
      pauseVideo()
    }
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
    if(videoDuration != 0) slider(progressRef, 'red', 'rgba(255, 255, 255, 0.3)')
    else slider(progressRef, 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)')
  }, [timeElapsed])


  const handleClickProgress = (e:any) => {
    if(videoRef.current && thumbnailProps) {
      videoRef.current.currentTime = thumbnailProps.thumbnailCurrentTime ? thumbnailProps.thumbnailCurrentTime : 0;
      updateTimeElapsed()
    }
  }

  // Handle hide control screen
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setHidden(playing)
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [playing, hidden])

  // Handle zoom
  const handleClickZoom = () => {
    setZoomOut(!zoomOut)
  }

  // Theater Mode
  const handleClickTheaterMode = () => {
    setTheaterMode(!theaterMode)
  }

  const playVideo = () => {
    videoRef.current?.play()
    setPlaying(true)
  }

  const pauseVideo = () => {
    videoRef.current?.pause()
    setPlaying(false)
  }

  // Change Volume
  const handleChangeVolume = () => {
    if (videoRef.current && volumeRef.current) {
      videoRef.current.volume = Number(volumeRef.current.value)
      volumeRef.current.oldvalue = videoRef.current.volume
      slider(volumeRef, 'white', 'rgba(255, 255, 255, 0.3)')
       
    }
  }

  // Mute
  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !muted
    if (muted && volumeRef.current && videoRef.current) {
      volumeRef.current.value = String(volumeRef.current.oldvalue)
      videoRef.current.volume = Number(volumeRef.current.value)
      slider(volumeRef, 'white', 'rgba(255, 255, 255, 0.3)')
    } else {
      if (volumeRef.current && videoRef.current) {
        volumeRef.current.value = String(0)
        videoRef.current.volume = Number(volumeRef.current.value)
        slider(volumeRef, 'white', 'rgba(255, 255, 255, 0.3)')
      }
    }
    setMuted(!muted)
  }

  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.oldvalue = 1
    }
  }, [])


  // Pass data from Video to WatchingLayout
  // useEffect(() => {
  //   handleTheaterMode(theaterMode)
  // }, [theaterMode, handleTheaterMode])

  //Handle click zoom button
  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoRef.current?.requestFullscreen()
    }
  }

  // Thumbnail
  const calculateProgressValueWhenMouseMove = (e: any) => {
    const props = getProgressValueAtMousePosition(e);
    setThumbnailProps(props)
  }

  const getProgressValueAtMousePosition = (e: any) => {
    const x = e.clientX;
    const rect = progressRef.current?.getBoundingClientRect()
    const val = (x - (rect?.left as number)) / (rect?.width as number)
    const thumbnailCurrentTime = val * videoDuration
    const props: ThumbnailProps = {
      mouseClientX: x,
      thumbnailCurrentTime,
      rectProgress: rect
    };
    return props
  }
  // console.log(thumbnailProps)

  // Handle click next button
  const  movingForwardVideo = () => {
    if(videoIndex == playlistSrc.length - 1) setVideoIndex(0)
    else setVideoIndex(prev => prev + 1);
  }
  // Handle click prev button
  const  movingBackwardVideo = () => {
    if(videoIndex == 0) setVideoIndex(playlistSrc.length - 1)
    else setVideoIndex(prev => prev - 1);
  }

  // Handle keyboard shortcuts 
  const keyboardShortcuts = (event:any) => {
    const {key} = event;
    switch(key) {
      case 'a':
        movingBackwardVideo();
        break;
      case 'k':
        handlePlayAndPause();
        break;
      case 'd':
        movingForwardVideo();
        break;
      case 'm':
        toggleMute();
        break;
      case 't':
        handleClickTheaterMode();
        break;
      case 'f':
        toggleFullScreen();
        break;
      default:
        break;
      
    }
  }
  useEffect(()=> {
    window.addEventListener('keyup', keyboardShortcuts);
  }, [playing, zoomOut, theaterMode, muted])


  return (
    <div className={`${theaterMode && 'lg:h-[75vh]'} mb-2 max-w-full`}>
      <div className={`${zoomOut ? '' : ''} h-full bg-black`}>
        <div
          className={`group relative h-full ${zoomOut ? '' : ''}`}
          onClick={() => setHidden(false)}
          role='presentation'
        >
          <video
            src={playlistSrc[videoIndex]}
            ref={videoRef}
            onLoadedMetadata={playVideo}
            onTimeUpdate={updateTimeElapsed}
            onEnded={movingForwardVideo}
            className={`${zoomOut ? 'lg:w-full' : 'mx-auto'} aspect-video h-full `}
            id="Video"
          />
          {/* Play and Pause on Desktop */}
          <div
            className='hidden absolute top-0 right-0 left-0 h-full items-center justify-center z-30 lg:flex'
            role='presentation'
            onClick={handlePlayAndPause}
          >
            <BiPlay
              className={(playing ? 'hidden' : '') + ' p-2 text-[4rem] text-white opacity-0'}
              id='DesktopPlayBtn'
              onClick={playVideo}
            />
            <BiPause
              className={(playing ? '' : 'hidden') + ' p-2 text-[4rem] text-white opacity-0'}
              id='DesktopPauseBtn'
              onClick={pauseVideo}
            />
          </div>
          <div className={`lg:group-hover:block ${hidden ? 'hidden' : 'block'}`}>
            <div className=' absolute top-0 h-full w-full bg-black opacity-50 lg:hidden'></div>

            <div className='absolute top-0 left-[1.875rem] right-[1.875rem] mx-3 flex h-full items-center justify-center lg:hidden lg:justify-between'>
              <BiSkipPrevious 
                onClick={movingBackwardVideo} 
                className='p-2 text-[4rem] text-white lg:hidden' 
              />
              <div className='sm:mx-16'>
                <BiPlay
                  className={(playing ? 'hidden' : '') + ' p-2 text-[6rem] text-white lg:hidden'}
                  onClick={playVideo}
                />
                <BiPause
                  className={(playing ? '' : 'hidden') + ' p-2 text-[6rem] text-white lg:hidden'}
                  onClick={pauseVideo}
                />
              </div>
              <BiSkipNext 
                onClick={movingForwardVideo}  
                className='p-2 text-[4rem] text-white lg:hidden' 
              />
            </div>

            <div className=' absolute bottom-0 left-[1.875rem] right-[1.875rem] flex flex-col justify-between lg:left-[0.75rem] lg:right-[0.75rem] lg:flex-col-reverse '>
              
              <div className=' flex w-full items-center justify-between lg:h-12 z-50'>
                <div className='flex items-center'>
                  <div className="tooltip-video">
                    <BiSkipPrevious 
                      onClick={movingBackwardVideo} 
                      className='hidden px-1 text-[3rem] text-white lg:flex lg:hover:cursor-pointer' 
                    />
                    <ToolTip text="Phát video trước" keyname="a" left="0"/>
                  </div>
                  <div className='hidden lg:flex lg:hover:cursor-pointer'>
                    <div className="tooltip-video flex justify-center items-center">
                      <BiPlay 
                        className={(playing ? 'hidden' : '') + ' h-12 w-12 px-1 text-white'} 
                        onClick={playVideo} 
                      />
                      <ToolTip text="Phát" keyname="k"/>
                    </div>

                    <div className="tooltip-video flex justify-center items-center">
                      <BiPause
                        className={(playing ? '' : 'hidden') + ' h-12 w-12 px-1 text-white'}
                        onClick={pauseVideo}
                      />
                      <ToolTip text="Tạm dừng" keyname="k"/>

                    </div>
                  </div>
                  <div className="tooltip-video flex justify-center items-center">
                    <BiSkipNext 
                      onClick={movingForwardVideo}  
                      className='hidden px-1 text-[3rem] text-white lg:flex lg:hover:cursor-pointer' 
                    />
                    <ToolTip text="Phát video tiếp theo" keyname="d"/>

                  </div>

                  <div className='group mr-2 flex max-w-[100px] items-center' id='Volume'>
                    <div
                      className='hidden h-12 w-12 px-1 lg:flex lg:items-center lg:hover:cursor-pointer '
                      onClick={toggleMute}
                      role='presentation'
                    >
                      <div className="tooltip-video flex justify-center items-center">
                        <HiVolumeUp className={`${muted  && 'hidden'} w-12 text-[1.5rem] text-white`} />
                        <ToolTip text="Tắt tiếng" keyname="m"/>
                      </div>

                      <div className="tooltip-video flex justify-center items-center">
                        <HiVolumeOff className={`${!muted && 'hidden'} w-12 text-[1.5rem] text-white`} />
                        <ToolTip text="Bật âm thanh" keyname="m"/>
                      </div>
                    </div>

                    <div className='volume-slider-container flex items-center'>
                      <input
                        type='range'
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={handleChangeVolume}
                        ref={volumeRef}
                        className='volume-slider hover:cursor-pointer'
                      />
                    </div>
                  </div>

                  <div className='text-xs lg:flex lg:h-12 lg:items-center'>
                    <div className='lg:text-[#DDD]'>
                      <span>{timeElapsed}</span>
                      <span className='opacity-70 lg:opacity-100'> / </span>
                      <span className='opacity-70 lg:opacity-100'>{formatTime(videoDuration)}</span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center'>
                  <div className='tooltip-video hidden items-center justify-center hover:cursor-pointer md:flex lg:h-12'>
                    <IoMdSettings className='text-white lg:w-12 lg:text-[1.5rem]' />
                    <ToolTip text="Cài đặt" keyname="s"/>
                  </div>
                  <div
                    className='hidden items-center hover:cursor-pointer lg:flex lg:h-12'
                    onClick={handleClickTheaterMode}
                    role='presentation'
                  >
                    <div className="tooltip-video">
                      <BiRectangle className={`${theaterMode && 'hidden'}  text-white lg:w-12 lg:text-[1.5rem] `} />
                      <ToolTip text="Chế độ rạp chiếu phim" keyname="t" right="0"/>
                    </div>
                    <div className="tooltip-video">
                      <TbRectangle className={`${!theaterMode && 'hidden'} text-white lg:w-12 lg:text-[1.5rem] `} />
                      <ToolTip text="Chế độ xem mặc định" keyname="t" right="0"/>
                    </div>
                  </div>

                  <div
                    className='ml-3 flex items-center hover:cursor-pointer lg:ml-0 lg:h-12'
                    role='presentation'
                    onClick={() => {
                      handleClickZoom()
                      toggleFullScreen()
                    }}
                  >
                    <div className="tooltip-video">
                      <MdZoomInMap className={(zoomOut ? '' : 'hidden') + ' text-white lg:w-12 lg:text-[1.5rem]'} />
                      <ToolTip text="Thoát khỏi chế độ toàn màn hình" keyname="f" right="0"/>
                    </div>

                    <div className="tooltip-video">
                      <MdZoomOutMap className={(zoomOut ? 'hidden' : '') + ' text-white lg:w-12 lg:text-[1.5rem]'} />
                      <ToolTip text="Toàn màn hình" keyname="f" right="0"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className='relative z-50' id='ProgressBar'>
                { !isUndefined(thumbnailProps) && <Thumbnail thumbnailProps={thumbnailProps} videoSrc={playlistSrc[videoIndex]} />}
                <div className='w-full '>
                  <input
                    ref={progressRef}
                    onInput={(e) => {handleClickProgress(e)}}
                    onMouseMove={(e) => {
                      calculateProgressValueWhenMouseMove(e)
                    }}
                    type='range'
                    min={0}
                    max={100}
                    step={0.1}
                    className='progress-slider my-5 h-[0.1875rem] w-full cursor-pointer lg:my-0'
                  />
                </div>
              </div>

              <div className="hidden lg:block absolute bottom-0 left-[-30px] right-[-30px] bg-gradient-to-t from-[rgba(0,0,0,0.6)] from-0% via-[rgba(0,0,0,0.2)] via-20% to-[rgba(0,0,0,0)] to-90% h-[300%]">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
