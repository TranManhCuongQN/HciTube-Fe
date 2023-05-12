/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { MdZoomOutMap, MdZoomInMap, MdReplay } from 'react-icons/md'
import { BiSkipNext, BiSkipPrevious, BiPlay, BiPause, BiRectangle } from 'react-icons/bi'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { TbRectangle } from 'react-icons/tb'
import { IoMdSettings } from 'react-icons/io'
import ToolTip from './ToolTip'
import Thumbnail from './Thumbnail'
import { isUndefined, omit } from 'lodash'
import ForwardVideo from 'src/pages/DetailPage/components/ForwardVideo'
import { Video as VideoType } from 'src/types/video.type'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import useQueryConfig from 'src/hook/useQueryConfig'
import { useMutation } from 'react-query'
import videoApi from 'src/api/video.api'

declare global {
  interface HTMLInputElement {
    oldvalue?: number
  }
  interface ThumbnailProps extends Object {
    mouseClientX?: number
    thumbnailCurrentTime?: number
    rectProgress?: DOMRect
  }
}

interface VideoProps {
  lastPlayedTime?: number
  urlVideo?: string
  handleTheaterMode?: (theaterMode: boolean) => void
  playList?: VideoType[]
}

const Video = ({ lastPlayedTime, handleTheaterMode, urlVideo, playList: playListVideo }: VideoProps) => {
  const queryConfig = useQueryConfig()
  const { category, playList, favorite, watchTime } = queryConfig
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)
  const volumeRef = useRef<HTMLInputElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const replayRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState<boolean>(true)
  const [hidden, setHidden] = useState<boolean>(true)
  const [timeElapsed, setTimeElapsed] = useState<string>('00:00')
  const [zoomOut, setZoomOut] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(false)
  const [theaterMode, setTheaterMode] = useState<boolean>(false)
  const [thumbnailProps, setThumbnailProps] = useState<ThumbnailProps>()
  const [ended, setEnded] = useState<boolean>(false)
  const [idView, setIdView] = useState<string>('')
  const { id } = useParams()
  const navigate = useNavigate()

  const increseViewMutation = useMutation({
    mutationFn: videoApi.increaseView,
    onSuccess: (data) => {
      setIdView(data?.data?.data?.view?._id)
    }
  })

  const setWatchVideoTimeMutation = useMutation({
    mutationFn: videoApi.setWatchVideoTime,
    onSuccess: (data) => {
      // console.log('dataSetWatchVideoTime:', data)
    }
  })

  const videoDuration = Math.round(videoRef.current?.duration || 0)
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

  const handlePlayAndPause = useCallback(() => {
    if (!ended) {
      if (playing == false) {
        playVideo()
      } else {
        pauseVideo()
      }
    }
  }, [ended, playing])

  // Update time elapsed
  const updateTimeElapsed = () => {
    const time = videoRef.current?.currentTime || 0
    setTimeElapsed(formatTime(Math.round(time)))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      increseViewMutation.mutate({
        video: id as string,
        watchedTime: videoRef.current?.currentTime as number
      })
    }, 5000)
    return () => clearTimeout(timer)
  }, [id])

  // Progress bar
  useEffect(() => {
    const time = videoRef.current?.currentTime || 0
    const durationPercent = (Math.round(time) / videoDuration) * 100
    if (progressRef.current) {
      progressRef.current.value = String(durationPercent)
    }
    if (videoDuration != 0) slider(progressRef, 'red', 'rgba(255, 255, 255, 0.3)')
    else slider(progressRef, 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)')
  }, [timeElapsed, videoDuration])

  const handleClickProgress = () => {
    if (videoRef.current && thumbnailProps) {
      videoRef.current.currentTime = thumbnailProps.thumbnailCurrentTime ? thumbnailProps.thumbnailCurrentTime : 0
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
  const handleClickTheaterMode = useCallback(() => {
    setTheaterMode(!theaterMode)
  }, [theaterMode])

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
  const toggleMute = useCallback(() => {
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
  }, [muted])

  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.oldvalue = 1
    }
  }, [])

  // Pass data from Video to WatchingLayout
  useEffect(() => {
    if (handleTheaterMode) {
      handleTheaterMode(theaterMode)
    }
  }, [theaterMode, handleTheaterMode])

  //Handle click zoom button
  const toggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoContainerRef.current?.requestFullscreen()
    }
  }, [])

  // Thumbnail
  const calculateProgressValueWhenMouseMove = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const props = getProgressValueAtMousePosition(e)
    setThumbnailProps(props)
  }

  const getProgressValueAtMousePosition = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const x = e.clientX
    const rect = progressRef.current?.getBoundingClientRect()
    const val = (x - (rect?.left as number)) / (rect?.width as number)
    const thumbnailCurrentTime = val * videoDuration
    const props: ThumbnailProps = {
      mouseClientX: x,
      thumbnailCurrentTime,
      rectProgress: rect
    }
    return props
  }

  const getNextVideo = (curentID: string) => {
    if (playListVideo) {
      const index = playListVideo.findIndex((item) => item._id === curentID)
      if (index < playListVideo.length - 1) {
        return playListVideo[index + 1]
      }
      return playListVideo[0]
    }
  }

  const getPrevVideo = (curentID: string) => {
    if (playListVideo) {
      const index = playListVideo.findIndex((item) => item._id === curentID)
      if (index > 0) {
        return playListVideo[index - 1]
      }
      return playListVideo[playListVideo.length - 1]
    }
  }

  const nextVideo = getNextVideo(id as string)
  const prevVideo = getPrevVideo(id as string)
  // Handle click next button
  const movingBackwardVideo = useCallback(() => {
    if (playList) {
      if (idView) {
        setWatchVideoTimeMutation.mutate({
          idView: idView as string,
          watchedTime: videoRef.current?.currentTime as number
        })
      }
      navigate({
        pathname: `/detail/${prevVideo?._id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: (category as string) || '1',
              playList: playList as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'favorite', 'watchTime']
          )
        ).toString()
      })
    } else if (favorite) {
      if (idView) {
        setWatchVideoTimeMutation.mutate({
          idView: idView as string,
          watchedTime: videoRef.current?.currentTime as number
        })
      }
      navigate({
        pathname: `/detail/${prevVideo?._id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: (category as string) || '1',
              favorite: favorite as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList', 'watchTime']
          )
        ).toString()
      })
    } else {
      if (idView) {
        setWatchVideoTimeMutation.mutate({
          idView: idView as string,
          watchedTime: videoRef.current?.currentTime as number
        })
      }
      navigate({
        pathname: `/detail/${prevVideo?._id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: category as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'watchTime']
          )
        ).toString()
      })
    }
  }, [category, favorite, playList, navigate, prevVideo, queryConfig])

  // Handle click prev button
  const movingForwardVideo = useCallback(() => {
    if (playList) {
      if (idView) {
        setWatchVideoTimeMutation.mutate({
          idView: idView as string,
          watchedTime: videoRef.current?.currentTime as number
        })
      }
      navigate({
        pathname: `/detail/${nextVideo?._id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: (category as string) || '1',
              playList: playList as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'favorite', 'watchTime']
          )
        ).toString()
      })
    } else if (favorite) {
      if (idView) {
        setWatchVideoTimeMutation.mutate({
          idView: idView as string,
          watchedTime: videoRef.current?.currentTime as number
        })
      }
      navigate({
        pathname: `/detail/${nextVideo?._id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: (category as string) || '1',
              favorite: favorite as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList', 'watchTime']
          )
        ).toString()
      })
    } else {
      if (idView) {
        setWatchVideoTimeMutation.mutate({
          idView: idView as string,
          watchedTime: videoRef.current?.currentTime as number
        })
      }
      navigate({
        pathname: `/detail/${nextVideo?._id}`,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: category as string
            },
            ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'watchTime']
          )
        ).toString()
      })
    }
  }, [category, favorite, playList, navigate, nextVideo, queryConfig])

  // Handle keyboard shortcuts
  const keyboardShortcuts = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event
      switch (key) {
        case 'a':
          movingBackwardVideo()
          break
        case 'k':
          handlePlayAndPause()
          break
        case 'd':
          movingForwardVideo()
          break
        case 'm':
          toggleMute()
          break
        case 't':
          handleClickTheaterMode()
          break
        case 'f':
          toggleFullScreen()
          break
        default:
          break
      }
    },
    [handleClickTheaterMode, handlePlayAndPause, movingBackwardVideo, movingForwardVideo, toggleFullScreen, toggleMute]
  )
  useEffect(() => {
    document.addEventListener('keyup', keyboardShortcuts)
  }, [playing, zoomOut, theaterMode, muted, keyboardShortcuts])

  // useEffect(() => {
  //   const videoElement = videoRef.current

  //   return () => {
  //     // Handle save the current time into the database
  //     console.log('videoElement', videoElement?.currentTime)
  //     if (idView) {
  //       setWatchVideoTimeMutation.mutate({
  //         idView: idView as string,
  //         watchedTime: videoRef.current?.currentTime as number
  //       })
  //     }
  //   }
  // }, [])

  console.log('idView:', idView)

  return (
    <div ref={videoContainerRef} className={`${theaterMode && 'lg:h-[75vh]'} mb-2 max-w-full`}>
      <div className={`${zoomOut ? '' : ''} h-full bg-black`}>
        <div
          className={`group relative h-full ${zoomOut ? '' : ''}`}
          onClick={() => setHidden(false)}
          role='presentation'
        >
          {(playListVideo?.length as number) > 0 && ended && (
            <ForwardVideo data={playListVideo as VideoType[]} setEnded={setEnded} />
          )}
          <video
            src={urlVideo}
            ref={videoRef}
            onLoadedMetadata={playVideo}
            onTimeUpdate={updateTimeElapsed}
            preload='auto'
            onEnded={() => {
              setEnded(true)
              if (idView) {
                setWatchVideoTimeMutation.mutate({
                  idView: idView as string,
                  watchedTime: videoRef.current?.currentTime as number
                })
              }
            }}
            className={`${zoomOut ? 'lg:w-full' : 'mx-auto'} aspect-video h-full`}
            id='Video'
          ></video>
          <div
            className='absolute top-0 right-0 left-0 z-20 hidden h-full items-center justify-center lg:flex'
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
              <BiSkipPrevious onClick={movingBackwardVideo} className='p-2 text-[4rem] text-white lg:hidden' />
              <div className={`${ended ? 'hidden' : ''} mx-16`}>
                <BiPlay
                  className={(playing ? 'hidden' : '') + ' p-2 text-[6rem] text-white lg:hidden'}
                  onClick={playVideo}
                />
                <BiPause
                  className={(playing ? '' : 'hidden') + ' p-2 text-[6rem] text-white lg:hidden'}
                  onClick={pauseVideo}
                />
              </div>
              <div className={`${ended ? 'flex' : 'hidden'} mx-16`}>
                <MdReplay
                  className={(playing ? '' : 'hidden') + ' p-2 text-[6rem] text-white'}
                  onClick={() => {
                    setEnded(false)
                    pauseVideo()
                    playVideo()
                  }}
                />
              </div>
              <BiSkipNext onClick={movingForwardVideo} className='p-2 text-[4rem] text-white lg:hidden' />
            </div>
            {/* Desktop */}
            <div className=' absolute bottom-0 left-[1.875rem] right-[1.875rem] flex flex-col justify-between lg:left-[0.75rem] lg:right-[0.75rem] lg:flex-col-reverse '>
              <div className=' z-40 flex w-full items-center justify-between lg:h-12'>
                {/* Left */}
                <div className='flex items-center'>
                  {/* Previous */}
                  <div className='tooltip-video'>
                    <BiSkipPrevious
                      onClick={movingBackwardVideo}
                      className='hidden px-1 text-[3rem] text-white lg:flex lg:hover:cursor-pointer'
                    />
                    <ToolTip text='Phát video trước' keyname='a' left='0' />
                  </div>
                  {/* Play Pause */}
                  <div className={`${ended ? '' : 'lg:flex'} hidden  lg:hover:cursor-pointer`}>
                    <div className='tooltip-video flex items-center justify-center'>
                      <BiPlay
                        className={(playing ? 'hidden' : '') + ' h-12 w-12 px-1 text-white'}
                        onClick={playVideo}
                      />
                      <ToolTip text='Phát' keyname='k' />
                    </div>

                    <div className='tooltip-video flex items-center justify-center'>
                      <BiPause
                        className={(playing ? '' : 'hidden') + ' h-12 w-12 px-1 text-white'}
                        onClick={pauseVideo}
                      />
                      <ToolTip text='Tạm dừng' keyname='k' />
                    </div>
                  </div>
                  {/* Replay */}
                  <div
                    ref={replayRef}
                    className={`${
                      ended ? 'lg:flex' : ''
                    } tooltip-video  hidden cursor-pointer items-center justify-center`}
                  >
                    <MdReplay
                      className={(playing ? '' : 'hidden') + ' h-8 w-8 px-1 text-white'}
                      onClick={() => {
                        setEnded(false)
                        pauseVideo()
                        playVideo()
                      }}
                    />
                    <ToolTip text='Phát lại' keyname='k' />
                  </div>
                  {/* Next */}
                  <div className='tooltip-video flex items-center justify-center'>
                    <BiSkipNext
                      onClick={movingForwardVideo}
                      className='hidden px-1 text-[3rem] text-white lg:flex lg:hover:cursor-pointer'
                    />
                    <ToolTip text='Phát video tiếp theo' keyname='d' />
                  </div>

                  {/* Volume */}
                  <div className='group mr-2 flex max-w-[100px] items-center' id='Volume'>
                    <div
                      className='hidden h-12 w-12 px-1 lg:flex lg:items-center lg:hover:cursor-pointer '
                      onClick={toggleMute}
                      role='presentation'
                    >
                      <div className='tooltip-video flex items-center justify-center'>
                        <HiVolumeUp className={`${muted && 'hidden'} w-12 text-[1.5rem] text-white`} />
                        <ToolTip text='Tắt tiếng' keyname='m' />
                      </div>

                      <div className='tooltip-video flex items-center justify-center'>
                        <HiVolumeOff className={`${!muted && 'hidden'} w-12 text-[1.5rem] text-white`} />
                        <ToolTip text='Bật âm thanh' keyname='m' />
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

                  <div className='text-xs font-semibold lg:flex lg:h-12 lg:items-center'>
                    <div className='text-[#DDD]'>
                      <span>{timeElapsed}</span>
                      <span className='opacity-70 lg:opacity-100'> / </span>
                      <span className='opacity-70 lg:opacity-100'>{formatTime(videoDuration)}</span>
                    </div>
                  </div>
                </div>
                {/* Right */}
                <div className='flex items-center'>
                  {/* Setting */}
                  <div className='tooltip-video hidden items-center justify-center hover:cursor-pointer md:flex lg:h-12'>
                    <IoMdSettings className='text-white lg:w-12 lg:text-[1.5rem]' />
                    <ToolTip text='Cài đặt' keyname='s' />
                  </div>
                  {/* Theater Mode */}
                  <div
                    className='hidden items-center hover:cursor-pointer lg:flex lg:h-12'
                    onClick={handleClickTheaterMode}
                    role='presentation'
                  >
                    <div className='tooltip-video'>
                      <BiRectangle className={`${theaterMode && 'hidden'}  text-white lg:w-12 lg:text-[1.5rem] `} />
                      <ToolTip text='Chế độ rạp chiếu phim' keyname='t' right='0' />
                    </div>
                    <div className='tooltip-video'>
                      <TbRectangle className={`${!theaterMode && 'hidden'} text-white lg:w-12 lg:text-[1.5rem] `} />
                      <ToolTip text='Chế độ xem mặc định' keyname='t' right='0' />
                    </div>
                  </div>
                  {/* Full-sreen */}
                  <div
                    className='ml-3 flex items-center hover:cursor-pointer lg:ml-0 lg:h-12'
                    role='presentation'
                    onClick={() => {
                      handleClickZoom()
                      toggleFullScreen()
                    }}
                  >
                    <div className='tooltip-video'>
                      <MdZoomInMap className={(zoomOut ? '' : 'hidden') + ' text-white lg:w-12 lg:text-[1.5rem]'} />
                      <ToolTip text='Thoát khỏi chế độ toàn màn hình' keyname='f' right='0' />
                    </div>

                    <div className='tooltip-video'>
                      <MdZoomOutMap className={(zoomOut ? 'hidden' : '') + ' text-white lg:w-12 lg:text-[1.5rem]'} />
                      <ToolTip text='Toàn màn hình' keyname='f' right='0' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='relative z-40' id='ProgressBar'>
                {!isUndefined(thumbnailProps) && <Thumbnail thumbnailProps={thumbnailProps} videoSrc={urlVideo} />}
                <div className='w-full '>
                  <input
                    ref={progressRef}
                    onInput={() => {
                      handleClickProgress()
                    }}
                    onMouseMove={(e) => {
                      calculateProgressValueWhenMouseMove(e)
                    }}
                    type='range'
                    defaultValue={0}
                    min={0}
                    max={100}
                    step={0.1}
                    className='progress-slider my-5 h-[0.1875rem] w-full cursor-pointer lg:my-0'
                  />
                </div>
              </div>

              <div className='from-0% via-20% to-90% absolute bottom-0 left-[-1.875rem] right-[-1.875rem] hidden h-[300%] bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0)] lg:left-[-0.75rem] lg:right-[-0.75rem] lg:block'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
