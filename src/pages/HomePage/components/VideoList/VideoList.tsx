import { useInfiniteQuery, useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import Skeleton from 'src/components/Skeleton'
import VideoItem from '../VideoItem/VideoItem'
import useQueryConfig from 'src/hook/useQueryConfig'
import { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

interface VideoListProps {
  filter?: string
}
const VideoList = ({ filter }: VideoListProps) => {
  const queryConfig = useQueryConfig()

  const {
    data: VideoList,
    isSuccess: isSuccessVideoList,
    isLoading: isLoadingVideoList,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['videoList'],
    queryFn: ({ pageParam = 1 }) =>
      videoApi.getVideo({
        page: pageParam,
        limit: 6
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.data.length === 0) {
        return undefined
      }
      return pages.length + 1
    },
    enabled: filter === '1'
  })

  const {
    data: getVideo,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['getVideo', queryConfig],
    queryFn: () => videoApi.searchVideo(queryConfig),
    enabled: filter !== '1'
  })

  useEffect(() => {
    let fetching = false
    const onScroll = async (event: any) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target.scrollingElement
      if (!fetching && scrollTop + clientHeight >= scrollHeight) {
        fetching = true
        if (hasNextPage) {
          console.log('fetching')
          await fetchNextPage()
        }
        fetching = false
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [fetchNextPage, hasNextPage])

  return (
    <>
      <div
        className={`${
          isError ? 'flex h-[100vh] items-center justify-center ' : 'grid'
        } h-full w-full grid-cols-1 flex-wrap md:mt-4 md:grid-cols-2 md:gap-5 md:px-3 lg:mt-0 lg:grid-cols-3 lg:px-16 lg:pt-6`}
      >
        {isLoadingVideoList &&
          filter === '1' &&
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

        {isSuccessVideoList &&
          filter === '1' &&
          VideoList.pages.map((pages) => pages.data.data?.map((item, index) => <VideoItem key={index} data={item} />))}

        {isLoading &&
          filter !== '1' &&
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

        {isSuccess &&
          filter !== '1' &&
          getVideo.data.data.videos?.length > 0 &&
          getVideo.data.data.videos?.map((item, index) => <VideoItem key={index} data={item} />)}

        {isSuccess && filter !== '1' && getVideo.data.data.videos?.length === 0 && (
          <>
            <div className='flex items-center justify-center'>
              <span className='text-base font-semibold text-black dark:text-white md:text-lg'>
                Không tìm thấy video
              </span>
            </div>
          </>
        )}
      </div>
      {isFetchingNextPage && filter === '1' && (
        <div className='flex w-full items-center justify-center gap-x-2'>
          <AiOutlineLoading className='h-10 w-10 animate-spin text-center text-gray-500 ' />{' '}
        </div>
      )}
    </>
  )
}

export default VideoList
