import React from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import playListAPI from 'src/api/playlist.api'
import parse from 'html-react-parser'
import { getFormattedDate } from 'src/utils/utils'
import Skeleton from 'src/components/Skeleton'

const About = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]
  const {
    data: profileData,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ['channelProfile', id],
    queryFn: () => playListAPI.getChannelById(id)
  })

  return (
    <>
      {isLoading && (
        <div className='my-5 flex w-full items-start justify-between gap-y-5 px-5 max-lg:flex-col md:px-20 lg:px-40'>
          <div className='flex w-full flex-shrink-0 flex-col gap-y-5 lg:w-1/2'>
            <Skeleton className='h-5 w-1/3 rounded' />
            <Skeleton className='h-5 w-full rounded' />
            <Skeleton className='h-5 w-full rounded' />
            <Skeleton className='h-5 w-full rounded' />
          </div>
          <div className='flex w-full flex-col gap-y-5 lg:w-1/3'>
            <Skeleton className='h-5 w-1/3 rounded' />
            <Skeleton className='h-5 w-full rounded' />
            <Skeleton className='h-5 w-full rounded' />
            <Skeleton className='h-5 w-full rounded' />
          </div>
        </div>
      )}
      {isSuccess && (
        <div className='my-5 flex w-full items-start justify-between gap-y-5 px-5 max-lg:flex-col md:px-20 lg:px-40'>
          <div className='flex w-full flex-shrink-0 flex-col gap-y-5 lg:w-1/2'>
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Mô tả</span>
            <div
              className='break-words text-xs text-black dark:text-white md:text-sm'
              dangerouslySetInnerHTML={{
                __html: String(parse((profileData?.data?.data?.user?.description as string) || ''))
              }}
            ></div>
          </div>
          <div className='flex w-full flex-col gap-y-5 lg:w-1/3'>
            <span className='border-b border-b-gray-500 py-2 text-xs font-semibold text-black dark:text-white md:text-sm'>
              Thống kê
            </span>
            <span className='border-b border-b-gray-500 py-2 text-xs text-black dark:text-white md:text-sm'>
              Đã tham gia {getFormattedDate(profileData?.data?.data?.user?.createdAt as string)}
            </span>
            <span className='border-b border-b-gray-500 py-2 text-xs  text-black dark:text-white md:text-sm'>
              13.614.734 lượt xem
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default About
