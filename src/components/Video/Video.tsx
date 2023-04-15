import React ,{useEffect, useState, useRef} from 'react';
import { MdZoomOutMap, MdZoomInMap } from "react-icons/md";
import {BiSkipNext, BiSkipPrevious, BiPlay, BiPause, BiRectangle} from "react-icons/bi";
import {HiVolumeUp, HiVolumeOff} from "react-icons/hi";
import {TbRectangle} from "react-icons/tb";
import {IoMdSettings} from "react-icons/io";
import Evy from "src/assets/EVY.mp4"
import Lauv from "src/assets/Lauv.mp4"
import Thumbnail from './Thumbnail';
   
declare global {
  interface HTMLInputElement {
    oldvalue?: number;
  }
}



const Video = ({handleTheaterMode} : any) => {
  


  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  const [playing, setPlaying] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(true);
  const [timeElapsed, setTimeElapsed] = useState<string>("00:00");
  const [zoomOut, setZoomOut] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [theaterMode, setTheaterMode] = useState<boolean>(false);

  const videoDuration = videoRef.current?.duration || 0;
  
  const videoSrc = Lauv;


  const handlePlayAndPause = () => {
    if(playing == false) {
      playVideo();
    }
    else {
      pauseVideo();
    }
  }

  // Format time
  const formatTime = (duration:number) => {
    const result = new Date(duration * 1000).toISOString().slice(11, 19);
    const hour = result.slice(0, 2);
    const minute = result.slice(3, 5);
    const second = result.slice(6, 8);
    return (hour !== "00") ? `${hour}:${minute}:${second}` : `${minute}:${second}`;
  }

  // Update time elapsed
  const updateTimeElapsed = () => {
    const time = videoRef.current?.currentTime || 0;
    setTimeElapsed(formatTime(Math.floor(time)))
  }

  // Progress bar
  useEffect(() => {
    const time = videoRef.current?.currentTime || 0;
    const durationPercent = (time / videoDuration) * 100;
    progressRef.current.value = String(durationPercent);
    slider(progressRef, "red", "rgba(255, 255, 255, 0.3)");
  }, [timeElapsed])

  

  const handleClickProgress = () => {
    videoRef.current.currentTime = Number(progressRef.current.value) / 100 * videoDuration;
    updateTimeElapsed();
  }



  // Handle hide control screen
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setHidden(playing)
    }, 3000)
    return () => clearTimeout(timeOut);
  },[playing, hidden])


  // Handle zoom
  const handleClickZoom =  () => {
    setZoomOut(!zoomOut);

  }

  // Theater Mode
  const handleClickTheaterMode = () => {
    setTheaterMode(!theaterMode);
  }

  const playVideo = () => {
    videoRef.current?.play();
    setPlaying(true);
  }

  const pauseVideo = () => {
    videoRef.current?.pause();
    setPlaying(false);
  }



  // Change Volume
  const handleChangeVolume = () => {
    videoRef.current.volume = Number(volumeRef.current.value); 
    volumeRef.current.oldvalue = videoRef.current.volume;
    slider(volumeRef, "white", "rgba(255, 255, 255, 0.3)");
  }

  // Mute
  const toggleMute = () => {
    videoRef.current.muted = !muted;
    if(muted) {
      volumeRef.current.value = String(volumeRef.current.oldvalue);
      videoRef.current.volume = Number(volumeRef.current.value); 
      slider(volumeRef, "white", "rgba(255, 255, 255, 0.3)");
    }
    else {
      volumeRef.current.value = String(0);
      videoRef.current.volume = Number(volumeRef.current.value); 
      slider(volumeRef, "white", "rgba(255, 255, 255, 0.3)");
    }

    setMuted(!muted)
  }

  useEffect(() => {
    volumeRef.current.oldvalue = 1;
  }, [])


  const slider = (ref:any, leftColor:string, rightColor:string) => {
    const valPercent = Number(ref.current.value) / Number(ref.current.max) * 100;
    ref.current.style.background = `linear-gradient(to right, ${leftColor} ${valPercent}%, ${rightColor} ${valPercent}%`;
  } 
  // Pass data from Video to WatchingLayout
  useEffect(() => {
    handleTheaterMode(theaterMode)
  },[theaterMode])

  //Handle click zoom button 
  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current?.requestFullscreen();
    }
  }

  // Thumbnail
  const [thumbnailProps, setThumbnailProps] = useState<object>({});
  const calculateProgressValueWhenMouseMove = (e:any) => {
    let x = e.clientX
    let rect = progressRef.current?.getBoundingClientRect();
    let val = (x - rect.left) / rect.width
    let thumbnailCurrentTime = val * videoDuration; 
  
    const props = {
      mouseClientX: x,
      thumbnailCurrentTime,
      rectProgress: rect,
    }
    setThumbnailProps(props);
  }
  

  return (
    <div className={`${theaterMode && "lg:h-[75vh]"} mb-2 max-w-full`}>
      <div className={`${zoomOut ? "" : ""} h-full bg-black`}>
        <div className={`group relative h-full ${zoomOut ? "" : "" }`} onClick={() => setHidden(false)}>
          <video
            src={videoSrc}
            ref={videoRef}
            autoPlay
            onTimeUpdate={updateTimeElapsed}
            className={`${zoomOut ?  "lg:w-full" : "mx-auto"} h-full `}
          />
          {/* Play and Pause on Desktop */}
          <div className="hidden items-center justify-center absolute h-full top-0 right-0 left-0 lg:flex" onClick={handlePlayAndPause}>
            <BiPlay className={(playing ? "hidden" : "") +  " text-[4rem] text-white p-2 opacity-0"} id="DesktopPlayBtn" onClick={playVideo}/>
            <BiPause className={(playing ? "" : "hidden") + " text-[4rem] text-white p-2 opacity-0"} id="DesktopPauseBtn" onClick={pauseVideo}/>
          </div>

          <div className={`lg:group-hover:block ${hidden ? "hidden" : "block"}`}>
            <div className=" absolute w-full h-full bg-black top-0 opacity-50 lg:hidden"></div>

            <div className="flex items-center justify-center absolute h-full top-0 left-[1.875rem] right-[1.875rem] mx-3 lg:justify-between lg:hidden">
              <BiSkipPrevious className="text-[4rem] text-white p-2 lg:hidden"  />
              <div className="sm:mx-16">
                <BiPlay className={(playing ? "hidden" : "") + " text-[6rem] text-white p-2 lg:hidden"} onClick={playVideo}/>
                <BiPause className={(playing ? "" : "hidden") + " text-[6rem] text-white p-2 lg:hidden"}  onClick={pauseVideo}/>
              </div>
              <BiSkipNext className="text-[4rem] text-white p-2 lg:hidden" />
            </div>

            <div className=" absolute bottom-0 left-[1.875rem] right-[1.875rem] lg:left-[0.75rem] lg:right-[0.75rem] flex flex-col lg:flex-col-reverse justify-between ">
              <div className=" w-full flex justify-between items-center lg:h-12">
                <div className="flex items-center">

                  <BiSkipPrevious className="text-[3rem] text-white px-1 hidden lg:flex lg:hover:cursor-pointer"/>
                  <div className="hidden lg:flex lg:hover:cursor-pointer">
                    <BiPlay className={(playing ? "hidden" : "") + " text-white w-12 h-12 px-1"} onClick={playVideo}/>
                    <BiPause className={(playing ? "" : "hidden") + " text-white w-12 h-12 px-1"}  onClick={pauseVideo}/>
                  </div>
                  <BiSkipNext className="text-[3rem] text-white px-1 hidden lg:flex lg:hover:cursor-pointer"/>
                  
                  <div className="group flex mr-2 max-w-[100px] items-center" id="Volume">
                    <div 
                      className="hidden h-12 w-12 px-1 lg:flex lg:items-center lg:hover:cursor-pointer "
                      onClick={toggleMute}
                      
                    >
                      <HiVolumeUp className={`${muted && "hidden"} w-12 text-white text-[1.5rem]`}/>
                      <HiVolumeOff className={`${!muted && "hidden"} w-12 text-white text-[1.5rem]`}/>
                      
                    </div>

                    <div className="volume-slider-container flex items-center">
                      <input 
                          type="range"  
                          min={0}
                          max={1}
                          step={0.1}
                          onChange={handleChangeVolume}
                          ref={volumeRef}
                          className="volume-slider"
                        />
                    </div>
                  </div>

                    
                  
                  <div className="text-xs lg:h-12 lg:flex lg:items-center">
                    <div className="lg:text-[#DDD]">  
                      <span>{timeElapsed}</span>
                      <span className="opacity-70 lg:opacity-100"> / </span>
                      <span  className="opacity-70 lg:opacity-100">{formatTime(videoDuration)}</span>
                    </div>
                  </div>

                </div>
                
                <div className="flex items-center">
                  <div className="hidden items-center md:flex hover:cursor-pointer lg:h-12">
                    <IoMdSettings className="lg:text-[1.5rem] text-white lg:w-12"/>
                  </div>
                  <div 
                    className="hidden items-center lg:flex hover:cursor-pointer lg:h-12"
                    onClick={handleClickTheaterMode}
                  >
                    <BiRectangle className={`${theaterMode && "hidden"}  text-white lg:text-[1.5rem] lg:w-12 `}/>
                    <TbRectangle className={`${!theaterMode && "hidden"} text-white lg:text-[1.5rem] lg:w-12 `}/>
                  </div>

                  <div 
                    className="flex items-center hover:cursor-pointer ml-3 lg:ml-0 lg:h-12"
                    onClick={() => {handleClickZoom(); toggleFullScreen()}}
                  >
                    <MdZoomInMap className={(zoomOut ? "" : "hidden") + " text-white lg:text-[1.5rem] lg:w-12" }/>
                    <MdZoomOutMap className={(zoomOut ? "hidden" : "") + " text-white lg:text-[1.5rem] lg:w-12"}  />

                  </div>
                </div>

              </div>

              <div className="relative"  id="ProgressBar">
                <Thumbnail props={thumbnailProps}  />
                <div className="w-full " >
                  <input 
                    ref={progressRef}
                    onInput={handleClickProgress}
                    onMouseMove={(e) => {calculateProgressValueWhenMouseMove(e)}}
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    className='progress-slider w-full my-5 h-[0.1875rem] lg:my-0 cursor-pointer'
                    
                  />

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Video;