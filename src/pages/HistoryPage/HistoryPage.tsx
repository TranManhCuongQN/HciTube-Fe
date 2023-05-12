import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './VideoItem'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

const HistoryPage = () => {
  const { profile } = useContext(AppContext)

  const { data: getVideoHistory, isSuccess } = useQuery({
    queryKey: 'getVideoHistory',
    queryFn: () => videoApi.getVideoWatchTime(profile?._id as string)
  })

  console.log(getVideoHistory)

  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />

        <div className={`mb-16 flex h-full w-full flex-col justify-center  px-3 2xl:ml-64`}>
          <div className='pt-3 lg:max-w-[1096px]'>
            {/* <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
              Hôm nay
            </h1> */}
            <div className='flex h-full w-full flex-col'>
              {isSuccess && getVideoHistory.data.data.length > 0 ?
                getVideoHistory.data.data?.map((item, index) => (
                  <VideoItem key={index} data={item.video} watchTime={item.watchedTime} />
                )) :
                (
                  <div className="flex justify-center items-center absolute right-0 left-0 h-full  ">
                    <span className="text-xl lg:text-2xl font-bold text-black dark:text-white">Bạn chưa xem video nào</span>
                  </div>
                )
              }
            </div>
          </div>

          {/* <div className='pt-3 lg:max-w-[1096px]'>
            <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
              Hôm qua
            </h1>
            <div className='flex h-full w-full flex-col'>
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>

          <div className='pt-3 lg:max-w-[1096px]'>
            <h1 className='mb-3 text-lg font-extrabold text-black dark:text-white md:text-xl lg:mb-0 lg:pt-2 lg:pb-6'>
              Tuần này
            </h1>
            <div className='flex h-full w-full flex-col'>
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default HistoryPage
