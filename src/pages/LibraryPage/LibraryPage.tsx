import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './components/VideoItem'
import { RiHistoryLine } from 'react-icons/ri'
import { AiOutlineLike } from 'react-icons/ai'
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
        <AsideBar />s
        <div
          className={`mb-16 flex h-full w-full flex-col justify-center px-3 md:mx-auto md:w-[760px] md:px-0 lg:mx-0 lg:w-full 2xl:ml-64`}
        >
          <div className='mt-6 border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:mx-auto lg:max-w-[1096px]'>
            <div className='flex items-center justify-between pb-3'>
              <div className='flex items-center text-black dark:text-white'>
                <RiHistoryLine className='mr-3 h-6 w-6' />
                <span className='text-lg font-bold'>Video đã xem</span>
              </div>

              <button className='rounded-full px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100'>
                Xem tất cả
              </button>
            </div>

            <div className='flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>

          <div className='mt-6 lg:mx-auto lg:max-w-[1096px]'>
            <div className='flex items-center justify-between pb-3'>
              <div className='flex items-center text-black dark:text-white'>
                <AiOutlineLike className='mr-3 h-6 w-6' />
                <span className='text-lg font-bold'>Video đã thích</span>
              </div>

              <button className='rounded-full px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100'>
                Xem tất cả
              </button>
            </div>

            <div className='flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
              {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LibraryPage
