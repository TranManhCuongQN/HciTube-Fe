import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import VideoItem from '../VideoItem/VideoItem'

const InforVideo = [
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 127,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 60,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 10,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85


  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85


  },
  {
    thumbnail: 'https://i1.sndcdn.com/artworks-000659126155-b868u3-t500x500.jpg',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: 'Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  }
]

const VideoList = () => {
  return (
    <div
      className={`md:mt-4 md:px-3 lg:mt-0 lg:pt-6 lg:px-16 grid grid-cols-1 flex-wrap overflow-y-auto md:grid-cols-2 md:gap-5 lg:grid-cols-3`}
    >
      {InforVideo.map((item, index) => (
        <VideoItem key={index} data={item} />
      ))}
    </div>
  )
}

export default VideoList
