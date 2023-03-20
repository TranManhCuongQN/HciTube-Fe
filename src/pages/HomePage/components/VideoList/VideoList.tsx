/* eslint-disable import/no-unresolved */
import classNames from 'classnames'
import { useState } from 'react'
import VideoItem from '../VideoItem/VideoItem'
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper'
const title = [
  {
    id: 1,
    name: 'Tất cả'
  },
  {
    id: 2,
    name: 'Âm nhạc'
  },
  {
    id: 3,
    name: 'Trò chơi'
  },
  {
    id: 4,
    name: 'Trực tiếp'
  },
  {
    id: 5,
    name: 'Bóng đá'
  },
  {
    id: 7,
    name: 'Đã xem '
  }
]

const InforVideo = [
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1
  }
]

const VideoList = () => {
  const [filter, setFilter] = useState<string>('Tất cả')
  return (
    <div className='container mb-20 flex w-full flex-col pl-2 pr-2'>
      <div className='flex h-12 w-full items-center gap-x-2 bg-[#0f0f0f]'>
        <Swiper
          slidesPerView={3}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className='w-full md:hidden'
        >
          {title.map((item, index) => (
            <SwiperSlide key={index}>
              <button
                className={classNames('rounded-lg px-2 py-1  ', {
                  'bg-[#272727]  text-white': filter !== item.name,
                  'bg-[#f1f1f1] text-black': filter === item.name
                })}
                onClick={() => setFilter(item.name)}
              >
                <span className='text-sm'>{item.name}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        {title.map((item, index) => (
          <button
            className={classNames('rounded-lg px-2 py-1 max-md:hidden ', {
              'bg-[#272727]  text-white': filter !== item.name,
              'bg-[#f1f1f1] text-black': filter === item.name
            })}
            key={index}
            onClick={() => setFilter(item.name)}
          >
            <span className='text-sm'>{item.name}</span>
          </button>
        ))}
      </div>
      <div className='mt-3 mb-3 grid grid-cols-1 pr-2 pl-2 md:grid-cols-2 md:gap-5 lg:grid-cols-4'>
        {InforVideo.map((item, index) => (
          <VideoItem key={index} data={item} />
        ))}
      </div>
    </div>
  )
}

export default VideoList
