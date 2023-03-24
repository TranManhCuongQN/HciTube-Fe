import React from 'react'
import { BsBell } from 'react-icons/bs'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { RxDividerVertical } from 'react-icons/rx'
import { TbShare3 } from 'react-icons/tb'
import { RiMenuAddFill } from 'react-icons/ri'

const WatchingVideo = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <div className='flex flex-col bg-white dark:bg-[#0f0f0f]'>
      <video
        src='https://res.cloudinary.com/dnmazjnlr/video/upload/v1679565900/samples/Video/y2mate.com_-_Playlistth%E1%BB%8F_7_m%C3%A0u_nh%E1%BA%A1c_relax_gi%C3%B3_c%C3%B4_g%C3%A1i_n%C3%A0y_c%E1%BB%A7a_ai_y%C3%AAu_anh_%C4%91i_m%E1%BA%B9_anh_b%C3%A1n_b%C3%A1nh_l%C3%A0_anh_tan_720pFHR_rrwkta.mp4'
        className='mb-2 h-52 w-full md:h-80 lg:h-[400px]'
        ref={videoRef}
        muted
        controls
      />
      <span className='text-xs font-bold leading-4 text-black line-clamp-2 dark:text-white md:text-base'>
        Ờ Thì Là Mình Thì Vẫn Cứ Lướt... Kìa Bóng Dáng Ai - Nhạc Chill TikTok - Nhạc Lofi Hot TikTok 2023
      </span>
      <div className='mt-2 flex w-full flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-x-3'>
          <div className='flex items-center'>
            <img
              src='https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg'
              alt='avatar'
              className='h-8 w-8 rounded-full object-cover md:h-10 md:w-10'
            />
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-black line-clamp-1 dark:text-white md:text-sm'>
              Duy Luân Dễ Thương
            </span>
            <span className='text-xs font-medium text-[#666d74] dark:text-gray-400 '>252N người đăng ký</span>
          </div>

          {/* //* Sign in channel */}
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] max-md:hidden md:px-3'>
            <BsBell className='text-black dark:text-white' />
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Đã đăng ký</span>
          </button>
        </div>

        <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:hidden'>
          <BsBell className='text-black dark:text-white' />
          <span className='text-xs font-semibold text-black dark:text-white'>Đã đăng ký</span>
        </button>

        {/* //* Group */}
        <div className='flex items-center justify-between gap-x-5 max-md:hidden'>
          <div className='flex items-center rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'>
            <button className='flex items-center gap-x-2 '>
              <AiOutlineLike className='text-black dark:text-white xl:h-5 xl:w-5' />
              <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>22</span>
            </button>
            <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400 md:h-5 md:w-5' />
            <button className='flex items-center gap-x-2 '>
              <AiOutlineDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
              <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>22</span>
            </button>
          </div>
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3 '>
            <TbShare3 className='text-black dark:text-white xl:h-5 xl:w-5' />
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Chia sẻ</span>
          </button>
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'>
            <RiMenuAddFill className='text-black dark:text-white md:h-5 md:w-5 ' />
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Lưu</span>
          </button>
        </div>
      </div>

      {/* //* Group */}
      <div className='mt-3 flex items-center justify-between gap-x-5 md:hidden'>
        <div className='flex items-center rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
          <button className='flex items-center gap-x-2 '>
            <AiOutlineLike className='text-black dark:text-white' />
            <span className='text-xs  font-semibold text-black dark:text-white'>22</span>
          </button>
          <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400' />
          <button className='flex items-center gap-x-2 '>
            <AiOutlineDislike className='text-black dark:text-white' />
            <span className='text-xs  font-semibold text-black dark:text-white'>22</span>
          </button>
        </div>
        <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
          <TbShare3 className='text-black dark:text-white' />
          <span className='text-xs font-semibold text-black dark:text-white'>Chia sẻ</span>
        </button>
        <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
          <RiMenuAddFill className='text-black dark:text-white' />
          <span className='text-xs font-semibold text-black dark:text-white'>Lưu</span>
        </button>
      </div>

      {/* //* Description */}
      <div className='my-3 flex flex-col rounded-xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
        <div className='flex items-center gap-x-2'>
          <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>823 lượt xem</span>
          <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>4 giờ trước</span>
        </div>
        <div className='mt-2 flex flex-wrap items-end'>
          <span className={`text-xs text-black  dark:text-white ${isOpen ? '' : 'line-clamp-3'} md:text-sm`}>
            {' '}
            Xiaomi Robot Vacuum S10 là con tầm trung gần gần giá rẻ của Xiaomi, con này là bản nâng cấp của con Xiaomi
            Mop Pro trước đây. Lực hút mạnh hơn, pin lâu hơn. Nhu cầu cơ bản thì con này đáp ứng được. Xem thêm ở đây
            https://www.xiaomipromotion.vn/xiaomi... Mấy món đồ mình đang dùng có thể mua tại
            https://duyluandethuong.koc.asia/. Anh em mua ủng hộ cho mình có tiền mua Porsche Taycan về review cho anh
            em xem nha :)) Anh em có thể theo dõi mình tại: - Facebook: https://www.facebook.com/duyluandethuong -
            TikTok: https://www.tiktok.com/@duyluandethuong Tham gia group Cùng chơi Công nghệ để hỏi đáp, chia sẻ kinh
            nghiệm về công nghệ, smarthome, điện gia dụng: - Facebook: https://www.facebook.com/groups/cungc...
          </span>
          {isOpen ? (
            <button
              className='mt-2 flex-shrink-0 text-xs font-semibold text-black dark:text-white md:text-sm'
              onClick={() => setIsOpen(false)}
            >
              Ẩn bớt
            </button>
          ) : (
            <button
              className='dark:text- mt-2 flex-shrink-0 text-xs font-semibold text-black dark:text-white md:text-sm'
              onClick={() => setIsOpen(true)}
            >
              Hiện thêm
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default WatchingVideo
