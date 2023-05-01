import React from 'react'
import { RxDividerHorizontal } from 'react-icons/rx'
import { convertNumberToDisplayString } from 'src/utils/utils'
import { MdOutlinePlaylistPlay } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import playListAPI from 'src/api/playlist.api'
import { Video } from 'src/types/video.type'
import Skeleton from 'src/components/Skeleton'
import path from 'src/constants/path'
// const dataVideo = [
//   {
//     id: 1,
//     title: 'Nhạc Chill Nhẹ Nhàng 2023 - Nhạc Lofi Chill Tiktok 2023 - Lofi Chill Gây Nghiện Hot Nhất Tiktok',
//     thumbnail: 'https://i.pinimg.com/564x/12/90/49/1290499359539f3c363e0b9d36ca5a4a.jpg',
//     total: 4
//   },
//   {
//     id: 2,
//     title: 'Tiktok Hits 💔😥 Tiktok Viral Songs 2023 💦 Sad Love Songs Playlist 2023',
//     thumbnail: 'https://i.pinimg.com/736x/56/df/2e/56df2ea4233c5d4a982ea444d677b019.jpg',
//     total: 2
//   },
//   {
//     id: 3,
//     title: 'Easy On Me ~ Sad Song About Love ♫ Acoustic Love Songs (Video with lyric)',
//     thumbnail: 'https://i.pinimg.com/736x/ab/55/27/ab5527747704a33bd29349230d4d7f1d.jpg',
//     total: 10
//   },
//   {
//     id: 4,
//     title: '| Chill Mood - Best Pop Songs ChillMix 2023',
//     thumbnail: 'https://i.pinimg.com/736x/11/9e/e3/119ee39ab47843cfdc14f5b0a037189a.jpg',
//     total: 16
//   },
//   {
//     id: 5,
//     title: 'Playlist RELAX tâm hồn, CHILL hết nấc trong Biển của hy vọng',
//     thumbnail: 'https://i.pinimg.com/736x/2e/8a/5c/2e8a5c06a65bae2684c31d0edc392ce2.jpg',
//     total: 20
//   },
//   {
//     id: 6,
//     title: '[Playlist] Enjoy The NOW! ~ One hour music for chill and enjoying every moments',
//     thumbnail: 'https://i.pinimg.com/736x/37/0d/1d/370d1dc665dc392cde482d482f56b671.jpg',
//     total: 1
//   },
//   {
//     id: 7,
//     title: 'Nhạc Chill Tiếng Anh - Lofi Acoustic Tiếng Anh Chill Hay Nhất - Nhạc Lofi Chill Tik Tok Nhẹ Nhàng',
//     thumbnail: 'https://i.pinimg.com/736x/4f/d5/b8/4fd5b85d831de606f41e900337f2b451.jpg',
//     total: 50
//   },
//   {
//     id: 8,
//     title: '⁎ Playlist - Soft KDrama OST ~ Study, Sleep, Relax ~ ⁎',
//     thumbnail: 'https://i.pinimg.com/564x/5b/6e/aa/5b6eaae23edb1c248b3728422eb3fd98.jpg',
//     total: 20
//   },
//   {
//     id: 9,
//     title: 'A playlist that makes you feel positive when you listen to it 🍀 Chill Vibes Music ~ The Daily Vibe',
//     thumbnail: 'https://i.pinimg.com/736x/09/44/76/094476bbece1ca4fc56086f92a033099.jpg',
//     total: 15
//   },
//   {
//     id: 10,
//     title: 'Van Life - Calm acoustic pop | Best of Cody Francis playlist | 1 Hour',
//     thumbnail: 'https://i.pinimg.com/736x/4b/b8/47/4bb847fe76112b3e714c7cf9b14fcb4b.jpg',
//     total: 100
//   }
// ]

const PlayList = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[1]

  const {
    data: dataPlayList,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['channelPlayList', id],
    queryFn: () => playListAPI.getPlayListById(id)
  })

  console.log(dataPlayList)
  return (
    <>
      {isLoading && (
        <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 max-lg:grid-cols-2 max-[320px]:grid-cols-1 md:px-20 lg:grid-cols-3 lg:px-40'>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div className='flex flex-col gap-y-3' key={index}>
                <Skeleton className='h-[130px] w-[220px] rounded-lg max-md:w-[170px]' />
                <Skeleton className='h-5 w-56 rounded-md max-md:w-40' />
                <Skeleton className='h-5 w-32 rounded-md max-md:w-20' />
              </div>
            ))}
        </div>
      )}
      {isSuccess && dataPlayList.data.data.length > 0 && (
        <div className='mt-6 grid max-w-full gap-x-5 gap-y-10 max-lg:grid-cols-2 md:px-20 lg:grid-cols-3 lg:px-40'>
          {dataPlayList?.data.data.map((item) => {
            if ((item.videos as Video[]).length === 0) return null
            return (
              <div className='flex cursor-pointer flex-col gap-y-2' key={item.id}>
                <div className='relative h-fit w-full flex-shrink-0 rounded-lg'>
                  <img
                    src={(item?.videos as Video[])[0]?.thumbnail}
                    alt='avatar'
                    className='aspect-video w-full rounded-lg object-cover'
                  />
                  <div className='absolute bottom-0 right-0 top-0 flex h-full w-2/5 flex-col items-center justify-center gap-y-2 rounded bg-[#1a1315c0] shadow'>
                    <span className='text-base font-medium text-white'>{item.videos?.length}</span>
                    <MdOutlinePlaylistPlay className='h-8 w-8 text-center text-white' />
                  </div>
                </div>

                <div className='pr-3 md:pr-6'>
                  <span className='mb-1 text-sm font-bold text-black line-clamp-2 dark:text-white'>{item.title}</span>
                  <span className='cursor-pointer text-xs font-bold text-gray-500 line-clamp-2 hover:text-black dark:text-white'>
                    Xem toàn bộ danh sách
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default PlayList
