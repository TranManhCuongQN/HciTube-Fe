import { convertDuration, convertNumberToDisplayString } from 'src/utils/utils'
import { RxDividerHorizontal } from 'react-icons/rx'
const dataVideo = [
  {
    id: 1,
    title: 'Nhạc Chill Nhẹ Nhàng 2023 - Nhạc Lofi Chill Tiktok 2023 - Lofi Chill Gây Nghiện Hot Nhất Tiktok',
    thumbnail: 'https://i.pinimg.com/564x/12/90/49/1290499359539f3c363e0b9d36ca5a4a.jpg',
    duration: '10000'
  },
  {
    id: 2,
    title: 'Tiktok Hits 💔😥 Tiktok Viral Songs 2023 💦 Sad Love Songs Playlist 2023',
    thumbnail: 'https://i.pinimg.com/736x/56/df/2e/56df2ea4233c5d4a982ea444d677b019.jpg',
    duration: '1200'
  },
  {
    id: 3,
    title: 'Easy On Me ~ Sad Song About Love ♫ Acoustic Love Songs (Video with lyric)',
    thumbnail: 'https://i.pinimg.com/736x/ab/55/27/ab5527747704a33bd29349230d4d7f1d.jpg',
    duration: '200'
  },
  {
    id: 4,
    title: '| Chill Mood - Best Pop Songs ChillMix 2023',
    thumbnail: 'https://i.pinimg.com/736x/11/9e/e3/119ee39ab47843cfdc14f5b0a037189a.jpg',
    duration: '120'
  },
  {
    id: 5,
    title: 'Playlist RELAX tâm hồn, CHILL hết nấc trong Biển của hy vọng',
    thumbnail: 'https://i.pinimg.com/736x/2e/8a/5c/2e8a5c06a65bae2684c31d0edc392ce2.jpg',
    duration: '3200'
  },
  {
    id: 6,
    title: '[Playlist] Enjoy The NOW! ~ One hour music for chill and enjoying every moments',
    thumbnail: 'https://i.pinimg.com/736x/37/0d/1d/370d1dc665dc392cde482d482f56b671.jpg',
    duration: '50'
  },
  {
    id: 7,
    title: 'Nhạc Chill Tiếng Anh - Lofi Acoustic Tiếng Anh Chill Hay Nhất - Nhạc Lofi Chill Tik Tok Nhẹ Nhàng',
    thumbnail: 'https://i.pinimg.com/736x/4f/d5/b8/4fd5b85d831de606f41e900337f2b451.jpg',
    duration: '2000'
  },
  {
    id: 8,
    title: '⁎ Playlist - Soft KDrama OST ~ Study, Sleep, Relax ~ ⁎',
    thumbnail: 'https://i.pinimg.com/564x/5b/6e/aa/5b6eaae23edb1c248b3728422eb3fd98.jpg',
    duration: '1610'
  },
  {
    id: 9,
    title: 'A playlist that makes you feel positive when you listen to it 🍀 Chill Vibes Music ~ The Daily Vibe',
    thumbnail: 'https://i.pinimg.com/736x/09/44/76/094476bbece1ca4fc56086f92a033099.jpg',
    duration: '161001'
  },
  {
    id: 10,
    title: 'Van Life - Calm acoustic pop | Best of Cody Francis playlist | 1 Hour',
    thumbnail: 'https://i.pinimg.com/736x/4b/b8/47/4bb847fe76112b3e714c7cf9b14fcb4b.jpg',
    duration: '16'
  }
]
const Video = () => {
  return (
    <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 md:px-20 lg:px-40 max-lg:grid-cols-2 lg:grid-cols-3'>
      {dataVideo.map((item) => (
        <div className='flex cursor-pointer flex-col gap-y-2' key={item.id}>
          <div className='relative w-full flex-shrink-0 rounded-lg'>
            <img src={item.thumbnail} alt='avatar' className='aspect-video w-full rounded-lg object-cover' />
            <div className='absolute bottom-1 right-1 z-40 rounded bg-black p-1 shadow'>
              <span className='text-xs font-semibold text-white'>{convertDuration(item.duration)}</span>
            </div>
          </div>

          <div className="pr-3 md:pr-6">
            <span className='text-sm mb-1 font-bold text-black line-clamp-2 dark:text-white'>{item.title}</span>

            <div className='flex flex-wrap items-center gap-x-1'>
              <span className='text-xs  text-[#666d74] dark:text-gray-400 '>
                {convertNumberToDisplayString(10000)} lượt xem
              </span>
              <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
              <span className='text-xs  text-[#666d74] dark:text-gray-400 '>3 tháng trước</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Video
