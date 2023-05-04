import AsideBar from "../HomePage/components/AsideBar";
import VideoItem from './components/VideoItem'
import {RiHistoryLine} from 'react-icons/ri'
import {AiOutlineLike} from 'react-icons/ai'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'

const LibraryPage = () => {
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

        <div className={`px-3 md:px-0 mb-16 flex justify-center h-full w-full md:w-[760px] md:mx-auto lg:w-full lg:mx-0 flex-col 2xl:ml-64`}>
          <div className="mt-6 pb-6 lg:max-w-[1096px] lg:mx-auto border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600">
            <div className="flex justify-between items-center pb-3">
              <div className="flex items-center text-black dark:text-white">
                <RiHistoryLine className="w-6 h-6 mr-3"/>
                <span className="font-bold text-lg">Video đã xem</span>
              </div>

              <button className="px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100 rounded-full">
                Xem tất cả
              </button>
            </div>

            <div className="flex md:flex-wrap gap-x-5 lg:gap-x-3 w-full h-full md:max-h-[440px] lg:max-h-[450px] lg:h-full md:overflow-y-hidden overflow-x-auto">
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>

          <div className="mt-6 lg:max-w-[1096px] lg:mx-auto">
            <div className="flex justify-between items-center pb-3">
              <div className="flex items-center text-black dark:text-white">
                <AiOutlineLike className="w-6 h-6 mr-3"/>
                <span className="font-bold text-lg">Video đã thích</span>
              </div>

              <button className="px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100 rounded-full">
                Xem tất cả
              </button>
            </div>

            <div className="flex md:flex-wrap gap-x-5 lg:gap-x-3 w-full h-full md:max-h-[440px] lg:max-h-[450px] lg:h-full md:overflow-y-hidden overflow-x-auto">
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LibraryPage;