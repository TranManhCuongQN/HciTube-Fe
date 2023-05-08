import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './VideoItem'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import favoriteApi from 'src/api/favorite.api'
import Skeleton from 'src/components/Skeleton'
import ControlSection from './ControlSection'
import { favorite } from 'src/types/favorite.type'

const LikedPlaylistPage = () => {
  const { profile } = useContext(AppContext)
  const {
    data: VideoList,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['videoListFavorite', profile?._id],
    queryFn: () => favoriteApi.getVideoFavoriteByChannel(profile?._id as string)
  })

  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />

        <div className={`mt-6 mb-16 flex h-full w-full flex-col justify-center md:px-3 lg:flex-row 2xl:ml-64`}>
          {isLoading && (
            <div className='flex h-full w-full flex-col justify-evenly lg:flex-row lg:items-stretch '>
              <Skeleton className='mb-4 w-full flex-shrink-0 rounded-lg max-lg:h-52 lg:w-[500px]' />
              <div className='flex h-full w-full flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-1/2'>
                {Array(6)
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

          {isSuccess && VideoList.data.data.length > 0 && <ControlSection data={VideoList?.data.data as favorite[]} />}
          <div className=' pb-6'>
            <div className='flex h-full w-full flex-col'>
              {isSuccess &&
                (VideoList.data.data.length as number) > 0 &&
                VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item.video} index={index} />)}
              {isSuccess && (VideoList.data.data.length as number) === 0 && (
                <div className='flex h-[100vh] w-full flex-col items-center justify-center'>
                  <span className='text-xl font-bold text-black dark:text-white'>Không có video nào</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LikedPlaylistPage
