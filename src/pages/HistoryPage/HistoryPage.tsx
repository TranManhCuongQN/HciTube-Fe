import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './VideoItem'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

const HistoryPage = () => {
  const { profile } = useContext(AppContext)

  const {
    data: getVideoHistory,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: 'getVideoHistory',
    queryFn: () => videoApi.getVideoWatchTime(profile?._id as string)
  })

  console.log('getHistory', getVideoHistory)

  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f] overflow-y-scroll'>
        <AsideBar />

        <div className={`mb-16 flex h-full w-full flex-col justify-center  px-3 2xl:ml-64`}>
          <div className='pt-3 lg:max-w-[1096px]'>
            {isLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className='mt-4 flex w-full cursor-pointer flex-col gap-y-5 lg:flex-row lg:gap-x-5' key={index}>
                    <Skeleton className='h-56 w-full flex-shrink-0 md:rounded-xl lg:w-[360px]' />
                    <div className='flex w-full flex-col gap-y-5'>
                      <Skeleton className='h-4 w-full rounded-lg' />
                      <Skeleton className='h-4 w-1/2 rounded-lg' />
                      <Skeleton className='h-4 w-1/3 rounded-lg' />
                      <Skeleton className='h-4 w-1/4 rounded-lg' />
                    </div>
                  </div>
                ))}
            {isSuccess && getVideoHistory.data.data.today.length > 0 && (
              <>
                <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
                  Hôm nay
                </h1>
                <div className='flex h-full w-full flex-col'>
                  {isSuccess &&
                    getVideoHistory.data.data.today.length > 0 &&
                    getVideoHistory.data.data.today?.map((item, index) => (
                      <VideoItem key={index} data={item.video} watchTime={item.watchedTime} />
                    ))}
                </div>
              </>
            )}
          </div>

          <div className='pt-3 lg:max-w-[1096px]'>
            {isLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className='mt-4 flex w-full cursor-pointer flex-col gap-y-5 lg:flex-row lg:gap-x-5' key={index}>
                    <Skeleton className='h-56 w-full flex-shrink-0 md:rounded-xl lg:w-[360px]' />
                    <div className='flex w-full flex-col gap-y-5'>
                      <Skeleton className='h-4 w-full rounded-lg' />
                      <Skeleton className='h-4 w-1/2 rounded-lg' />
                      <Skeleton className='h-4 w-1/3 rounded-lg' />
                      <Skeleton className='h-4 w-1/4 rounded-lg' />
                    </div>
                  </div>
                ))}
            {isSuccess && getVideoHistory.data.data.yesterday.length > 0 && (
              <>
                <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
                  Hôm qua
                </h1>
                <div className='flex h-full w-full flex-col'>
                  {isSuccess &&
                    getVideoHistory.data.data.yesterday.length > 0 &&
                    getVideoHistory.data.data.yesterday?.map((item, index) => (
                      <VideoItem key={index} data={item.video} watchTime={item.watchedTime} />
                    ))}
                </div>
              </>
            )}
          </div>

          <div className='pt-3 lg:max-w-[1096px]'>
            {isLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className='mt-4 flex w-full cursor-pointer flex-col gap-y-5 lg:flex-row lg:gap-x-5' key={index}>
                    <Skeleton className='h-56 w-full flex-shrink-0 md:rounded-xl lg:w-[360px]' />
                    <div className='flex w-full flex-col gap-y-5'>
                      <Skeleton className='h-4 w-full rounded-lg' />
                      <Skeleton className='h-4 w-1/2 rounded-lg' />
                      <Skeleton className='h-4 w-1/3 rounded-lg' />
                      <Skeleton className='h-4 w-1/4 rounded-lg' />
                    </div>
                  </div>
                ))}
            {isSuccess && getVideoHistory.data.data.thisWeek.length > 0 && (
              <>
                <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
                  Tuần này
                </h1>
                <div className='flex h-full w-full flex-col'>
                  {isSuccess &&
                    getVideoHistory.data.data.thisWeek.length > 0 &&
                    getVideoHistory.data.data.thisWeek?.map((item, index) => (
                      <VideoItem key={index} data={item.video} watchTime={item.watchedTime} />
                    ))}
                </div>
              </>
            )}
          </div>

          <div className='pt-3 lg:max-w-[1096px]'>
            {isLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className='mt-4 flex w-full cursor-pointer flex-col gap-y-5 lg:flex-row lg:gap-x-5' key={index}>
                    <Skeleton className='h-56 w-full flex-shrink-0 md:rounded-xl lg:w-[360px]' />
                    <div className='flex w-full flex-col gap-y-5'>
                      <Skeleton className='h-4 w-full rounded-lg' />
                      <Skeleton className='h-4 w-1/2 rounded-lg' />
                      <Skeleton className='h-4 w-1/3 rounded-lg' />
                      <Skeleton className='h-4 w-1/4 rounded-lg' />
                    </div>
                  </div>
                ))}
            {isSuccess && getVideoHistory.data.data.thisMonth.length > 0 && (
              <>
                <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
                  Tháng này
                </h1>
                <div className='flex h-full w-full flex-col'>
                  {isSuccess &&
                    getVideoHistory.data.data.thisWeek.length > 0 &&
                    getVideoHistory.data.data.thisWeek?.map((item, index) => (
                      <VideoItem key={index} data={item.video} watchTime={item.watchedTime} />
                    ))}
                </div>
              </>
            )}
          </div>

          <div className='pt-3 lg:max-w-[1096px]'>
            {isLoading &&
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className='mt-4 flex w-full cursor-pointer flex-col gap-y-5 lg:flex-row lg:gap-x-5' key={index}>
                    <Skeleton className='h-56 w-full flex-shrink-0 md:rounded-xl lg:w-[360px]' />
                    <div className='flex w-full flex-col gap-y-5'>
                      <Skeleton className='h-4 w-full rounded-lg' />
                      <Skeleton className='h-4 w-1/2 rounded-lg' />
                      <Skeleton className='h-4 w-1/3 rounded-lg' />
                      <Skeleton className='h-4 w-1/4 rounded-lg' />
                    </div>
                  </div>
                ))}
            {isSuccess && getVideoHistory.data.data.older.length > 0 && (
              <>
                <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
                  Năm này
                </h1>
                <div className='flex h-full w-full flex-col'>
                  {isSuccess &&
                    getVideoHistory.data.data.older.length > 0 &&
                    getVideoHistory.data.data.older?.map((item, index) => (
                      <VideoItem key={index} data={item.video} watchTime={item.watchedTime} />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryPage
