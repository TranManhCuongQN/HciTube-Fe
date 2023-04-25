import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import videoApi from 'src/api/video.api'
import Video from 'src/components/Video'
import { VideoItem } from 'src/types/video.type'
import CompactVideoItem from './components/CompactVideoItem'
import VideoInformationAndComment from './components/VideoInformationAndComment'

const DetailPage = () => {
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false)
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['video', id],
    queryFn: () => videoApi.getVideoById(id as string)
  })

  console.log('data:', data)

  const handleTheaterMode = (theaterMode: any) => {
    setIsTheaterMode(theaterMode)
  }

  return (
    <>
      {data && (
        <div
          className={`${
            isTheaterMode
              ? ' lg:mt-0 lg:flex-col lg:px-0'
              : ' container px-3 pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5 lg:px-24'
          }`}
        >
          <div className={`${!isTheaterMode && 'flex flex-col bg-white dark:bg-[#0f0f0f] lg:mx-0'} px-0  lg:w-full`}>
            <Video handleTheaterMode={handleTheaterMode} urlVideo={data?.data.data.video.video} />
            {!isTheaterMode && <VideoInformationAndComment data={data?.data.data as VideoItem} />}
          </div>

          <div className={`${isTheaterMode && 'flex justify-between bg-white dark:bg-[#0f0f0f] lg:gap-x-5 lg:px-24'}`}>
            {isTheaterMode && <VideoInformationAndComment data={data?.data.data as VideoItem} />}
            <CompactVideoItem />
          </div>
        </div>
      )}
    </>
  )
}

export default DetailPage
