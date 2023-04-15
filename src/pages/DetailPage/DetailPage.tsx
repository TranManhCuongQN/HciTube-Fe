import { useState } from 'react'
import CompactVideoItem from './components/CompactVideoItem'
import VideoInformationAndComment from './components/VideoInformationAndComment'
import Video from 'src/components/Video'

const DetailPage = () => {
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false)

  const handleTheaterMode = (theaterMode: any) => {
    setIsTheaterMode(theaterMode)
  }

  return (
    <>
      <div
        className={`${
          isTheaterMode
            ? 'lg:mt-0 lg:flex-col lg:px-0'
            : ' container px-3 pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5 lg:px-24'
        }`}
      >
        <div className={`${!isTheaterMode && 'flex flex-col bg-white dark:bg-[#0f0f0f] lg:mx-0'} px-0  lg:w-full`}>
          <Video handleTheaterMode={handleTheaterMode} />
          {!isTheaterMode && <VideoInformationAndComment />}
        </div>
        <div className={`${isTheaterMode && 'flex bg-white dark:bg-[#0f0f0f] lg:gap-x-5 lg:px-10'}`}>
          {isTheaterMode && <VideoInformationAndComment />}
          <CompactVideoItem />
        </div>
      </div>
      )
    </>
  )
}

export default DetailPage
