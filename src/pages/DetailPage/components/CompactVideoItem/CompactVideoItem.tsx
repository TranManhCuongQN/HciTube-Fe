import { RxDividerHorizontal } from 'react-icons/rx'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import videoApi from 'src/api/video.api'
import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'

const CompactVideoItem = () => {
  const { data } = useQuery({
    queryKey: 'videoList',
    queryFn: () => videoApi.getVideoAll()
  })
  return (
    <>
      <div className='mt-2 flex flex-shrink-0 flex-col gap-y-4 bg-white dark:bg-[#0f0f0f] lg:w-[370px] xl:w-[410px]'>
        {(data?.data.data.length as number) > 0 &&
          data?.data.data.map((item) => (
            <NavLink to={`/detail/${item._id}`} className='flex items-center gap-x-2' key={item._id}>
              <img
                src={item?.thumbnail}
                alt='thumbnail'
                className='h-16 w-28 flex-shrink-0 rounded-lg object-cover md:h-20 md:w-32'
              />
              <div className='flex h-16 flex-col flex-wrap justify-evenly  text-black dark:text-white md:h-20'>
                <span className=' text-xs font-semibold line-clamp-2 md:text-sm  '>{item?.title}</span>
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
    </>
  )
}

export default CompactVideoItem
