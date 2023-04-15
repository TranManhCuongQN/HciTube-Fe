import {useRef} from 'react'
import Lauv from "src/assets/Lauv.mp4"


const Thumbnail = ({props}:any) => {
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  let videoDuration = 1;
  const {mouseClientX, thumbnailCurrentTime, rectProgress} = props;
  if(videoRef.current) {
    videoDuration = videoRef.current?.duration;
    videoRef.current.currentTime = !isNaN(thumbnailCurrentTime) ? thumbnailCurrentTime : 0;
  }
  const progressPercent = Math.round( thumbnailCurrentTime / videoDuration* 100);
  if(thumbnailRef.current && mouseClientX && rectProgress) {
    const halfOfThumbnailWidth = thumbnailRef.current?.offsetWidth / 2;
    if(mouseClientX - rectProgress.left < halfOfThumbnailWidth) thumbnailRef.current.style.left = "0";
    else if(rectProgress.right - mouseClientX <= halfOfThumbnailWidth) {
      thumbnailRef.current.style.removeProperty("left");
      thumbnailRef.current.style.right = `0`;
    } 
    else {
      thumbnailRef.current.style.removeProperty("right");
      thumbnailRef.current.style.left = `calc(${progressPercent}% - ${halfOfThumbnailWidth}px)`;
    } 

    
  }
  return (
    <>
    <div ref={thumbnailRef} className="border-solid items-center border-white border-[1.4px] absolute bottom-[100%] h-[6rem] w-[9rem] bg-black" id="Thumbnail">
      <video
            src={Lauv}
            ref={videoRef}
            className="w-full"
          />
    </div>
    </>
  )
}

export default Thumbnail
