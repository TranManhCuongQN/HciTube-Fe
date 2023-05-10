import { GrClose } from 'react-icons/gr'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { useState } from 'react'
import VideoItem from './VideoItem'
import { playList } from 'src/types/playList.type'
import { useParams } from 'react-router-dom'

interface PlayListProps {
  data: playList
}
const Playlist = ({ data }: PlayListProps) => {
  const [isOpening, setIsOpening] = useState<boolean>(true)
  const { id } = useParams()

  return (
    <div className='w-full border border-[rgba(0,0,0,0.1)] dark:border-gray-600 md:overflow-hidden md:rounded-2xl lg:mt-[-0.5rem] '>
      <div className='flex items-center justify-between bg-white pt-3 pr-[0.375rem] pl-4 pb-2 dark:bg-[#212121] md:rounded-t-2xl'>
        <div>
          <h1 className='text-xl font-bold  text-black dark:text-[#f1f1f1]'>Danh sách phát {data?.title}</h1>
          <span className='mt-1 text-xs font-medium text-[#2e2323] dark:text-[#aaa]'>HciTube</span>
        </div>

        <div className='flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#f1f1f1] dark:hover:bg-[#272727]'>
          <button className='hidden text-xl lg:flex '>
            <GrClose className='text-gray-600 dark:text-gray-200' />
          </button>
          <button className='text-2xl text-gray-600 dark:text-gray-200 lg:hidden'>
            <HiChevronUp className={`${isOpening ? 'block' : 'hidden'}`} onClick={() => setIsOpening(false)} />
            <HiChevronDown className={`${isOpening ? 'hidden' : 'block'}`} onClick={() => setIsOpening(true)} />
          </button>
        </div>
      </div>
      <div className={`${isOpening ? 'flex' : 'hidden'} h-full w-full flex-col overflow-scroll lg:pb-12  `}>
        {data?.videos
          ?.filter((item) => item._id !== id)
          ?.map((item, index) => (
            <VideoItem key={index} data={item} />
          ))}
      </div>
    </div>
  )
}

export default Playlist
