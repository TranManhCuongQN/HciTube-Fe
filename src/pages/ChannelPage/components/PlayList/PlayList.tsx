import React from 'react'
import { MdOutlinePlaylistPlay } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import playListAPI from 'src/api/playlist.api'
import { Video } from 'src/types/video.type'
import Skeleton from 'src/components/Skeleton'

const PlayList = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]

  const {
    data: dataPlayList,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['channelPlayList', id],
    queryFn: () => playListAPI.getPlayListById(id)
  })

  console.log(dataPlayList)
  return (
    <>
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
      {isSuccess && dataPlayList.data.data.length > 0 && (
        <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 max-lg:grid-cols-2 md:px-20 lg:grid-cols-3 lg:px-40'>
          {dataPlayList?.data.data.map((item) => {
            if ((item.videos as Video[]).length === 0) return null
            return (
              <div className='flex cursor-pointer flex-col gap-y-2' key={item.id}>
                <div className='relative h-fit w-full flex-shrink-0 rounded-lg'>
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

                <div className='pr-3 md:pr-6'>
                  <span className='mb-1 text-sm font-bold text-black line-clamp-2 dark:text-white'>{item.title}</span>
                  <span className='cursor-pointer text-xs font-bold text-gray-500 line-clamp-2 hover:text-black dark:text-white'>
                    Xem toàn bộ danh sách
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default PlayList
