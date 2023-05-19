import { omit } from 'lodash'
import { useContext } from 'react'
import { BiPlay } from 'react-icons/bi'
import { RxShuffle } from 'react-icons/rx'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import useQueryConfig from 'src/hook/useQueryConfig'
import { favorite } from 'src/types/favorite.type'

interface ControlSectionProps {
  data: favorite[]
}
const ControlSection = ({ data }: ControlSectionProps) => {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { profile } = useContext(AppContext)
  const { category } = queryConfig

  const randomPlay = () => {
    const randomIndex = Math.floor(Math.random() * data.length)
    navigate({
      pathname: `/detail/${data[randomIndex].video._id}`,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            favorite: profile?._id as string,
            category: category || ('1' as string)
          },
          ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList']
        )
      ).toString()
    })
  }

  const handlePlayAll = () => {
    navigate({
      pathname: `/detail/${data[0].video._id}`,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            favorite: profile?._id as string,
            category: category || ('1' as string)
          },
          ['keyword', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList']
        )
      ).toString()
    })
  }
  return (
    <div className='relative flex w-full flex-col overflow-hidden bg-transparent lg:w-fit lg:rounded-lg max-h-[40rem]'>
      <div className='z-20 flex w-full flex-col justify-center p-3 md:flex-row md:items-center lg:flex-col lg:items-start lg:p-6'>
        
        <img
          className='mb-4 aspect-video object-cover h-fit w-full rounded-lg md:max-w-[336px] lg:w-[312px]'
          src={data[0]?.video?.thumbnail as string}
          alt=''
        />
        <div className='mb-4 flex  flex-col md:ml-6 md:flex-1 lg:ml-0 '>
          <h1 className='mb-4 text-3xl font-extrabold text-white'>Video đã thích</h1>
          <p className='mb-1 text-sm font-bold text-white'>{data[0]?.video?.channel?.fullName as string}</p>
          <span className='text-xs font-bold text-[#ffffffb3] '>{`${data.length as number} video`}</span>
        </div>
      </div>

      <div className='z-20 flex gap-3 p-2 lg:p-6 mb-4'>
        <button
          className='flex w-full items-center justify-center rounded-full bg-white py-1 text-base font-bold text-black hover:bg-[#E6E6E6]'
          onClick={handlePlayAll}
        >
          <BiPlay className='h-8 w-8' />
          <span>Phát tất cả</span>
        </button>
        <button
          className='flex w-full items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] py-1 text-base font-bold text-white hover:bg-[rgba(255,255,255,0.2)]'
          onClick={randomPlay}
        >
          <RxShuffle className='mr-2 h-6 w-6' />
          <span>Trộn bài</span>
        </button>
      </div>

      <div className='absolute h-full w-full '>
        <img
          className='w-[200%] translate-x-[-25%] opacity-70 blur-[30px] '
          src={data[0]?.video?.thumbnail as string}
          alt=''
        />
      </div>
      <div className='0% 33.000001% 100%) absolute  h-full w-full bg-gradient-to-b from-[rgba(76,89,65,0.800)] via-[rgba(76,89,65,0.298)] to-[rgba(15,15,15,1.000)]'></div>
    </div>
  )
}

export default ControlSection
