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
import playListAPI from 'src/api/playlist.api'
import { MdOutlinePlaylistPlay } from 'react-icons/md'
import { Video } from 'src/types/video.type'
import { playList } from 'src/types/playList.type'
import useQueryConfig from 'src/hook/useQueryConfig'
import { omit } from 'lodash'
import { createSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const LibraryPage = () => {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    data: getVideoHistory,
    isSuccess: isSuccessHistory,
    isLoading: isLoadingHistory
  } = useQuery({
    queryKey: 'getVideoHistory',
    queryFn: () => videoApi.getVideoWatchTime(profile?._id as string)
  })

  const {
    data: VideoListFavorite,
    isSuccess: isSuccessFavorite,
    isLoading: isLoadingFavorite
  } = useQuery({
    queryKey: ['videoListFavorite', profile?._id],
    queryFn: () => favoriteApi.getVideoFavoriteByChannel(profile?._id as string)
  })

  const queryConFig = useQueryConfig()
  const { category } = queryConFig
  const {
    data: dataPlayList,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['channelPlayList', profile?._id],
    queryFn: () => playListAPI.getPlayListById(profile?._id as string)
  })
  const handlePlayAll = (item: playList) => {
    navigate({
      pathname: `/detail/${(item.videos as Video[])[0]._id}`,
      search: createSearchParams(
        omit(
          {
            ...queryConFig,
            playList: item.id,
            category: category || '1'
          },
          ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'favorite']
        )
      ).toString()
    })
  }

  return (
    <>
      <Helmet>
        <title>Trang thư viện - HciTube</title>
        <meta name='description' content='Trang thư viện  - HciTube' />
      </Helmet>
      <div className='container flex gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />
        <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>
          <div className='flex h-full w-full flex-col items-center justify-center px-3 lg:px-6 lg:py-4'>
            <div className={`flex h-full w-full max-w-[1280px] flex-col items-center`}>
              {/* Watched video */}
              {isLoadingHistory && (
                <div className='mt-6 w-full '>
                  <div className='flex h-full w-full flex-col gap-y-5'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                      <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                    </div>
                    <div className='flex flex-wrap items-center gap-3'>
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
              {isSuccessHistory && (
                <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 '>
                  <div className='flex items-center justify-between pb-3'>
                    <div className='flex items-center text-black dark:text-white'>
                      <RiHistoryLine className='mr-3 h-6 w-6' />
                      <span className='text-xl font-extrabold '>Video đã xem</span>
                    </div>

                    {(getVideoHistory?.data.data.today.length as number) > 0 && (
                      <button
                        className='rounded-full px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100'
                        onClick={() => navigate('/history')}
                      >
                        Xem tất cả
                      </button>
                    )}
                  </div>
                  {(getVideoHistory?.data.data.today.length as number) === 0 && (
                    <div className='flex h-full w-full gap-3  overflow-x-auto'>
                      <div className='flex h-full w-full items-center justify-center '>
                        <span className='pb-10 text-lg font-bold text-black dark:text-white'>
                          Hôm nay bạn chưa xem video nào
                        </span>
                      </div>
                    </div>
                  )}
                  <div className='flex h-full w-full gap-3 overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {isSuccessHistory &&
                      (getVideoHistory?.data.data.today.length as number) > 0 &&
                      getVideoHistory.data.data.today?.map((item, index) => {
                        if (index < 8) {
                          return <VideoItem key={index} data={item.video} createdAt={item.createdAt} watchTime={item.watchedTime} />
                        }
                      })}
                  </div>
                  
                </div>
              )}

              {/* Liked video */}
              {isLoadingFavorite && (
                <div className='mt-6 w-full '>
                  <div className='flex h-full w-full flex-col gap-y-5'>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                      <Skeleton className='h-6 w-48 rounded-lg max-md:w-32' />
                    </div>
                    <div className='flex flex-wrap items-center gap-3'>
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

              {isSuccessFavorite && (
                <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 '>
                  <div className='flex items-center justify-between pb-3'>
                    <div className='flex items-center text-black dark:text-white'>
                      <AiOutlineLike className='mr-3 h-6 w-6' />
                      <span className='text-xl font-extrabold'>Video đã thích</span>
                    </div>
                    {(VideoListFavorite?.data.data.length as number) > 0 && (
                      <button
                        className='rounded-full px-4 py-2 text-sm font-semibold text-blue-500 hover:cursor-pointer hover:bg-blue-100'
                        onClick={() => navigate('/liked-playlist')}
                      >
                        Xem tất cả
                      </button>
                    )}
                  </div>

                  <div
                    className={`${
                      (VideoListFavorite?.data.data.length as number) > 0 &&
                      'sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                    } flex h-full w-full gap-3  overflow-x-auto`}
                  >
                    {isSuccessFavorite && (VideoListFavorite?.data.data.length as number) > 0 ? (
                      VideoListFavorite.data.data?.map((item, index) => {
                        if (index < 8) {
                          return <VideoItem key={index} data={item.video} />
                        }
                      })
                    ) : (
                      <div className='flex h-full w-full items-center justify-center '>
                        <span className='pb-10 text-lg font-bold text-black dark:text-white'>
                          Bạn chưa thích video nào
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Playlist */}
              <div className='mt-6 w-full '>
                <div className='flex items-center justify-between pb-3'>
                  <div className='flex items-center text-black dark:text-white'>
                    <RiHistoryLine className='mr-3 h-6 w-6' />
                    <span className='text-xl font-extrabold'>Danh sách phát</span>
                  </div>
                </div>
                {isLoading && (
                  <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 max-lg:grid-cols-2 max-[320px]:grid-cols-1 md:px-20 lg:grid-cols-3 lg:px-40'>
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <div className='flex flex-col gap-y-3' key={index}>
                          <Skeleton className='h-[130px] w-[220px] rounded-lg max-md:w-[170px]' />
                          <Skeleton className='h-5 w-56 rounded-md max-md:w-40' />
                          <Skeleton className='h-5 w-32 rounded-md max-md:w-20' />
                        </div>
                      ))}
                  </div>
                )}

                {isSuccess && dataPlayList.data.data.length > 0 ? (
                  <div className='flex h-full w-full gap-3 overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {dataPlayList?.data.data.map((item) => {
                      if ((item.videos as Video[]).length === 0) return null
                      return (
                        <div
                          className='col-span-1 flex cursor-pointer flex-col gap-y-2'
                          key={item.id}
                          role='presentation'
                          onClick={() => handlePlayAll(item)}
                        >
                          <div className='relative aspect-video h-fit w-40 flex-shrink-0 rounded-lg sm:w-full'>
                            <img
                              src={(item?.videos as Video[])[0]?.thumbnail}
                              alt='avatar'
                              className='aspect-video w-full rounded-lg object-cover'
                            />
                            <div className='absolute bottom-0 right-0 top-0 flex h-full w-2/5 flex-col items-center justify-center gap-y-2 rounded bg-[#1a1315c0] shadow'>
                              <span className='text-base font-medium text-white'>{item.videos?.length}</span>
                              <MdOutlinePlaylistPlay className='h-8 w-8 text-center text-white' />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className='flex h-20 w-full items-center justify-center   '>
                    <span className='text-lg font-bold text-black dark:text-white'>Bạn chưa có danh sách phát nào</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LibraryPage
