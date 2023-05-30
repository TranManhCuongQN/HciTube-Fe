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
import { FacebookShareButton } from 'react-share'
import { setProfileToLocalStorage } from 'src/utils/auth'
import DialogCustom from 'src/components/DialogCustome'
import playListAPI from 'src/api/playlist.api'
import { IoCloseOutline } from 'react-icons/io5'
import TextArea from 'src/components/TextArea'
import Button from 'src/components/Button'
import { uploadVideoSchema, uploadVideoSchemaType } from 'src/utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Editor from 'src/components/Editor'

interface VideoInformationAndCommentProps {
  data: VideoItem
}

type FormData = Pick<uploadVideoSchemaType, 'description' | 'title'>
const playListSchema = uploadVideoSchema.pick(['description', 'title'])
const VideoInformationAndComment = ({ data }: VideoInformationAndCommentProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isLike, setIsLike] = useState<boolean>(false)
  const [totalLike, setTotalLike] = useState<number>(0)
  const [isDislike, setIsDislike] = useState<boolean>(false)
  const [totalDislike, setTotalDisLike] = useState<number>(0)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const { profile, isVerify, setProfile } = useContext(AppContext)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [totalSubscriber, setTotalSubscriber] = useState<number>(0)
  const queryClient = useQueryClient()
  const [playListSelected, setPlayListSelected] = useState<string[]>([])
  const [showModalAddPlayList, setShowModalAddPlayList] = useState<boolean>(false)

  const navigate = useNavigate()
  const hasPlaylist = true
  const sharedLink = window.location.href

  const createPlaylistMutation = useMutation({
    mutationFn: (data: FormData) => playListAPI.createPlayList(data)
  })
  const form = useForm<FormData>({
    resolver: yupResolver(playListSchema)
  })

  const { data: VideoListFavorite } = useQuery({
    queryKey: ['videoListFavorite', profile?._id],
    queryFn: () => favoriteApi.getVideoFavoriteByChannel(profile?._id as string),
    enabled: Boolean(profile?._id)
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = form

  const { data: dataPlayList } = useQuery({
    queryKey: 'playList',
    queryFn: () => playListAPI.getPlayListById(profile?.id as string),
    enabled: Boolean(profile?.id)
  })

  const videoToPlayListMutation = useMutation({
    mutationFn: (data: { action: string; video: string; idPlayList: string }) => playListAPI.VideoToPlayList(data)
  })

  useEffect(() => {
    if (data && dataPlayList) {
      const checkPlayList = dataPlayList.data.data.filter(
        (item) => item?.videos?.findIndex((video) => video._id === data.video._id) !== -1
      )
      if (checkPlayList.length > 0) {
        setPlayListSelected(checkPlayList.map((item) => item._id))
      } else {
        setPlayListSelected([])
      }
    }
  }, [dataPlayList, data])

  const handleChangeSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      videoToPlayListMutation.mutate({
        action: 'add',
        video: data.video._id as string,
        idPlayList: e.target.value
      })
      toast.dismiss()
      toast.success('Thêm vào danh sách phát thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: true
      })
      setPlayListSelected([...playListSelected, e.target.value])
    } else {
      videoToPlayListMutation.mutate({
        action: 'remove',
        video: data.video._id as string,
        idPlayList: e.target.value
      })
      toast.dismiss()
      toast.success('Xóa khỏi danh sách phát thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: true
      })
      setPlayListSelected(playListSelected.filter((item) => item !== e.target.value))
    }
  }

  useEffect(() => {
    if (data && data.video.like) {
      setTotalLike(data.video.like.length)
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
      setTotalSubscriber(data.video.channel.subscribers.length)
      const checkSubscribed = data.video.channel.subscribers?.findIndex((item) => item._id === profile?.id)
      if (checkSubscribed !== -1) {
        setIsSubscribed(true)
      } else {
        setIsSubscribed(false)
      }
    }
  }, [data])

  useEffect(() => {
    if (data && data.video.dislike) {
      setTotalDisLike(data.video.dislike.length)
      const checkDisLikeVideo = data?.video?.dislike?.findIndex((item) => item === profile?._id) || false
      if (checkDisLikeVideo !== -1) {
        setIsDislike(true)
      } else {
        setIsDislike(false)
      }
    }
  }, [data, profile])

  useEffect(() => {
    if (VideoListFavorite) {
      const checkFavoriteVideo =
        VideoListFavorite.data.data.findIndex((item) => item?.video._id === data.video._id) || false
      if (checkFavoriteVideo !== -1) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    }
  }, [VideoListFavorite, data])

  const likeVideoMutation = useMutation({
    mutationFn: () =>
      videoApi.setAction({
        action: 'like',
        video: data.video._id as string
      })
  })

  const dislikeVideoMutation = useMutation({
    mutationFn: () =>
      videoApi.setAction({
        action: 'dislike',
        video: data.video._id as string
      })
  })

  const subscribeChannelMutation = useMutation({
    mutationFn: () =>
      subscriberApi.subscribeChannel({
        channel: data.video.channel?._id as string
      }),
    onSuccess: (data) => {
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
    }
  })

  const deleteSubscribeChannelMutation = useMutation({
    mutationFn: () =>
      subscriberApi.deleteSubscribeChannel({
        channel: data.video.channel?._id as string
      }),
    onSuccess: (data) => {
      setProfile(data.data.data.user)
      setProfileToLocalStorage(data.data.data.user)
    }
  })

  const addListFavoriteMutation = useMutation({
    mutationFn: () => favoriteApi.addFovoriteVideo(data.video._id as string)
  })

  const removeListFavoriteMutation = useMutation({
    mutationFn: () => favoriteApi.removeFovoriteVideo(data.video._id as string)
  })

  const onSubmit = handleSubmit((data) => {
    createPlaylistMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['playList'], exact: true })
        setShowModalAddPlayList(false)
        reset()
        toast.dismiss()
        toast.success('Tạo danh sách phát thành công', {
          position: 'top-right',
          autoClose: 2000,
          pauseOnHover: false
        })
      }
    })
  })

  useEffect(() => {
    if (showModalAddPlayList === false) {
      reset()
    }
  }, [showModalAddPlayList, reset])

  const handleLikeVideo = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    if (isLike === false) {
      setIsLike(true)
      setTotalLike((prev) => prev + 1)
      if (isDislike) {
        setIsDislike(false)
        setTotalDisLike((prev) => prev - 1)
      }
      likeVideoMutation.mutate()
    } else {
      setIsLike(false)
      setTotalLike((prev) => prev - 1)
      if (isDislike) {
        setIsDislike(false)
        setTotalDisLike((prev) => prev - 1)
      }
      likeVideoMutation.mutate()
    }
  }

  const handleAddPlayList = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    setShowModal(true)
  }

  const handleDislikeVideo = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    if (isDislike === false) {
      setIsDislike(true)
      setTotalDisLike((prev) => prev + 1)
      if (isLike) {
        setIsLike(false)
        setTotalLike((prev) => prev - 1)
      }
      dislikeVideoMutation.mutate()
    } else {
      setIsDislike(false)
      setTotalDisLike((prev) => prev - 1)
      if (isLike) {
        setIsLike(false)
        setTotalLike((prev) => prev - 1)
      }
      dislikeVideoMutation.mutate()
    }
  }

  const handleSubscribeChannel = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    if (isSubscribed === false) {
      setTotalSubscriber((prev) => prev + 1)
      setIsSubscribed(true)
      subscribeChannelMutation.mutate()
    }
  }

  const handleDeleteSubscribeChannel = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    if (isSubscribed === true) {
      setTotalSubscriber((prev) => prev - 1)
      setIsSubscribed(false)
      deleteSubscribeChannelMutation.mutate()
    }
  }

  const handleAddListFavorite = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    if (isFavorite === false) {
      setIsFavorite(true)
      addListFavoriteMutation.mutate()
    }
  }

  const handleRemoveListFavorite = () => {
    if (isVerify !== '2') {
      toast.dismiss()
      toast.info('Bạn cần đăng nhập tài khoản để thực hiện chức năng này', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      navigate('/login')
      return
    }
    if (isFavorite === true) {
      setIsFavorite(false)
      removeListFavoriteMutation.mutate()
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <div
        className={`${
          !hasPlaylist ? 'hidden' : ''
        } mb-3 w-full border-b border-b-[rgba(0,0,0,0.1)] dark:border-b-gray-600  md:mb-0 md:border-none md:p-2 lg:hidden`}
      >
        {/* <Playlist/> */}
      </div>
      <div className='flex flex-1 flex-col bg-white px-3 dark:bg-[#0f0f0f] lg:px-0'>
        <span className='text-lg font-bold text-black line-clamp-2 dark:text-white md:text-xl'>
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
                {totalSubscriber} người đăng ký
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

          {/* //* Tablet & Desktop Group */}
          <div className='flex flex-wrap items-center gap-x-5 gap-y-3 max-md:hidden lg:w-full lg:justify-between'>
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
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDislike}</span>
                  </>
                ) : (
                  <>
                    <AiOutlineDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                    <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDislike}</span>
                  </>
                )}
              </button>
            </div>
            <div className='flex gap-x-3'>
              <FacebookShareButton url={sharedLink}>
                <div className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3 '>
                  <TbShare3 className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Chia sẻ</span>
                </div>
              </FacebookShareButton>

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

              <button
                className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727] md:px-3'
                onClick={handleAddPlayList}
              >
                <RiMenuAddFill className='text-black dark:text-white md:h-5 md:w-5 ' />
                <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Thêm vào playlist</span>
              </button>
            </div>
          </div>
        </div>

        {/* //* Mobile Group */}
        <div className='mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 md:hidden'>
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
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDislike}</span>
                </>
              ) : (
                <>
                  <AiOutlineDislike className='text-black dark:text-white xl:h-5 xl:w-5' />
                  <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>{totalDislike}</span>
                </>
              )}
            </button>
          </div>

          <FacebookShareButton url={sharedLink}>
            <div className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'>
              <TbShare3 className='text-black dark:text-white' />
              <span className='text-xs font-semibold text-black dark:text-white'>Chia sẻ</span>
            </div>
          </FacebookShareButton>

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

          <button
            className='flex items-center gap-x-2 rounded-2xl bg-[#f2f2f2] p-2 dark:bg-[#272727]'
            onClick={handleAddPlayList}
          >
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

      <DialogCustom isOpen={showModal} handleClose={handleCloseModal}>
        <div className='  bg-white shadow dark:bg-[#282828] max-lg:w-[300px] lg:w-[500px]'>
          <div className='flex flex-col px-5'>
            <div className='flex items-center justify-between'>
              <span className='py-5 text-sm font-semibold dark:text-white  md:text-base'>Lưu vào</span>
              <button
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'
                onClick={() => {
                  setShowModal(false)
                }}
              >
                <IoCloseOutline className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
              </button>
            </div>
            <div className='w-full border border-gray-500'></div>
            <div className=' h-full w-full overflow-y-scroll py-4 max-sm:h-60 max-[320px]:h-52 md:h-[280px] lg:h-[300px] '>
              {dataPlayList &&
                dataPlayList.data.data.map((item) => (
                  <div
                    className='flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                    key={item._id}
                  >
                    <input
                      type='checkbox'
                      className='h-4 w-4 accent-black dark:accent-white'
                      id={item._id}
                      value={item._id}
                      checked={playListSelected.includes(item._id)}
                      onChange={handleChangeSelected}
                    />
                    <label className='cursor-pointer text-xs text-gray-900 dark:text-gray-300' htmlFor={item._id}>
                      {item.title}
                    </label>
                  </div>
                ))}
              {dataPlayList && dataPlayList.data.data.length === 0 && (
                <div className='flex h-full flex-col items-center justify-center'>
                  <span className='text-xs font-semibold text-black dark:text-white'>Bạn chưa có playlist nào</span>
                </div>
              )}
            </div>
            <button
              className='bg-white py-4 text-xs font-semibold text-[#1569d6] dark:bg-[#282828] lg:text-sm'
              type='button'
              onClick={() => setShowModalAddPlayList(true)}
            >
              TẠO MỚI
            </button>
          </div>
        </div>
      </DialogCustom>
      {/* <div className={`${showModalAddPlayList ? 'block' : 'hidden'} relative w-full h-full bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.4)] z-[100]`}></div> */}
      <DialogCustom isOpen={showModalAddPlayList} handleClose={() => setShowModalAddPlayList(false)}>
        <div className=' bg-white drop-shadow-lg dark:bg-[#282828] '>
          <div className='flex flex-col px-5'>
            <span className='py-5 text-sm font-semibold dark:text-white  md:text-base'>Tạo danh sách phát mới</span>
            <div className='w-full border border-gray-500'></div>
            <FormProvider {...form}>
              <form
                className='my-5 flex flex-col overflow-y-scroll max-sm:h-72 max-[320px]:h-64 lg:h-[320px]'
                onSubmit={onSubmit}
              >
                <div className='mx-5 flex flex-col gap-y-1'>
                  <label
                    htmlFor='title'
                    className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                  >
                    Tiêu đề:
                  </label>
                  <TextArea
                    name='title'
                    id='title'
                    placeholder='Tiêu đề'
                    register={register}
                    onKeyUp={(event) => event.stopPropagation()}
                    errorMessage={errors.title?.message}
                    classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-20 placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121]
                    dark:border-[#595959]'
                  />
                </div>
                <div className='mx-5 flex w-[550px] flex-col gap-y-1'>
                  <Editor name='description' />
                  <span className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                    {errors.description?.message}
                  </span>
                </div>
                <div className='mt-3 flex w-full items-start justify-end gap-x-3 px-5'>
                  <Button
                    className='rounded-lg py-2 px-3 text-xs font-semibold text-blue-600 hover:bg-blue-50 md:text-sm  '
                    type='button'
                    onClick={() => setShowModalAddPlayList(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    className='rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
                    disabled={createPlaylistMutation.isLoading}
                    isLoading={createPlaylistMutation.isLoading}
                    type='submit'
                  >
                    Tạo
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default VideoInformationAndComment
