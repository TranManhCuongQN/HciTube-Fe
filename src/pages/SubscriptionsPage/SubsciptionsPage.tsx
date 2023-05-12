import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './VideoItem'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
const SubscriptionsPage = () => {
  const {
    data: getVideoFollowing,
    isLoading,
    isSuccess,
    isError
  } = useQuery({
    queryKey: 'getVideoFollowing',
    queryFn: () => videoApi.getVideoFollowing()
  })

  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />
        <div
          className={`mb-16 flex h-full w-full flex-col items-center px-3 md:mx-auto md:w-[760px] md:px-0 lg:mx-0 lg:w-full 2xl:ml-64`}
        >
          {isLoading && (
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

          {isSuccess && getVideoFollowing.data.data.today.length > 0 && (
            <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:max-w-[1096px]'>
              <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center text-black dark:text-white'>
                  <span className='text-lg font-bold'>Hôm nay</span>
                </div>
              </div>

              <div className='subscription flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
                {isSuccess &&
                  (getVideoFollowing?.data.data.today.length as number) > 0 &&
                  getVideoFollowing?.data.data.today?.map((item, index) => <VideoItem key={index} data={item} />)}
                {isSuccess && (getVideoFollowing?.data.data.today.length as number) === 0 && (
                  <div className='flex  h-full w-full items-center justify-center   '>
                    <span className='text-2xl font-bold text-black dark:text-white'>
                      Không tìm thấy video nào được đăng tải
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {isLoading && (
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

          {isSuccess && getVideoFollowing.data.data.yesterday.length > 0 && (
            <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:max-w-[1096px]'>
              <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center text-black dark:text-white'>
                  <span className='text-lg font-bold'>Hôm qua</span>
                </div>
              </div>

              <div className='subscription flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
                {isSuccess &&
                  getVideoFollowing.data.data.yesterday.length > 0 &&
                  getVideoFollowing?.data.data.yesterday?.map((item, index) => <VideoItem key={index} data={item} />)}
                {isSuccess && getVideoFollowing.data.data.yesterday.length === 0 && (
                  <div className='flex  w-full items-center justify-center'>
                    <span className='text-2xl font-bold text-black dark:text-white'>
                      Không tìm thấy video nào được đăng tải
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {isLoading && (
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

          {isSuccess && getVideoFollowing.data.data.thisWeek.length > 0 && (
            <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:max-w-[1096px]'>
              <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center text-black dark:text-white'>
                  <span className='text-lg font-bold'>Tuần này</span>
                </div>
              </div>

              <div className='subscription flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
                {isSuccess &&
                  getVideoFollowing.data.data.thisWeek.length > 0 &&
                  getVideoFollowing?.data.data.thisWeek?.map((item, index) => <VideoItem key={index} data={item} />)}
                {isSuccess && getVideoFollowing.data.data.thisWeek.length === 0 && (
                  <div className='flex  h-full w-full items-center justify-center   '>
                    <span className='text-2xl font-bold text-black dark:text-white'>
                      Không tìm thấy video nào được đăng tải
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {isSuccess && getVideoFollowing.data.data.thisMonth.length > 0 && (
            <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:max-w-[1096px]'>
              <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center text-black dark:text-white'>
                  <span className='text-lg font-bold'>Tháng này</span>
                </div>
              </div>

              <div className='subscription flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
                {isSuccess &&
                  getVideoFollowing.data.data.thisMonth.length > 0 &&
                  getVideoFollowing?.data.data.thisMonth?.map((item, index) => <VideoItem key={index} data={item} />)}
                {isSuccess && getVideoFollowing.data.data.thisMonth.length === 0 && (
                  <div className='flex  h-full w-full items-center justify-center   '>
                    <span className='text-2xl font-bold text-black dark:text-white'>
                      Không tìm thấy video nào được đăng tải
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {isSuccess && getVideoFollowing.data.data.older.length > 0 && (
            <div className='mt-6 w-full border-b border-b-[rgba(0,0,0,0.1)] pb-6 dark:border-b-gray-600 lg:max-w-[1096px]'>
              <div className='flex items-center justify-between pb-3'>
                <div className='flex items-center text-black dark:text-white'>
                  <span className='text-lg font-bold'>Năm này</span>
                </div>
              </div>
              <div className='subscription flex h-full w-full gap-x-5 overflow-x-auto md:max-h-[440px] md:flex-wrap md:overflow-y-hidden lg:h-full lg:max-h-[450px] lg:gap-x-3'>
                {isSuccess &&
                  getVideoFollowing.data.data.older.length > 0 &&
                  getVideoFollowing?.data.data.older?.map((item, index) => <VideoItem key={index} data={item} />)}
                {isSuccess && getVideoFollowing.data.data.older.length === 0 && (
                  <div className='flex  h-full w-full items-center justify-center   '>
                    <span className='text-2xl font-bold text-black dark:text-white'>
                      Không tìm thấy video nào được đăng tải
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {isError && (
            <div className='flex h-[80vh] w-full items-center justify-center'>
              <span className='text-2xl font-bold text-black dark:text-white'>Bạn chưa đăng ký kênh nào</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SubscriptionsPage
