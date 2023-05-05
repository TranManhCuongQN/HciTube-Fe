import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
import Video from 'src/components/Video'
import { VideoItem } from 'src/types/video.type'
import CompactVideoItem from './components/CompactVideoItem'
import VideoInformationAndComment from './components/VideoInformationAndComment'

const DetailPage = () => {
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false)
  const { id } = useParams()

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['video', id],
    queryFn: () => videoApi.getVideoById(id as string)
  })

  // console.log('data:', data)

  const handleTheaterMode = (theaterMode: any) => {
    setIsTheaterMode(theaterMode)
  }

  return (
    <>
      {isLoading && (
        <div className='container min-h-screen px-3 pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5 lg:px-24 '>
          <div className='flex flex-col bg-white px-0 dark:bg-[#0f0f0f] lg:mx-0  lg:w-full'>
            <Skeleton className='mt-2 max-w-full rounded lg:h-[75vh]' />
            <Skeleton className='mt-5 h-5 w-1/2 rounded' />
            <div className='mt-5 flex items-center justify-between'>
              <div className='flex items-center gap-x-5'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='flex flex-col gap-y-2'>
                  <Skeleton className='h-3 w-20 rounded' />
                  <Skeleton className='h-3 w-20 rounded' />
                </div>
                <Skeleton className='h-7 w-28 rounded-xl' />
              </div>
              <div className='flex items-center gap-x-5'>
                <Skeleton className='h-7 w-28 rounded-xl' />
                <Skeleton className='h-7 w-28 rounded-xl' />
                <Skeleton className='h-7 w-28 rounded-xl' />
              </div>
            </div>
            <div className='mt-5 flex items-center'>
              <Skeleton className='h-36 w-full rounded' />
            </div>
          </div>
          <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div className='flex items-center gap-x-2' key={index}>
                  <Skeleton className='h-16 w-28 flex-shrink-0 rounded-lg object-cover md:h-20 md:w-32' />
                  <div className='flex h-16 w-full flex-col flex-wrap  justify-evenly text-black dark:text-white md:h-20'>
                    <Skeleton className='h-3 w-full rounded' />
                    <Skeleton className='h-3 w-1/2 rounded' />
                    <Skeleton className='h-3 w-1/2 rounded' />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {isSuccess && (
        <div
          className={`${
            isTheaterMode
              ? ' min-h-screen lg:mt-0 lg:flex-col lg:px-0'
              : ' container min-h-screen pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5 lg:px-24'
          } `}
        >
          <div
            className={`${
              !isTheaterMode && 'flex flex-col bg-white dark:bg-[#0f0f0f] lg:mx-0'
            } video-animation  px-0 lg:w-full`}
          >
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
