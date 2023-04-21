import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import VideoItem from '../VideoItem/VideoItem'

const InforVideo = [
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 127
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 60

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 10
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 100000,
    dataSubmitted: 1,
    lastPlayedTime: 0
  }
]

const VideoList = () => {
  return (
    <div
      className={`mt-3 mb-3 grid grid-cols-1 flex-wrap overflow-y-auto pr-2 pl-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3`}
    >
      {InforVideo.map((item, index) => (
        <VideoItem key={index} data={item} />
      ))}
    </div>
  )
}

export default VideoList
