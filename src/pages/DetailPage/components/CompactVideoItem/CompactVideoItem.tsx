import { RxDividerHorizontal } from 'react-icons/rx'
import ListFilter from '../ListFilter'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import videoApi from 'src/api/video.api'
import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import { useState } from 'react'
import useQueryConfig from 'src/hook/useQueryConfig'
import Skeleton from 'src/components/Skeleton'
import Playlist from '../Playlist'
import playListAPI from 'src/api/playlist.api'
import { playList } from 'src/types/playList.type'

const categoryAPI = [
  {
    id: '1',
    name: 'Tất cả'
  },
  {
    id: '643ce9a448f7c65f714e2690',
    name: 'Khoa học và Công nghệ'
  },
  {
    id: '643ce99b48f7c65f714e268d',
    name: 'Tin tức và sự kiện'
  },
  {
    id: '643ce99248f7c65f714e268a',
    name: 'Đời sống'
  },
  {
    id: '6438f59e0ec1f545856c75e6',
    name: 'Thể thao'
  },
  {
    id: '6438f5a00ec1f545856c75e9',
    name: 'Giải trí'
  },
  {
    id: '6438cb58276e67d1286406ef',
    name: 'Âm nhạc'
  }
]

const CompactVideoItem = () => {
  const queryConfig = useQueryConfig()
  const { playList } = queryConfig
  const {
    data,
    isLoading: isLoadingGetAll,
    isSuccess: isSuccessGetAll
  } = useQuery({
    queryKey: 'videoList',
    queryFn: () => videoApi.getVideoAll()
  })
  const [filter, setFilter] = useState<string>('1')

  const videoHeight = `${document.querySelector('#Video')?.clientHeight}px`

  const {
    data: getVideo,
    isSuccess: isSuccessGetVideo,
    isLoading: isLoadingGetVideo
  } = useQuery({
    queryKey: ['getVideo', queryConfig],
    queryFn: () => videoApi.searchVideo(queryConfig)
  })

  const {
    data: dataPlayList,
    isSuccess: isSuccessPlayList,
    isLoading: isLoadingPlayList
  } = useQuery({
    queryKey: ['playList', playList],
    queryFn: () => playListAPI.getPlayListVideoById(playList as string)
  })

  console.log('dataPlayList:', dataPlayList?.data.data)

  return (
    <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
      {playList && isLoadingPlayList && (
        <div className='w-full md:overflow-hidden md:rounded-2xl md:border md:border-[rgba(0,0,0,0.1)] md:dark:border-gray-600 lg:mt-[-0.5rem] '>
          <div className='flex flex-col gap-y-5 bg-white pt-3 pr-[0.375rem] pl-4 pb-2 dark:bg-[#212121] md:rounded-t-2xl'>
            <div className='flex h-full w-full flex-col gap-y-5'>
              <Skeleton className='h-5 w-full rounded-lg' />
              <Skeleton className='h-5 w-1/2 rounded-lg' />
            </div>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div className='flex h-full w-full flex-col' key={index}>
                  <div className='flex h-full w-full items-start gap-x-3'>
                    <Skeleton className='h-14 w-24 rounded' />
                    <div className='flex h-full w-full flex-col gap-y-3'>
                      <Skeleton className='h-3 w-full rounded' />
                      <Skeleton className='h-3 w-1/2 rounded' />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {playList && isSuccessPlayList && (dataPlayList?.data.data.videos?.length as number) > 0 && (
        <div className='mt-[-0.5rem] lg:flex' style={{ height: videoHeight }}>
          <Playlist data={dataPlayList?.data?.data as playList} />
        </div>
      )}

      <ListFilter dataCategories={categoryAPI} filter={filter} setFilter={setFilter} />
      <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] max-md:mx-[-12px] lg:w-[370px] xl:w-[410px]'>
        {isLoadingGetAll && (
          <>
            {' '}
            {Array(10)
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
          </>
        )}
        {isLoadingGetVideo && (
          <>
            {Array(10)
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
          </>
        )}
        {isSuccessGetAll &&
          (data?.data.data.length as number) > 0 &&
          filter === '1' &&
          data?.data.data.map((item) => (
            <NavLink
              to={`/detail/${item._id}`}
              className='flex flex-col gap-x-2 lg:flex-row lg:items-center'
              key={item._id}
            >
              <img
                src={item?.thumbnail}
                alt='thumbnail'
                className='aspect-video h-full w-full flex-shrink-0 object-cover lg:w-40 lg:rounded-lg'
              />

              <div className='m-3 flex text-black dark:text-white lg:hidden '>
                <img
                  src={item?.channel?.avatar}
                  alt=''
                  className='mt-2 aspect-square h-10 w-10 rounded-full object-cover'
                />

                <div className='ml-3 mt-2 flex flex-col flex-wrap text-black dark:text-white lg:hidden '>
                  <span className=' mb-1 text-sm font-semibold line-clamp-2'>{item?.title}</span>
                  <div className='flex items-center gap-x-1'>
                    <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                      {`${item?.channel?.fullName} `}
                    </span>
                    <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                    <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                      {convertNumberToDisplayString(item?.view as number)} lượt xem
                    </span>
                  </div>
                </div>
              </div>

              <div className='hidden h-16 flex-col flex-wrap justify-evenly text-black dark:text-white  max-sm:px-3 md:h-20 lg:flex'>
                <span className=' text-sm font-semibold line-clamp-2 '>{item?.title}</span>
                <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                  {item?.channel?.fullName}
                </span>
                <div className='flex items-center gap-x-1'>
                  <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                    {' '}
                    {convertNumberToDisplayString(item?.view as number)} lượt xem
                  </span>
                  <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                  <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                    {convertToRelativeTime(item.createdAt as string)}
                  </span>
                </div>
              </div>
            </NavLink>
          ))}
        {isSuccessGetVideo &&
          filter !== '1' &&
          getVideo?.data.data.videos.length > 0 &&
          getVideo.data.data.videos.map((item) => (
            <NavLink
              to={`/detail/${item._id}`}
              className='flex flex-col gap-x-2 lg:flex-row lg:items-center'
              key={item._id}
            >
              <img
                src={item?.thumbnail}
                alt='thumbnail'
                className='aspect-video h-full w-full flex-shrink-0 object-cover lg:w-40 lg:rounded-lg'
              />

              <div className='m-3 flex text-black dark:text-white lg:hidden '>
                <img
                  src={item?.channel?.avatar}
                  alt=''
                  className='mt-2 aspect-square h-10 w-10 rounded-full object-cover'
                />

                <div className='ml-3 mt-2 flex flex-col flex-wrap text-black dark:text-white lg:hidden '>
                  <span className=' mb-1 text-sm font-semibold line-clamp-2'>{item?.title}</span>
                  <div className='flex items-center gap-x-1'>
                    <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                      {`${item?.channel?.fullName} `}
                    </span>
                    <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                    <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                      {convertNumberToDisplayString(item?.view as number)} lượt xem
                    </span>
                  </div>
                </div>
              </div>

              <div className='hidden h-16 flex-col flex-wrap justify-evenly text-black dark:text-white  max-sm:px-3 md:h-20 lg:flex'>
                <span className=' text-sm font-semibold line-clamp-2 '>{item?.title}</span>
                <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                  {item?.channel?.fullName}
                </span>
                <div className='flex items-center gap-x-1'>
                  <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                    {' '}
                    {convertNumberToDisplayString(item?.view as number)} lượt xem
                  </span>
                  <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                  <span className='text-xs font-medium text-[#666d74] dark:text-gray-400  '>
                    {convertToRelativeTime(item.createdAt as string)}
                  </span>
                </div>
              </div>
            </NavLink>
          ))}

        <button className='w-full rounded-2xl border border-gray-600 p-1 text-xs font-semibold text-blue-400 hover:bg-blue-50 hover:text-blue-600 md:text-sm lg:hidden'>
          Hiện thêm
        </button>
      </div>
    </div>
  )
}

export default CompactVideoItem
