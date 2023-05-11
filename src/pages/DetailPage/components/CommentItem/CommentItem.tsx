import { RxDotsVertical } from 'react-icons/rx'
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineCaretUp } from 'react-icons/ai'
import { useContext, useEffect, useRef, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DialogCustom from 'src/components/DialogCustome'
import useOnClickOutSide from 'src/hook/useOnClickOutSide'
import { Comment } from 'src/types/comment.type'
import { convertToRelativeTime } from 'src/utils/utils'
import { useMutation, useQueryClient } from 'react-query'
import { commentApi } from 'src/api/comment.api'
import { useNavigate, useParams } from 'react-router-dom'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { BsEmojiLaughing } from 'react-icons/bs'
import { AppContext } from 'src/context/app.context'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { toast } from 'react-toastify'

const CommentItem = ({ dataComment }: { dataComment: Comment }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowComment, setIsShowComment] = useState<boolean>(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const editRef = useRef<HTMLDivElement>(null)
  const [comment, setComment] = useState<string>('')
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false)
  const emojiRef = useRef<HTMLDivElement>(null)
  const [isLike, setIsLike] = useState<boolean>(false)
  const [isDislike, setIsDislike] = useState<boolean>(false)
  const [isReply, setIsReply] = useState<boolean>(false)
  const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false)
  const { profile, isVerify } = useContext(AppContext)

  useOnClickOutSide(editRef, () => {
    setIsShow(false)
  })

  useOnClickOutSide(emojiRef, () => {
    setIsShowEmoji(false)
  })

  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const replyCommentMutation = useMutation({
    mutationFn: () =>
      commentApi.createComment({
        video: id as string,
        comment: comment,
        parent: dataComment._id
      }),
    onSuccess: () => {
      setIsReply(false)
      queryClient.invalidateQueries(['comment', id])
    }
  })

  const handleEditCommentMutation = useMutation({
    mutationFn: () => commentApi.editComment(dataComment?._id as string, { comment: comment }),
    onSuccess: () => {
      setIsShowEdit(false)
      queryClient.invalidateQueries(['comment', id])
    }
  })

  const handleDeleteCommentMutation = useMutation({
    mutationFn: () => commentApi.deleteComment(dataComment?._id as string),
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', id])
      setIsShowModal(false)
    }
  })

  const handleLikeCommentMutation = useMutation({
    mutationFn: () => commentApi.setAction({ action: 'like', comment: dataComment._id as string }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comment', id])
    }
  })

  const handleDislikeCommentMutation = useMutation({
    mutationFn: () => commentApi.setAction({ action: 'dislike', comment: dataComment._id as string }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comment', id])
    }
  })

  useEffect(() => {
    if (dataComment.dislike) {
      const checkDisLikeVideo = dataComment?.dislike?.findIndex((item) => item === profile?._id) || false

      if (checkDisLikeVideo !== -1) {
        setIsDislike(true)
      } else {
        setIsDislike(false)
      }
    }
  }, [dataComment, profile?._id])

  useEffect(() => {
    if (dataComment.like) {
      const checkLikeVideo = dataComment?.like?.findIndex((item) => item === profile?._id) || false

      if (checkLikeVideo !== -1) {
        setIsLike(true)
      } else {
        setIsLike(false)
      }
    }
  }, [dataComment, profile?._id])

  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  const handlwShowEmoji = () => {
    setIsShowEmoji(!isShowEmoji)
  }

  function onClick(emojiData: EmojiClickData) {
    setComment(comment + emojiData.emoji)
  }

  const handleShowComment = () => {
    setIsShowComment(!isShowComment)
  }

  const handleLike = () => {
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
    handleLikeCommentMutation.mutate()
  }

  const handleDislike = () => {
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
    handleDislikeCommentMutation.mutate()
  }

  const handleReply = () => {
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
    setIsReply(true)
  }

  const handleReplyComment = () => {
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
    replyCommentMutation.mutate()
  }

  const handleEditComment = () => {
    handleEditCommentMutation.mutate()
  }

  const handleDeleteComment = () => {
    handleDeleteCommentMutation.mutate()
  }

  useEffect(() => {
    if (isShowEdit) {
      setComment(dataComment.comment)
    }
  }, [isShowEdit, dataComment.comment])

  const nestedComments = (dataComment?.children || []).map((item, index) => {
    return <CommentItem dataComment={item} key={index} />
  })

  return (
    <>
      <div className='mt-8 flex w-full flex-col'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex w-full items-center gap-x-2'>
            <img
              src={dataComment?.channel?.avatar}
              alt='avatar'
              className='h-8 w-8 flex-shrink-0 rounded-full object-cover  md:h-10 md:w-10'
            />
            {isShowEdit ? (
              <div className='flex flex-grow flex-col gap-y-3'>
                <textarea
                  className='comment-box h-8 w-full border-b border-b-black bg-transparent p-2 text-xs text-black outline-none placeholder:text-xs placeholder:font-semibold placeholder:text-gray-400 dark:border-b-white dark:text-white md:h-10 md:text-sm md:placeholder:text-sm'
                  value={comment}
                  onKeyUp={(event) => event.stopPropagation()}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <div className='flex items-center justify-between '>
                  <div
                    className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full dark:bg-[#272727] lg:h-10 lg:w-10'
                    ref={emojiRef}
                  >
                    <BsEmojiLaughing className='h-5 w-5 text-black dark:text-white' onClick={handlwShowEmoji} />
                    <div className='absolute top-10 left-0'>
                      {isShowEmoji && (
                        <>
                          <EmojiPicker height='260px' width='235px' onEmojiClick={onClick} />
                        </>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <button
                      className='rounded-2xl px-4 py-2 text-xs font-semibold text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#272727] md:text-sm'
                      onClick={() => {
                        setComment('')
                        setIsShowEdit(false)
                      }}
                    >
                      Hủy
                    </button>
                    <button
                      className={`rounded-2xl px-4 py-2 text-xs font-semibold md:text-sm ${
                        comment
                          ? 'bg-blue-600 text-white dark:bg-blue-300 dark:text-black'
                          : 'bg-[#f2f2f2] text-[#6a6a6a] dark:bg-[#272727]'
                      }`}
                      disabled={comment ? false : true}
                      onClick={handleEditComment}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className='flex flex-grow flex-col gap-y-1'>
                  <div className='flex items-center gap-x-2'>
                    <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                      {dataComment?.channel?.fullName}
                    </span>
                    {dataComment?.updatedAt ? (
                      <span className='text-xs text-gray-600 dark:text-gray-400 '>
                        {convertToRelativeTime(dataComment?.updatedAt as string)}
                        &ensp; (đã chỉnh sửa)
                      </span>
                    ) : (
                      <span className='text-xs text-gray-600 dark:text-gray-400 '>
                        {convertToRelativeTime(dataComment?.createdAt as string)}
                      </span>
                    )}
                  </div>
                  <span className='text-xs text-black dark:text-white md:text-sm'>{dataComment?.comment}</span>
                </div>
                {dataComment.channel?._id === profile?._id && (
                  <div className='relative' ref={editRef}>
                    <RxDotsVertical
                      className='h-5 w-5 cursor-pointer text-black dark:text-white'
                      onClick={() => setIsShow(!isShow)}
                    />
                    {isShow && (
                      <div className='absolute top-6 right-0 z-40 flex w-[120px] flex-col gap-y-2 rounded-xl bg-white py-2 shadow transition-all ease-linear  dark:bg-[#212121] md:w-[160px]'>
                        <button
                          className={
                            'flex w-full items-center justify-start gap-x-5 p-1 text-xs text-black hover:bg-[#e5e5e5] dark:text-white dark:hover:bg-[#4d4d4d] md:p-2 md:text-sm'
                          }
                          onClick={() => {
                            setIsShowEdit(true)
                            setIsShow(false)
                          }}
                        >
                          <FiEdit2 className='h-5 w-5 text-black dark:text-white' />
                          Chỉnh sửa
                        </button>
                        <button
                          className={
                            'flex w-full justify-start gap-x-5 p-1 text-xs text-black hover:bg-[#e5e5e5] dark:text-white dark:hover:bg-[#4d4d4d] md:p-2 md:text-sm'
                          }
                          onClick={() => {
                            setIsShowModal(true)
                            setIsShow(false)
                          }}
                        >
                          <RiDeleteBin6Line className='h-5 w-5 text-black dark:text-white' />
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className='flex items-center gap-x-2 pl-8 pr-3'>
          <div className='flex items-center'>
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'
              onClick={handleLike}
            >
              {isLike ? (
                <>
                  <AiFillLike className='h-5 w-5 text-black dark:text-white' />
                </>
              ) : (
                <>
                  <AiOutlineLike className='h-5 w-5 text-black dark:text-white' />
                </>
              )}
            </button>
            {(dataComment.like?.length as number) > 0 && (
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                {dataComment.like?.length}
              </span>
            )}
          </div>
          <div className='flex items-center'>
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[hsla(0,0%,88%,0)] lg:h-10 lg:w-10'
              onClick={handleDislike}
            >
              {isDislike ? (
                <>
                  <AiFillDislike className='h-5 w-5 text-black dark:text-white' />
                </>
              ) : (
                <>
                  <AiOutlineDislike className='h-5 w-5 text-black dark:text-white' />
                </>
              )}
            </button>
            {(dataComment.dislike?.length as number) > 0 && (
              <span className='text-xs  font-semibold text-black dark:text-white md:text-sm'>
                {dataComment.dislike?.length}
              </span>
            )}
          </div>
          <button
            className='rounded-2xl px-4 py-2 text-xs font-semibold text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#272727] md:text-sm'
            onClick={handleReply}
          >
            Phản hồi
          </button>
        </div>
      </div>
      {isReply && (
        <div className='ml-8 flex items-center gap-x-2'>
          <img
            src={profile?.avatar}
            alt='avatar'
            className='h-8 w-8 flex-shrink-0 rounded-full object-cover  md:h-10 md:w-10'
          />
          <div className='flex flex-grow flex-col gap-y-3'>
            <textarea
              className='comment-box h-8 w-full border-b border-b-black bg-transparent p-2 text-xs text-black outline-none placeholder:text-xs placeholder:font-semibold placeholder:text-gray-400 dark:border-b-white dark:text-white md:h-10 md:text-sm md:placeholder:text-sm'
              placeholder='Phản hồi...'
              value={comment}
              onKeyUp={(event) => event.stopPropagation()}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            {isReply && (
              <div className='flex items-center justify-between '>
                <div
                  className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full dark:bg-[#272727] lg:h-10 lg:w-10'
                  ref={emojiRef}
                >
                  <BsEmojiLaughing className='h-5 w-5 text-black dark:text-white' onClick={handlwShowEmoji} />
                  <div className='absolute top-10 left-0'>
                    {isShowEmoji && (
                      <>
                        <EmojiPicker height='260px' width='235px' onEmojiClick={onClick} />
                      </>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <button
                    className='rounded-2xl px-4 py-2 text-xs font-semibold text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#272727] md:text-sm'
                    onClick={() => {
                      setComment('')
                      setIsReply(false)
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    className={`rounded-2xl px-4 py-2 text-xs font-semibold md:text-sm ${
                      comment
                        ? 'bg-blue-600 text-white dark:bg-blue-300 dark:text-black'
                        : 'bg-[#f2f2f2] text-[#6a6a6a] dark:bg-[#272727]'
                    }`}
                    disabled={comment ? false : true}
                    onClick={handleReplyComment}
                  >
                    Phản hồi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {(dataComment?.children?.length as number) > 0 && (
        <button
          className='ml-10 flex cursor-pointer items-center gap-x-1 text-xs font-bold text-[#368cd5] md:text-sm'
          onClick={handleShowComment}
        >
          {isShowComment ? (
            <>
              <AiOutlineCaretDown className='h-5 w-5 text-[#368cd5] ' />
              <span>{dataComment?.children?.length} phản hồi</span>
            </>
          ) : (
            <>
              <AiOutlineCaretUp className='h-5 w-5 text-[#368cd5] ' />
              <span>{dataComment?.children?.length} phản hồi</span>
            </>
          )}
        </button>
      )}
      {isShowComment && <div className='ml-12 transition-all '>{nestedComments}</div>}

      <DialogCustom
        isOpen={isShowModal}
        handleClose={handleCloseModal}
        className='z-50 h-32 rounded-lg bg-white shadow-md dark:bg-[#212121] md:h-[140px] md:w-[500px]'
      >
        <div className='flex w-full flex-col  p-2'>
          <span className='text-lg font-semibold text-black dark:text-white max-md:text-sm'>
            Bạn có muốn xóa video này không ?
          </span>
          <div className='mt-8 flex items-center justify-end gap-x-5'>
            <button
              className='flex h-8 w-20 items-center justify-center rounded-md bg-gray-200 text-xs text-black hover:bg-gray-300 dark:bg-[#363636] dark:text-white dark:hover:bg-[#2f2f2f] max-md:w-14 md:text-sm '
              onClick={() => setIsShowModal(false)}
            >
              Hủy
            </button>
            <button
              className='flex h-8 w-20 items-center justify-center rounded-md bg-red-500 text-xs text-white hover:bg-red-600 max-md:w-14 md:text-sm'
              onClick={handleDeleteComment}
            >
              Xóa
            </button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default CommentItem
