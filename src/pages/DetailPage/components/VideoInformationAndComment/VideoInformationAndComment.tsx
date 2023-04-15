import React from 'react'
import { BsBell } from 'react-icons/bs'
import { BiLike, BiDislike } from 'react-icons/bi'
import { RxDividerVertical } from 'react-icons/rx'
import { TbShare3 } from 'react-icons/tb'
import { RiMenuAddFill } from 'react-icons/ri'
import Comment from '../Comment'
import { useTranslation } from 'react-i18next'
import Video from 'src/components/Video'

const VideoInformationAndComment = () => {
  const { t } = useTranslation(['detail'])
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)


  return (
    <>
      <div className='flex flex-col bg-white dark:bg-[#0f0f0f]'>

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
              <span className='text-xs font-medium text-[#666d74] dark:text-gray-400 '>
                252N {t('detail:detail.subscribed')}
              </span>
            </div>

            {/* //* Sign in channel */}
            <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] max-md:hidden md:px-3'>
              <BsBell className='text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                {t('detail:detail.subscribed')}
              </span>
            </button>
          </div>

          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:hidden'>
            <BsBell className='text-black dark:text-white' />
            <span className='text-xs font-semibold text-black dark:text-white'>{t('detail:detail.subscribed')}</span>
          </button>

          {/* //* Group */}
          <div className='flex items-center justify-between gap-x-5 max-md:hidden'>
            <div className='flex items-center rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'>
              <button className='flex items-center gap-x-2 '>
                <BiLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>22</span>
              </button>
              <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400 md:h-5 md:w-5' />
              <button className='flex items-center gap-x-2 '>
                <BiDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>22</span>
              </button>
            </div>
            <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3 '>
              <TbShare3 className='text-black dark:text-white xl:h-5 xl:w-5' />
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                {t('detail:detail.share')}
              </span>
            </button>
            <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'>
              <RiMenuAddFill className='text-black dark:text-white md:h-5 md:w-5 ' />
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                {t('detail:detail.save')}
              </span>
            </button>
          </div>
        </div>

        {/* //* Group */}
        <div className='mt-3 flex items-center justify-between gap-x-5 md:hidden'>
          <div className='flex items-center rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
            <button className='flex items-center gap-x-2 '>
              <BiLike className='text-black dark:text-white' />
              <span className='text-xs  font-semibold text-black dark:text-white'>22</span>
            </button>
            <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400' />
            <button className='flex items-center gap-x-2 '>
              <BiDislike className='text-black dark:text-white' />
              <span className='text-xs  font-semibold text-black dark:text-white'>22</span>
            </button>
          </div>
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
            <TbShare3 className='text-black dark:text-white' />
            <span className='text-xs font-semibold text-black dark:text-white'>{t('detail:detail.share')}</span>
          </button>
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
            <RiMenuAddFill className='text-black dark:text-white' />
            <span className='text-xs font-semibold text-black dark:text-white'>{t('detail:detail.save')}</span>
          </button>
        </div>

        {/* //* Description */}
        <div className='my-3 flex flex-col rounded-xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
          <div className='flex items-center gap-x-2'>
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
              823 {t('detail:detail.views')}
            </span>
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
              4 {t('detail:detail.hours_ago')}
            </span>
          </div>
          <div className='mt-2 flex flex-wrap items-end'>
            <span className={`text-xs text-black  dark:text-white ${isOpen ? '' : 'line-clamp-3'} md:text-sm`}>
              {' '}
              Xiaomi Robot Vacuum S10 là con tầm trung gần gần giá rẻ của Xiaomi, con này là bản nâng cấp của con Xiaomi
              Mop Pro trước đây. Lực hút mạnh hơn, pin lâu hơn. Nhu cầu cơ bản thì con này đáp ứng được. Xem thêm ở đây
              https://www.xiaomipromotion.vn/xiaomi... Mấy món đồ mình đang dùng có thể mua tại
              https://duyluandethuong.koc.asia/. Anh em mua ủng hộ cho mình có tiền mua Porsche Taycan về review cho anh
              em xem nha :)) Anh em có thể theo dõi mình tại: - Facebook: https://www.facebook.com/duyluandethuong -
              TikTok: https://www.tiktok.com/@duyluandethuong Tham gia group Cùng chơi Công nghệ để hỏi đáp, chia sẻ
              kinh nghiệm về công nghệ, smarthome, điện gia dụng: - Facebook: https://www.facebook.com/groups/cungc...
            </span>
            {isOpen ? (
              <button
                className='mt-2 flex-shrink-0 text-xs font-semibold text-black dark:text-white md:text-sm'
                onClick={() => setIsOpen(false)}
              >
                {t('detail:detail.show_less')}
              </button>
            ) : (
              <button
                className='dark:text- mt-2 flex-shrink-0 text-xs font-semibold text-black dark:text-white md:text-sm'
                onClick={() => setIsOpen(true)}
              >
                {t('detail:detail.show_more')}
              </button>
            )}
          </div>
        </div>
        <Comment />
      </div>
    </>
  )
}

export default VideoInformationAndComment
