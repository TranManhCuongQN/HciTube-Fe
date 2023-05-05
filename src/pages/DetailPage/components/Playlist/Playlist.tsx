import {GrClose} from 'react-icons/gr'
import {HiChevronDown, HiChevronUp} from 'react-icons/hi'
import {useState} from 'react'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import VideoItem from './VideoItem'

const Playlist = () => {
  const [isOpening, setIsOpening] = useState<boolean>(true);
  const {
    data: VideoList,
    isSuccess,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: 'videoList',
    queryFn: videoApi.getVideoAll
  })

  return (
    <div className="w-full md:border md:border-[rgba(0,0,0,0.1)] md:dark:border-gray-600 md:rounded-2xl md:overflow-hidden lg:mt-[-0.5rem] ">
      <div className="flex justify-between items-center pt-3 pr-[0.375rem] pl-4 pb-2 bg-white dark:bg-[#212121] md:rounded-t-2xl">
        <div>
          <h1 className="font-bold text-xl  text-black dark:text-[#f1f1f1]">Danh sách nhạc kết hợp của tôi</h1>
          <span className="font-medium text-xs text-[#606060] dark:text-[#aaa] mt-1">HciTube</span>
        </div>

        <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f1f1f1] dark:hover:bg-[#272727]">
          <button className="hidden lg:flex text-xl ">
            <GrClose className="text-gray-600 dark:text-gray-200"/>
          </button>
          <button className="lg:hidden text-2xl text-gray-600 dark:text-gray-200">
            <HiChevronUp className={`${isOpening ? 'block' : 'hidden'}`} onClick={() => setIsOpening(false)}/>
            <HiChevronDown className={`${isOpening ? 'hidden' : 'block'}`} onClick={() => setIsOpening(true)}/>
          </button>
        </div>
      </div>
      <div className={`${isOpening ? 'flex' : 'hidden' } flex-col w-full h-full overflow-scroll`} >
        {isSuccess && VideoList.data.data?.map((item, index) => <VideoItem key={index} data={item} />)}
      </div>

    </div>
  )
}

export default Playlist;