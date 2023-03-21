interface VideoItemProps {
  data: {
    thumbnail: string
    avatar: string
    title: string
    user: string
    view: number
    dataSubmitted: number
  }
}
const VideoItem = (props: VideoItemProps) => {
  const { data } = props
  return (
    <div className='mb-5 flex cursor-pointer flex-col gap-y-2'>
      <img src={data.thumbnail} alt='thumbnail' className='h-[12rem] w-full rounded-xl object-cover' />
      <div className='flex items-start gap-x-2'>
        <div className='h-8 w-8 flex-shrink-0'>
          <img src={data.avatar} alt='avartar' className='h-full w-full rounded-full object-cover' />
        </div>
        <div className='flex flex-col gap-y-1'>
          <span className='text-xs font-semibold line-clamp-2'>{data.title}</span>
          <span className='text-xs text-gray-400'>{data.user}</span>
          <div className='flex items-center gap-x-1'>
            <span className='text-xs text-gray-400'>{data.view} N lượt xem</span>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-2 w-2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
              </svg>
            </span>
            <span className='text-xs text-gray-400'>{data.dataSubmitted} tháng trước</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem
