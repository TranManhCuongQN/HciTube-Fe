/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react'
import { convertDuration, convertNumberToDisplayString } from 'src/utils/utils'
import { RxDividerHorizontal } from 'react-icons/rx'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'

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
    duration: '16102001'
  },
  {
    id: 10,
    title: 'Van Life - Calm acoustic pop | Best of Cody Francis playlist | 1 Hour',
    thumbnail: 'https://i.pinimg.com/736x/4b/b8/47/4bb847fe76112b3e714c7cf9b14fcb4b.jpg',
    duration: '16'
  }
]
const Home = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [isBeginning, setIsBeginning] = useState<boolean>(true)
  const [isEnd, setIsEnd] = useState<boolean>(false)

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const handleSwiper = (swiper: any) => {
    setIsBeginning(swiper.activeIndex === 0)
    if (innerWidth < 768) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 2)
    }
    if (innerWidth >= 768 && innerWidth < 920) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 3)
    }
    if (innerWidth >= 920 && innerWidth < 1280) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 4)
    }
    if (innerWidth >= 1280) {
      setIsEnd(swiper.activeIndex === swiper.slides.length - 5)
    }
  }
  return (
    <div className='my-5 flex flex-col'>
      {/* //* Introduction */}
      <div className='flex w-full flex-col gap-y-5 lg:mx-auto lg:max-w-[1150px] lg:flex-row'>
        <div className='w-full flex-shrink-0 rounded-lg max-md:h-48 max-sm:h-52 max-[320px]:h-44 md:w-2/3 md:px-5 lg:h-64 lg:w-[500px] '>
          <video
            src='https://res.cloudinary.com/dnmazjnlr/video/upload/v1679565900/samples/Video/y2mate.com_-_Playlistth%E1%BB%8F_7_m%C3%A0u_nh%E1%BA%A1c_relax_gi%C3%B3_c%C3%B4_g%C3%A1i_n%C3%A0y_c%E1%BB%A7a_ai_y%C3%AAu_anh_%C4%91i_m%E1%BA%B9_anh_b%C3%A1n_b%C3%A1nh_l%C3%A0_anh_tan_720pFHR_rrwkta.mp4'
            className='aspect-video h-full w-full rounded-lg object-cover'
            controls
          />
        </div>
        <div className='flex flex-col items-start justify-center gap-y-1 md:w-2/3 md:px-5 lg:gap-y-5'>
          <span className='text-sm font-bold text-black line-clamp-1 dark:text-white md:text-base'>
            Người Yêu Ơi Anh Đi Nhé...Bình Yên Bên Ai Em Nhé Lofi - Anh Đi Nhé Lofi | Nhạc Lofi Hot Tiktok 2023
          </span>

          <div className='flex flex-wrap items-center gap-x-1'>
            <span className='text-xs  text-[#666d74] dark:text-gray-400 md:text-sm'>
              {convertNumberToDisplayString(10000)} lượt xem
            </span>
            <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
            <span className='text-xs  text-[#666d74] dark:text-gray-400 md:text-sm'>3 tháng trước</span>
          </div>

          <span className='break-words text-xs  text-black dark:text-white max-lg:hidden md:text-sm '>
            ♬ Playlist : Lofi - Chill: Nụ Cười Em Là Nắng, Chạy Về Khóc Với Anh,... ♪ Design by Tuyen Orinn ♪ Background
            - Sưu Tầm Mọi người ủng hộ mình sớm đạt được 10.000 Subscribers nhé!
          </span>

          <button className='text-xs  font-semibold text-black dark:text-white max-lg:hidden'>ĐỌC THÊM</button>
        </div>
      </div>

      {/* //* VideoList */}
      <div className='my-5 h-[1px] w-full bg-gray-500 md:mx-auto md:w-[750px] lg:mx-auto lg:max-w-[1150px] '></div>
      <div className='mb-3 flex w-full items-center justify-start gap-x-2'>
        <span className='text-sm font-semibold text-black dark:text-white max-lg:px-2 md:text-base lg:px-8'>Video</span>
        <button className='flex items-end gap-x-1 rounded-xl px-3 py-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-sm:py-1 max-sm:px-2'>
          <BsFillPlayFill className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Phát tất cả</span>
        </button>
      </div>
      <div className='relative max-w-full'>
        <button
          className={`absolute top-12 left-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center  rounded-full bg-white text-xs  shadow max-lg:-left-3 lg:h-10 lg:w-10 ${
            isBeginning ? 'invisible' : 'visible'
          } `}
          onClick={goPrev}
        >
          <AiOutlineLeft className='h-5 w-5 text-black lg:h-6 lg:w-6' />
        </button>
        <Swiper
          pagination={false}
          modules={[Pagination]}
          ref={swiperRef}
          className='lg:mx-auto lg:max-w-[1150px]'
          onSlideChange={(swiper) => {
            handleSwiper(swiper)
          }}
          breakpoints={{
            0: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            },
            920: {
              slidesPerView: 4
            },
            1280: {
              slidesPerView: 5
            }
          }}
        >
          {dataVideo.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className='flex w-[220px] cursor-pointer flex-col gap-y-2 max-sm:w-44 max-[320px]:w-36'>
                <div className='relative h-[130px] w-full flex-shrink-0 rounded-lg max-sm:h-28 max-[320px]:h-20'>
                  <img src={item.thumbnail} alt='avatar' className='h-full w-full rounded-lg object-cover' />
                  <div className='absolute bottom-1 right-1 z-40 rounded bg-black p-1 shadow'>
                    <span className='text-xs font-semibold text-white'>{convertDuration(item.duration)}</span>
                  </div>
                </div>
                <span className='text-xs font-bold text-black line-clamp-2 dark:text-white'>{item.title}</span>

                <div className='flex flex-wrap items-center gap-x-1'>
                  <span className='text-xs  text-[#666d74] dark:text-gray-400 '>
                    {convertNumberToDisplayString(10000)} lượt xem
                  </span>
                  <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                  <span className='text-xs  text-[#666d74] dark:text-gray-400 '>3 tháng trước</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`absolute top-12 right-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xs shadow max-sm:-right-2 lg:h-10 lg:w-10 ${
            isEnd ? 'invisible' : 'visible'
          } `}
          onClick={goNext}
        >
          <AiOutlineRight className='h-5 w-5 text-black  lg:h-6 lg:w-6' />
        </button>
      </div>

      {/* //* VideoList */}
      <div className='my-5 h-[1px] w-full bg-gray-500 md:mx-auto md:w-[750px] lg:mx-auto lg:max-w-[1150px] '></div>
      <div className='mb-3 flex w-full items-center justify-start gap-x-2'>
        <span className='text-sm font-semibold text-black dark:text-white max-lg:px-2 md:text-base lg:px-8'>Video</span>
        <button className='flex items-end gap-x-1 rounded-xl px-3 py-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-sm:py-1 max-sm:px-2'>
          <BsFillPlayFill className='h-6 w-6 text-black dark:text-white' />
          <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Phát tất cả</span>
        </button>
      </div>
      <div className='relative max-w-full'>
        <button
          className={`absolute top-12 left-2  z-10 flex h-8 w-8 cursor-pointer items-center justify-center  rounded-full bg-white text-xs  shadow max-lg:-left-3 lg:h-10 lg:w-10 ${
            isBeginning ? 'invisible' : 'visible'
          } `}
          onClick={goPrev}
        >
          <AiOutlineLeft className='h-5 w-5 text-black lg:h-6 lg:w-6' />
        </button>
        <Swiper
          pagination={false}
          modules={[Pagination]}
          ref={swiperRef}
          className='lg:mx-auto lg:max-w-[1150px]'
          onSlideChange={(swiper) => {
            handleSwiper(swiper)
          }}
          breakpoints={{
            0: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            },
            920: {
              slidesPerView: 4
            },
            1280: {
              slidesPerView: 5
            }
          }}
        >
          {dataVideo.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className='flex w-[220px] cursor-pointer flex-col gap-y-2 max-sm:w-44 max-[320px]:w-36'>
                <div className='relative h-[130px] w-full flex-shrink-0 rounded-lg max-sm:h-28 max-[320px]:h-20'>
                  <img src={item.thumbnail} alt='avatar' className='h-full w-full rounded-lg object-cover' />
                  <div className='absolute bottom-1 right-1 z-40 rounded bg-black p-1 shadow'>
                    <span className='text-xs font-semibold text-white'>{convertDuration(item.duration)}</span>
                  </div>
                </div>
                <span className='text-xs font-bold text-black line-clamp-2 dark:text-white'>{item.title}</span>

                <div className='flex flex-wrap items-center gap-x-1'>
                  <span className='text-xs  text-[#666d74] dark:text-gray-400 '>
                    {convertNumberToDisplayString(10000)} lượt xem
                  </span>
                  <RxDividerHorizontal className='h-3 w-3 text-[#666d74] dark:text-gray-400' />
                  <span className='text-xs  text-[#666d74] dark:text-gray-400 '>3 tháng trước</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`absolute top-12 right-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xs shadow max-sm:-right-2 lg:h-10 lg:w-10 ${
            isEnd ? 'invisible' : 'visible'
          } `}
          onClick={goNext}
        >
          <AiOutlineRight className='h-5 w-5 text-black  lg:h-6 lg:w-6' />
        </button>
      </div>
    </div>
  )
}

export default Home
