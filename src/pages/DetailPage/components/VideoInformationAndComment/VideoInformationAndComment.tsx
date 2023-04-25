import React, { useContext, useEffect, useState } from 'react'
import { BsBell } from 'react-icons/bs'
import { RxDividerVertical } from 'react-icons/rx'
import { TbShare3 } from 'react-icons/tb'
import { RiMenuAddFill } from 'react-icons/ri'
import Comment from '../Comment'
import { VideoItem } from 'src/types/video.type'
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from 'react-icons/ai'
import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import parse from 'html-react-parser'
import { useMutation } from 'react-query'
import videoApi from 'src/api/video.api'
import { AppContext } from 'src/context/app.context'

interface VideoInformationAndCommentProps {
  data: VideoItem
}
const VideoInformationAndComment = ({ data }: VideoInformationAndCommentProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isLike, setIsLike] = useState<boolean>(false)
  const [isDislike, setIsDislike] = useState<boolean>(false)
  const [totalLike, setTotalLike] = useState<number>(data.video.like?.length as number)
  const [totalDisLike, setTotalDislike] = useState<number>(data.video.dislike?.length as number)
  const { profile } = useContext(AppContext)

  useEffect(() => {
    if (data && data.video.like) {
      const checkLikeVideo = data?.video?.like?.findIndex((item) => item === profile?._id) || false
      if (checkLikeVideo !== -1) {
        setIsLike(true)
      } else {
        setIsLike(false)
      }
    }
  }, [data, profile])

  useEffect(() => {
    if (data && data.video.dislike) {
      const checkLikeVideo = data?.video?.dislike?.findIndex((item) => item === profile?._id) || false
      if (checkLikeVideo !== -1) {
        setIsDislike(true)
      } else {
        setIsDislike(false)
      }
    }
  }, [data, profile])

  const likeVideoMutation = useMutation({
    mutationFn: () =>
      videoApi.setAction({
        action: 'like',
        video: data.video._id as string
      }),
    onSuccess: (data) => {
      console.log('res like:', data)
    }
  })

  const dislikeVideoMutation = useMutation({
    mutationFn: () =>
      videoApi.setAction({
        action: 'dislike',
        video: data.video._id as string
      }),
    onSuccess: (data) => {
      console.log('res dislike:', data)
    }
  })

  const handleLikeVideo = () => {
    likeVideoMutation.mutate()
  }

  const handleDislikeVideo = () => {
    dislikeVideoMutation.mutate()
  }

  return (
    <>
      <div className='flex flex-col bg-white dark:bg-[#0f0f0f]'>
        <span className='text-xs font-bold leading-4 text-black line-clamp-2 dark:text-white md:text-base'>
          {data?.video?.title}
        </span>
        <div className='mt-2 flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-x-3'>
            <div className='flex items-center'>
              <img
                src={data?.video?.channel?.avatar}
                alt='avatar'
                className='h-8 w-8 rounded-full object-cover md:h-10 md:w-10'
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-bold text-black line-clamp-1 dark:text-white md:text-sm'>
                {data?.video?.channel?.fullName}
              </span>
              <span className='text-xs font-medium text-[#666d74] dark:text-gray-400 '>0</span>
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
              <button className='flex items-center gap-x-2 ' onClick={handleLikeVideo}>
                {isLike ? (
                  <>
                    <AiFillLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                      {totalLike}
                    </span>{' '}
                  </>
                ) : (
                  <>
                    <AiOutlineLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalLike}</span>
                  </>
                )}
              </button>
              <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400 md:h-5 md:w-5' />
              <button className='flex items-center gap-x-2 ' onClick={handleDislikeVideo}>
                {isDislike ? (
                  <>
                    <AiFillDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDisLike}</span>
                  </>
                ) : (
                  <>
                    <AiOutlineDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDisLike}</span>
                  </>
                )}
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
            <button className='flex items-center gap-x-2 ' onClick={handleLikeVideo}>
              {isLike ? (
                <>
                  <AiFillLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalLike}</span>{' '}
                </>
              ) : (
                <>
                  <AiOutlineLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalLike}</span>
                </>
              )}
            </button>
            <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400' />
            <button className='flex items-center gap-x-2 ' onClick={handleDislikeVideo}>
              {isDislike ? (
                <>
                  <AiFillDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDisLike}</span>
                </>
              ) : (
                <>
                  <AiOutlineDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDisLike}</span>
                </>
              )}
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
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
              {convertNumberToDisplayString(data?.video?.view as number)} luợt xem
            </span>
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
              {convertToRelativeTime(data?.video?.createdAt as string)}
            </span>
          </div>
          <div className='mt-2 flex flex-wrap items-end'>
            <span
              className={`text-xs text-black  dark:text-white ${isOpen ? '' : 'line-clamp-3'} mr-5 md:text-sm`}
              dangerouslySetInnerHTML={{ __html: String(parse(data?.video?.description as string)) }}
            ></span>
            {isOpen ? (
              <button
                className='mt-2 flex-shrink-0 text-xs font-semibold text-black dark:text-white md:text-sm'
                onClick={() => setIsOpen(false)}
              >
                Hiện thêm
              </button>
            ) : (
              <button
                className='dark:text- mt-2 flex-shrink-0 text-xs font-semibold text-black dark:text-white md:text-sm'
                onClick={() => setIsOpen(true)}
              >
                Ẩn bớt
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
