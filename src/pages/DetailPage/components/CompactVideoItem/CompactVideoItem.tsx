import { RxDividerHorizontal } from 'react-icons/rx'
import ListFilter from '../ListFilter'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import videoApi from 'src/api/video.api'
import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'

const CompactVideoItem = () => {
  const { data } = useQuery({
    queryKey: 'videoList',
    queryFn: () => videoApi.getVideoAll()
  })
  // console.log(data)
  return (
    <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
      <ListFilter />
      <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] max-md:mx-[-12px] lg:w-[370px] xl:w-[410px]'>
        {(data?.data.data.length as number) > 0 &&
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
        <button className='w-full rounded-2xl border border-gray-600 p-1 text-xs font-semibold text-blue-400 hover:bg-blue-50 hover:text-blue-600 md:text-sm lg:hidden'>
          Hiện thêm
        </button>
      </div>
    </div>
  )
}

export default CompactVideoItem
