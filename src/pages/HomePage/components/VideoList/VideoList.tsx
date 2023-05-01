import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
import VideoItem from '../VideoItem/VideoItem'
import Img404 from 'src/assets/404.svg'

const VideoList = () => {
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

  const handleGetData = () => {
    refetch()
  }

  return (
    <div
      className={`${isError ? "flex justify-center items-center h-[100vh] " : "grid" } h-full w-full grid-cols-1 flex-wrap overflow-y-auto md:mt-4 md:grid-cols-2 md:gap-5 md:px-3 lg:mt-0 lg:grid-cols-3 lg:px-16 lg:pt-6`}
    >
      {isLoading &&
        Array(6)
          .fill(0)
          .map((item, index) => (
            <div className='mb-5 flex cursor-pointer flex-col gap-y-3' key={index}>
              <Skeleton className='h-48 w-full rounded-lg' />
              <div className='flex items-start gap-x-3 px-3 md:px-0'>
                <div className='relative h-8 w-8 flex-shrink-0 '>
                  <Skeleton className='h-full w-full rounded-full object-cover' />
                </div>
                <div className='flex w-full flex-col gap-y-3'>
                  <Skeleton className='h-4 w-full rounded' />
                  <Skeleton className='h-4 w-1/2 rounded' />
                  <Skeleton className='h-4 w-1/2 rounded' />
                </div>
              </div>
            </div>
          ))}

      {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}

      {isError && (
        <div className='flex h-[100vh] w-full flex-col items-center justify-center gap-y-5'>
          <img src={Img404} alt="404" className="h-auto w-[20%] "  />
          <span className='text-base font-semibold text-black dark:text-white md:text-lg'>Kết nối Internet</span>
          <span className='text-xs text-black dark:text-white md:text-sm'>
            Không thể kết nối internet. Vui lòng kiểm tra mạng
          </span>
          <button
            className='rounded border-2 border-blue-700 p-2 text-xs font-semibold uppercase text-blue-700 md:text-sm hover:bg-blue-700 hover:text-white'
            onClick={handleGetData}
          >
            Thử lại
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoList
