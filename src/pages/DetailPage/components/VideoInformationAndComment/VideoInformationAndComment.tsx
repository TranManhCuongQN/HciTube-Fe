import React, { useContext, useEffect, useState } from 'react'
import { BsBell } from 'react-icons/bs'
import { RxDividerVertical } from 'react-icons/rx'
import { TbShare3 } from 'react-icons/tb'
import { RiMenuAddFill } from 'react-icons/ri'
import Comment from '../Comment'
import { VideoItem } from 'src/types/video.type'
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { convertNumberToDisplayString, convertToRelativeTime } from 'src/utils/utils'
import parse from 'html-react-parser'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import videoApi from 'src/api/video.api'
import { AppContext } from 'src/context/app.context'
import { subscriberApi } from 'src/api/subscriber.api'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'
import favoriteApi from 'src/api/favorite.api'
import { User } from 'src/types/user.type'
import { setProfileToLocalStorage } from 'src/utils/auth'

interface VideoInformationAndCommentProps {
  data: VideoItem
}
const VideoInformationAndComment = ({ data }: VideoInformationAndCommentProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isLike, setIsLike] = useState<boolean>(false)
  const [isDislike, setIsDislike] = useState<boolean>(false)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const { profile, isVerify, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  console.log('Data:', data)

  const { data: dataFavorite } = useQuery({
    queryKey: ['favorite'],
    queryFn: () => favoriteApi.getFavoriteVideos()
  })

  console.log('dataFavorite:', dataFavorite?.data.data)

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
    if (data && data.video.channel?.subscribers) {
      const checkSubscribed = data.video.channel.subscribers?.findIndex((item) => item === profile?.id)
      if (checkSubscribed !== -1) {
        setIsSubscribed(true)
      } else {
        setIsSubscribed(false)
      }
    }
  }, [data, profile])

  useEffect(() => {
    if (data && data.video.dislike) {
      const checkDisLikeVideo = data?.video?.dislike?.findIndex((item) => item === profile?._id) || false
      if (checkDisLikeVideo !== -1) {
        setIsDislike(true)
      } else {
        setIsDislike(false)
      }
    }
  }, [data, profile])

  useEffect(() => {
    if (dataFavorite) {
      const checkFavoriteVideo = dataFavorite.data.data.findIndex((item) => item?.video._id === data.video._id) || false
      if (checkFavoriteVideo !== -1) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    }
  }, [dataFavorite, data])

  const likeVideoMutation = useMutation({
    mutationFn: () =>
      videoApi.setAction({
        action: 'like',
        video: data.video._id as string
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries('video')
    }
  })

  const dislikeVideoMutation = useMutation({
    mutationFn: () =>
      videoApi.setAction({
        action: 'dislike',
        video: data.video._id as string
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries('video')
    }
  })

  const subscribeChannelMutation = useMutation({
    mutationFn: () =>
      subscriberApi.subscribeChannel({
        channel: data.video.channel?._id as string
      }),
    onSuccess: (data) => {
      toast.dismiss()
      toast.success('Đăng ký kênh thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      console.log('dataFolloing:', data.data.data.user)
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
      queryClient.invalidateQueries('video')
    }
  })

  const deleteSubscribeChannelMutation = useMutation({
    mutationFn: () =>
      subscriberApi.deleteSubscribeChannel({
        channel: data.video.channel?._id as string
      }),
    onSuccess: (data) => {
      toast.dismiss()
      toast.success('Hủy đăng ký kênh thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
      queryClient.invalidateQueries('video')
    }
  })

  const addListFavoriteMutation = useMutation({
    mutationFn: () => favoriteApi.addFovoriteVideo(data.video._id as string),
    onSuccess: (data) => {
      toast.dismiss()
      toast.success('Thêm vào danh sách yêu thích thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      queryClient.invalidateQueries('favorite')
    }
  })

  const removeListFavoriteMutation = useMutation({
    mutationFn: () => favoriteApi.removeFovoriteVideo(data.video._id as string),
    onSuccess: (data) => {
      toast.dismiss()
      toast.success('Xóa khỏi danh sách yêu thích thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      queryClient.invalidateQueries('favorite')
    }
  })
  const handleLikeVideo = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.error('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    likeVideoMutation.mutate()
  }

  const handleDislikeVideo = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.error('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    dislikeVideoMutation.mutate()
  }

  const handleSubscribeChannel = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.error('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    subscribeChannelMutation.mutate()
  }

  const handleDeleteSubscribeChannel = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.error('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    deleteSubscribeChannelMutation.mutate()
  }

  const handleAddListFavorite = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.error('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    addListFavoriteMutation.mutate()
  }

  const handleRemoveListFavorite = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.error('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    removeListFavoriteMutation.mutate()
  }

  return (
    <>
      <div className='flex flex-1 flex-col bg-white dark:bg-[#0f0f0f]'>
        <span className='text-xs font-bold leading-4 text-black line-clamp-2 dark:text-white md:text-base'>
          {data?.video?.title}
        </span>
        <div className='mt-2 flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-x-3'>
            <NavLink to={`/${data.video.channel?._id}/channel`} className='flex items-center'>
              <img
                src={data?.video?.channel?.avatar}
                alt='avatar'
                className='h-8 w-8 rounded-full object-cover md:h-10 md:w-10'
              />
            </NavLink>
            <div className='flex flex-col'>
              <NavLink
                to={`/${data.video.channel?._id}/channel`}
                className='text-xs font-bold text-black line-clamp-1 dark:text-white md:text-sm'
              >
                {data?.video?.channel?.fullName}
              </NavLink>
              <span className='text-xs font-medium text-[#666d74] dark:text-gray-400 '>
                {data.video.channel?.subscribers?.length} người đăng ký
              </span>
            </div>

            {/* //* Sign in channel */}

            {profile?._id !== data.video.channel?._id &&
              (isSubscribed ? (
                <button
                  className='ml-5 flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] max-md:hidden md:px-3'
                  onClick={handleDeleteSubscribeChannel}
                >
                  <BsBell className='text-black dark:text-white' />
                  <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Đã đăng ký</span>
                </button>
              ) : (
                <button
                  className='ml-5 flex items-center gap-x-2 rounded-2xl bg-[#0f0f0f] p-2 dark:bg-[#f1f1f1] max-md:hidden md:px-3'
                  onClick={handleSubscribeChannel}
                >
                  <span className='text-xs font-semibold text-white dark:text-black md:text-sm'>Đăng ký</span>
                </button>
              ))}
          </div>

          {profile?._id !== data.video.channel?._id &&
            (isSubscribed ? (
              <button
                className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:hidden'
                onClick={handleDeleteSubscribeChannel}
              >
                <BsBell className='text-black dark:text-white' />
                <span className='text-xs font-semibold text-black dark:text-white'>Đã đăng ký</span>
              </button>
            ) : (
              <button
                className='flex items-center gap-x-2 rounded-2xl bg-[#0f0f0f] p-2 dark:bg-[#f1f1f1] md:hidden'
                onClick={handleSubscribeChannel}
              >
                <span className='text-xs font-semibold text-white dark:text-black'>Đăng ký</span>
              </button>
            ))}

          {/* //* Group */}
          <div className='flex flex-wrap items-center gap-x-5 gap-y-3 max-md:hidden'>
            <div className='flex items-center rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'>
              <button className='flex items-center gap-x-2 ' onClick={handleLikeVideo}>
                {isLike ? (
                  <>
                    <AiFillLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                      {data?.video?.like?.length}
                    </span>{' '}
                  </>
                ) : (
                  <>
                    <AiOutlineLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                      {data?.video?.like?.length}
                    </span>
                  </>
                )}
              </button>
              <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400 md:h-5 md:w-5' />
              <button className='flex items-center gap-x-2 ' onClick={handleDislikeVideo}>
                {isDislike ? (
                  <>
                    <AiFillDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                      {data?.video?.dislike?.length}
                    </span>
                  </>
                ) : (
                  <>
                    <AiOutlineDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                      {data?.video?.dislike?.length}
                    </span>
                  </>
                )}
              </button>
            </div>
            <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3 '>
              <TbShare3 className='text-black dark:text-white xl:h-5 xl:w-5' />
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Chia sẻ</span>
            </button>

            {isFavorite && (
              <button
                className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'
                onClick={handleRemoveListFavorite}
              >
                <AiFillHeart className='text-red-600 md:h-5 md:w-5 ' />
                <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                  Xóa khỏi danh sách yêu thích
                </span>{' '}
              </button>
            )}

            {!isFavorite && (
              <button
                className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'
                onClick={handleAddListFavorite}
              >
                {' '}
                <AiOutlineHeart className='text-black dark:text-white md:h-5 md:w-5 ' />
                <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                  Thêm vào danh sách yêu thích
                </span>{' '}
              </button>
            )}

            <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'>
              <RiMenuAddFill className='text-black dark:text-white md:h-5 md:w-5 ' />
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Thêm vào playlist</span>
            </button>
          </div>
        </div>

        {/* //* Group */}
        <div className='mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 md:hidden'>
          <div className='flex items-center rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
            <button className='flex items-center gap-x-2 ' onClick={handleLikeVideo}>
              {isLike ? (
                <>
                  <AiFillLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                    {data?.video?.like?.length}
                  </span>{' '}
                </>
              ) : (
                <>
                  <AiOutlineLike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                    {data?.video?.like?.length}
                  </span>
                </>
              )}
            </button>
            <RxDividerVertical className='h-full text-[#666d74] dark:text-gray-400' />
            <button className='flex items-center gap-x-2 ' onClick={handleDislikeVideo}>
              {isDislike ? (
                <>
                  <AiFillDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                    {data?.video?.dislike?.length}
                  </span>
                </>
              ) : (
                <>
                  <AiOutlineDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                    {data?.video?.dislike?.length}
                  </span>
                </>
              )}
            </button>
          </div>
          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
            <TbShare3 className='text-black dark:text-white' />
            <span className='text-xs font-semibold text-black dark:text-white'>Chia sẻ</span>
          </button>
          {isFavorite && (
            <button
              className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'
              onClick={handleRemoveListFavorite}
            >
              <AiFillHeart className='text-red-600' />
              <span className='text-xs font-semibold text-black dark:text-white'>Xóa khỏi danh sách yêu thích</span>
            </button>
          )}

          {!isFavorite && (
            <button
              className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'
              onClick={handleAddListFavorite}
            >
              <AiOutlineHeart className='text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>Thêm vào danh sách yêu thích</span>
            </button>
          )}

          <button className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
            <RiMenuAddFill className='text-black dark:text-white' />
            <span className='text-xs font-semibold text-black dark:text-white'>Thêm vào playlist</span>
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
              dangerouslySetInnerHTML={{ __html: String(parse(data?.video?.description as string) || '') }}
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
        <Comment
          totalComment={data?.video?.comments?.length as number}
          avatar={data?.video?.channel?.avatar as string}
        />
      </div>
    </>
  )
}

export default VideoInformationAndComment
