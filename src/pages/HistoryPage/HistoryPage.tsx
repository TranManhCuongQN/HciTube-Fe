import AsideBar from "../HomePage/components/AsideBar";
import VideoItem from './VideoItem'
import {RiHistoryLine} from 'react-icons/ri'
import {AiOutlineLike} from 'react-icons/ai'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'

const HistoryPage = () => {
  const {
    data: VideoList,
    isSuccess,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: 'videoList',
    queryFn: videoApi.getVideoAll
  })


  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />

        <div className={`px-3 mb-16 flex justify-center h-full w-full  flex-col 2xl:ml-64`}>
          <div className="pt-3 lg:max-w-[1096px]">
            <h1 className="text-lg md:text-xl font-extrabold text-black dark:text-white mb-3 lg:mb-0 lg:pt-2 lg:pb-6">Hôm nay</h1>
            <div className="flex flex-col w-full h-full">
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>

          <div className="pt-3 lg:max-w-[1096px]">
            <h1 className="text-lg md:text-xl font-extrabold text-black dark:text-white mb-3 lg:mb-0 lg:pt-2 lg:pb-6">Hôm qua</h1>
            <div className="flex flex-col w-full h-full">
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>

          <div className="pt-3 lg:max-w-[1096px]">
            <h1 className="text-lg md:text-xl font-extrabold text-black dark:text-white mb-3 lg:mb-0 lg:pt-2 lg:pb-6">Tuần này</h1>
            <div className="flex flex-col w-full h-full">
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>

          
        </div>
      </div>
    </>
  )
}

export default HistoryPage;