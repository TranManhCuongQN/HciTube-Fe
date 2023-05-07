import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './VideoItem'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import favoriteApi from 'src/api/favorite.api'
import Skeleton from 'src/components/Skeleton'

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

  console.log('favoriteVideo:', VideoList?.data.data)

  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />

        <div className={`mb-16 flex h-full w-full flex-col justify-center px-3 2xl:ml-64`}>
          <div className='mt-6 pb-6'>
            <div className='flex h-full w-full flex-col'>
              {isLoading &&
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      className='mt-4 flex w-full cursor-pointer flex-col gap-y-5 lg:flex-row lg:gap-x-5'
                      key={index}
                    >
                      <Skeleton className='h-56 w-full flex-shrink-0 md:rounded-xl lg:w-[360px]' />
                      <div className='flex w-full flex-col gap-y-5'>
                        <Skeleton className='h-4 w-full rounded-lg' />
                        <Skeleton className='h-4 w-1/2 rounded-lg' />
                        <Skeleton className='h-4 w-1/3 rounded-lg' />
                        <Skeleton className='h-4 w-1/4 rounded-lg' />
                      </div>
                    </div>
                  ))}
              {isSuccess &&
                (VideoList.data.data.length as number) > 0 &&
                VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item.video} />)}
              {isSuccess && (VideoList.data.data.length as number) === 0 && (
                <div className='flex h-full w-full flex-col items-center justify-center'>
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
