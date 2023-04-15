import {useState} from 'react'
import CompactVideoItem from './components/CompactVideoItem'
import VideoInformationAndComment from './components/VideoInformationAndComment'
import Video from 'src/components/Video'


const DetailPage = () => {
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);

  const handleTheaterMode = (theaterMode:any) => {
    setIsTheaterMode(theaterMode);
  }
  
  return (
    <> 
      <div className={`${isTheaterMode ? "lg:flex-col lg:mt-0 lg:px-0" : " px-3 lg:px-24 container pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5"}`}>
        <div  className={`${!isTheaterMode && "flex flex-col bg-white dark:bg-[#0f0f0f] lg:mx-0"} lg:w-full  px-0`}>
          <Video handleTheaterMode={handleTheaterMode}/>
          {!isTheaterMode && <VideoInformationAndComment/>}
        </div>
        <div className={`${isTheaterMode && "flex lg:gap-x-5 bg-white dark:bg-[#0f0f0f] lg:px-10" }`}>
          {isTheaterMode && <VideoInformationAndComment/>}
          <CompactVideoItem />
        </div>
      </div>)
    </>
  )
}

export default DetailPage
