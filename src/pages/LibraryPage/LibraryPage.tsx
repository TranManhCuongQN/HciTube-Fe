import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './components/VideoItem'
import { RiHistoryLine } from 'react-icons/ri'
import { AiOutlineLike } from 'react-icons/ai'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import favoriteApi from 'src/api/favorite.api'
import { useNavigate } from 'react-router-dom'
import PlayList from './components/PlayList'

const LibraryPage = () => {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    data: VideoList,
    isSuccess: isSuccessVideoList,
    isLoading: isLoadingVideoList
  } = useQuery({
    queryKey: 'videoList',
    queryFn: videoApi.getVideoAll
  })

  const {
    data: VideoListFavorite,
    isSuccess: isSuccessFavorite,
    isLoading: isLoadingFavorite
  } = useQuery({
    queryKey: ['videoListFavorite', profile?._id],
    queryFn: () => favoriteApi.getVideoFavoriteByChannel(profile?._id as string)
  })

  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />
        <div
          className={`mb-16 flex h-full w-full flex-col items-center px-3 md:mx-auto md:w-[760px] md:px-0 lg:mx-0 lg:w-full 2xl:ml-64`}
        >
          {isLoadingVideoList && (
            <div className='mt-6 w-full lg:max-w-[1096px]'>
              <div className='flex h-full w-full flex-col gap-y-5'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                  <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                </div>
                <div className='flex flex-wrap items-center gap-5'>
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className='flex flex-col gap-y-3 max-md:mx-auto max-md:w-40 max-[360px]:w-32 md:w-60 lg:w-64'
                        key={index}
                      >
                        <Skeleton className='h-40 w-full rounded-lg max-md:h-28 ' />
                        <Skeleton className='h-5 w-full rounded' />
                        <Skeleton className='h-5 w-1/2 rounded' />
                        <Skeleton className='h-5 w-1/2 rounded' />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          {isSuccessVideoList && (VideoList?.data.data.length as number) > 0 && (
            <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:max-w-[1096px]'>
              <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center text-black dark:text-white'>
                  <RiHistoryLine className='mr-3 h-6 w-6' />
                  <span className='text-lg font-bold'>Video đã xem</span>
                </div>

                <button className='rounded-full px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100'>
                  Phát tất cả
                </button>
              </div>

              <div className='flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
                {isSuccessVideoList && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
              </div>
            </div>
          )}

          <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:max-w-[1096px]'>
            <div className='flex items-center justify-between pb-3'>
              <div className='flex items-center text-black dark:text-white'>
                <RiHistoryLine className='mr-3 h-6 w-6' />
                <span className='text-lg font-bold'>Danh sách phát</span>
              </div>
            </div>
            <PlayList />
          </div>

          {isLoadingFavorite && (
            <div className='mt-6 w-full lg:max-w-[1096px]'>
              <div className='flex h-full w-full flex-col gap-y-5'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                  <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                </div>
                <div className='flex flex-wrap items-center gap-5'>
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className='flex flex-col gap-y-3 max-md:mx-auto max-md:w-40 max-[360px]:w-32 md:w-60 lg:w-64'
                        key={index}
                      >
                        <Skeleton className='h-40 w-full rounded-lg max-md:h-28 ' />
                        <Skeleton className='h-5 w-full rounded' />
                        <Skeleton className='h-5 w-1/2 rounded' />
                        <Skeleton className='h-5 w-1/2 rounded' />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {isSuccessFavorite && (VideoListFavorite?.data.data.length as number) > 0 && (
            <div className='mt-6 w-full lg:max-w-[1096px]'>
              <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center text-black dark:text-white'>
                  <AiOutlineLike className='mr-3 h-6 w-6' />
                  <span className='text-lg font-bold'>Video đã thích</span>
                </div>

                <button
                  className='rounded-full px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100'
                  onClick={() => navigate('/liked-playlist')}
                >
                  Xem tất cả
                </button>
              </div>

              <div className='flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
                {isSuccessFavorite &&
                  VideoListFavorite.data.data?.map((item, index) => <VideoItem key={index} data={item.video} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default LibraryPage
