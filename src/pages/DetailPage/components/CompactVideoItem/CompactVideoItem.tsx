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
      <div className='mt-2 max-md:mx-[-12px] flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
        {(data?.data.data.length as number) > 0 &&
          data?.data.data.map((item) => (
            <NavLink to={`/detail/${item._id}`} className='flex flex-col lg:flex-row lg:items-center gap-x-2' key={item._id}>
              <img
                src={item?.thumbnail}
                alt='thumbnail'
                className='flex-shrink-0 lg:rounded-lg object-cover aspect-video w-full lg:w-40 h-full'
              />

              <div className='flex m-3 lg:hidden text-black dark:text-white '>
                <img src={item?.channel?.avatar} alt="" className="rounded-full aspect-square w-10 h-10 object-cover mt-2"/>

                <div className='flex lg:hidden ml-3 mt-2 flex-col flex-wrap text-black dark:text-white '>
                  <span className=' text-sm font-semibold line-clamp-2 mb-1'>{item?.title}</span>
                  <div className="flex gap-x-1 items-center">
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

              <div className='hidden max-sm:px-3 lg:flex h-16 flex-col flex-wrap justify-evenly  text-black dark:text-white md:h-20'>
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
