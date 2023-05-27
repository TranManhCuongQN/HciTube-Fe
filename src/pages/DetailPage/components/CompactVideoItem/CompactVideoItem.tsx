import { RxDividerHorizontal } from 'react-icons/rx'
import ListFilter from '../ListFilter'
import { Link, NavLink, useParams } from 'react-router-dom'
import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import { useState, useRef } from 'react'
import useQueryConfig from 'src/hook/useQueryConfig'
import Skeleton from 'src/components/Skeleton'
import Playlist from '../Playlist'
import { playList } from 'src/types/playList.type'
import { Video } from 'src/types/video.type'
import PLayLIstFavorite from '../PlayListFavorite'

const categoryAPI = [
  {
    id: '1',
    name: 'Tất cả'
  },
  {
    id: '647149bfc19b73f15042d329',
    name: 'Khoa học và Công nghệ'
  },
  {
    id: '647149e9c19b73f15042d32a',
    name: 'Tin tức và sự kiện'
  },
  {
    id: '64714a3bc19b73f15042d32b',
    name: 'Đời sống'
  },
  {
    id: '64714a51c19b73f15042d32c',
    name: 'Thể thao'
  },
  {
    id: '647149a2c19b73f15042d328',
    name: 'Giải trí'
  },
  {
    id: '6471497ac19b73f15042d327',
    name: 'Âm nhạc'
  }
]

interface CompactVideoItemProps {
  isSuccessLoadVideo: boolean
  isLoadingGetPlayList: boolean
  isSuccessGetPlayList: boolean
  isLoadingGetVideo: boolean
  isSuccessGetVideo: boolean
  isLoadingGetAllVideo: boolean
  dataGetAll: Video[]
  dataGetVideo: Video[]
  isSuccessGetAllVideo: boolean
  dataGetPlayList: playList
  isLoadingGetFavorite: boolean
  isSuccessGetFavorite: boolean
  dataGetFavorite: Video[]
}
const CompactVideoItem = ({
  isSuccessLoadVideo,
  dataGetAll,
  dataGetPlayList,
  dataGetVideo,
  isLoadingGetPlayList,
  isLoadingGetVideo,
  isSuccessGetPlayList,
  isSuccessGetVideo,
  isLoadingGetAllVideo,
  isSuccessGetAllVideo,
  isLoadingGetFavorite,
  isSuccessGetFavorite,
  dataGetFavorite
}: CompactVideoItemProps) => {
  const queryConfig = useQueryConfig()
  const { playList, category, favorite } = queryConfig
  const [filter, setFilter] = useState<string>('1')
  const playListRef = useRef<HTMLDivElement>(null)
  const { id } = useParams()

  if (isSuccessLoadVideo && window.innerWidth >= 1024 && playListRef.current) {
    playListRef.current.style.height = `${document.querySelector('#Video')?.clientHeight}px`
  }

  // Format time
  const formatTime = (duration: number) => {
    if (duration) {
      const result = new Date(duration * 1000).toISOString()?.slice(11, 19)
      const hour = result.slice(0, 2)
      const minute = result.slice(3, 5)
      const second = result.slice(6, 8)
      return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
    }
    return '00:00'
  }

  return (
    <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
      {favorite && isLoadingGetFavorite && (
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
      {playList && isLoadingGetPlayList && (
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

      {(favorite || playList) && (
        <div className='max-lg:mt-2 md:px-3 lg:flex lg:px-0' ref={playListRef}>
          {favorite && isSuccessGetFavorite && (dataGetFavorite.length as number) > 0 && (
            <PLayLIstFavorite data={dataGetFavorite} />
          )}

          {playList && isSuccessGetPlayList && (dataGetPlayList.videos?.length as number) > 0 && (
            <Playlist data={dataGetPlayList as playList} />
          )}
        </div>
      )}

      <ListFilter dataCategories={categoryAPI} filter={filter} setFilter={setFilter} />
      <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
        {isLoadingGetAllVideo && (
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
        {isSuccessGetAllVideo &&
          (dataGetAll.length as number) > 0 &&
          filter === '1' &&
          dataGetAll
            .filter((item) => item._id !== id)
            .map((item) => (
              <Link
                to={`/detail/${item._id}?category=${category || '1'}`}
                className='flex flex-col gap-x-2 lg:flex-row lg:items-start'
                key={item._id}
              >
                <div className='relative aspect-video h-full flex-shrink-0 lg:w-40 lg:rounded-lg'>
                  <img
                    src={item?.thumbnail}
                    alt='thumbnail'
                    className='aspect-video h-full w-full object-cover lg:rounded-lg'
                  />
                  <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200 md:text-lg lg:right-1 lg:bottom-1 lg:text-xs'>
                    {formatTime(Math.round(Number(item?.duration)))}
                  </span>
                </div>

                <div className='m-3 flex text-black dark:text-white lg:hidden '>
                  <img
                    src={item?.channel?.avatar}
                    alt=''
                    className='mt-2 aspect-square h-10 w-10 rounded-full object-cover md:h-16 md:w-16 lg:h-10 lg:w-10'
                  />

                  <div className='ml-3 mt-2 flex flex-col flex-wrap text-black dark:text-white lg:hidden '>
                    <span className=' mb-1 text-sm font-semibold line-clamp-2 md:text-lg lg:text-sm'>
                      {item?.title}
                    </span>
                    <div className='flex items-center gap-x-1 text-xs font-medium text-[#666d74] dark:text-gray-400 md:text-sm lg:text-xs '>
                      <span className=''>{`${item?.channel?.fullName} `}</span>
                      <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                      <span className=''>{convertNumberToDisplayString(item?.view as number)} lượt xem</span>
                    </div>
                  </div>
                </div>

                <div className='hidden h-16 flex-col flex-wrap justify-start text-black dark:text-white  max-sm:px-3 md:h-20 lg:flex'>
                  <span className='mb-1 text-sm font-semibold line-clamp-2 '>{item?.title}</span>
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
              </Link>
            ))}
        {isSuccessGetVideo &&
          filter !== '1' &&
          dataGetVideo.length > 0 &&
          dataGetVideo
            .filter((item) => item._id !== id)
            .map((item) => (
              <NavLink
                to={`/detail/${item._id}?category=${category || '1'}`}
                className='flex flex-col gap-x-2 lg:flex-row lg:items-center'
                key={item._id}
              >
                <div className='relative aspect-video h-full flex-shrink-0 lg:w-40 lg:rounded-lg'>
                  <img
                    src={item?.thumbnail}
                    alt='thumbnail'
                    className='aspect-video h-full w-full flex-shrink-0 object-cover lg:w-40 lg:rounded-lg'
                  />
                  <span className='absolute right-2 bottom-2 rounded-sm bg-[rgba(0,0,0,0.8)] px-1 text-xs font-bold text-slate-200 md:text-lg lg:right-1 lg:bottom-1 lg:text-xs'>
                    {formatTime(Math.round(Number(item?.duration)))}
                  </span>
                </div>

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

        {/* <button className='w-full rounded-2xl border border-gray-600 p-1 text-xs font-semibold text-blue-400 hover:bg-blue-50 hover:text-blue-600 md:text-sm lg:hidden'>
          Hiện thêm
        </button> */}
      </div>
    </div>
  )
}

export default CompactVideoItem
