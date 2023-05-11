import React, { useContext, useRef, useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { BsEmojiLaughing } from 'react-icons/bs'
import useOnClickOutSide from 'src/hook/useOnClickOutSide'
import CommentItem from '../CommentItem'
import classNames from 'classnames'
import ToolTip from 'src/components/ToolTip'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { commentApi } from 'src/api/comment.api'
import { AppContext } from 'src/context/app.context'
import { NavLink, useParams } from 'react-router-dom'
import path from 'src/constants/path'

const Comment = ({ totalComment, avatar }: { totalComment: number; avatar: string }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowArrange, setIsShowArrange] = useState<boolean>(false)
  const emojiRef = useRef<HTMLDivElement>(null)
  const [comment, setComment] = useState<string>('')
  const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false)
  const [valueArrange, setValueArrange] = useState<string>('comment')
  const arrangeRef = useRef<HTMLDivElement | null>(null)
  const { isVerify } = useContext(AppContext)
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, refetch } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => commentApi.getComment(id as string)
  })

  const createCommentMutation = useMutation({
    mutationFn: (comment: string) =>
      commentApi.createComment({
        comment,
        video: id as string
      }),
    onSuccess: () => {
      refetch()
      setComment('')
      setIsShow(false)
      queryClient.invalidateQueries('video')
    }
  })

  useOnClickOutSide(emojiRef, () => {
    setIsShowEmoji(false)
  })

  useOnClickOutSide(arrangeRef, () => {
    setIsShowArrange(false)
  })

  const handlwShowEmoji = () => {
    setIsShowEmoji(!isShowEmoji)
  }

  function onClick(emojiData: EmojiClickData) {
    setComment(comment + emojiData.emoji)
  }

  const handleComment = () => {
    createCommentMutation.mutate(comment)
  }

  return (
    <>
      <div className='my-3 flex flex-col min-h-[500px] '>
        <div className='flex items-center gap-x-5'>
          <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>{totalComment} bình luận</span>
          <div
            className='relative flex cursor-pointer items-center gap-x-1'
            onClick={() => setIsShowArrange(!isShowArrange)}
            role='presentation'
            ref={arrangeRef}
          >
            <BiMenuAltLeft className='h-5 w-5 text-black dark:text-white' />
            <ToolTip content='Sắp xếp bình luận' position='bottom'>
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Sắp xếp theo</span>
            </ToolTip>

            {isShowArrange && (
              <div className='absolute top-6 left-0 z-40 flex w-[130px]  flex-col gap-y-2 rounded-xl bg-white py-2 shadow transition-all ease-linear dark:bg-[#212121] md:w-[160px]'>
                <button
                  className={classNames(
                    'w-full p-2 text-xs text-black hover:bg-[#e5e5e5] dark:text-white dark:hover:bg-[#4d4d4d] md:text-sm',
                    {
                      'bg-[#e5e5e5] dark:bg-[#4d4d4d]': valueArrange === 'comment'
                    }
                  )}
                  onClick={() => setValueArrange('comment')}
                >
                  Mới nhất xếp trước
                </button>
                <button
                  className={classNames(
                    'w-full p-2 text-xs text-black hover:bg-[#e5e5e5] dark:text-white dark:hover:bg-[#4d4d4d] md:text-sm',
                    {
                      'bg-[#e5e5e5] dark:bg-[#4d4d4d]': valueArrange === 'new'
                    }
                  )}
                  onClick={() => setValueArrange('new')}
                >
                  Bình luận hàng đầu
                </button>
              </div>
            )}
          </div>
        </div>

        {isVerify === '2' && (
          <div className='mt-5 flex items-center gap-x-2'>
            <img
              src={avatar}
              alt='avatar'
              className='h-8 w-8 flex-shrink-0 rounded-full object-cover  md:h-10 md:w-10'
            />
            <div className='flex flex-grow flex-col gap-y-3'>
              <textarea
                className='h-8 w-full border-b border-b-black bg-transparent p-2 text-xs text-black outline-none placeholder:text-xs placeholder:font-semibold placeholder:text-gray-400 dark:border-b-white dark:text-white md:h-10 md:text-sm md:placeholder:text-sm'
                placeholder='Viết bình luận ...'
                value={comment}
                onClick={() => setIsShow(true)}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {isShow && (
                <div className='flex items-center justify-between '>
                  <div
                    className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full dark:bg-[#272727] lg:h-10 lg:w-10'
                    ref={emojiRef}
                  >
                    <BsEmojiLaughing className='h-5 w-5 text-black dark:text-white' onClick={handlwShowEmoji} />
                    <div className='absolute top-10 left-0'>
                      {isShowEmoji && (
                        <>
                          <EmojiPicker height='300px' width='fit' onEmojiClick={onClick} />
                        </>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <button
                      className='rounded-2xl px-4 py-2 text-xs font-semibold text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#272727] md:text-sm'
                      onClick={() => {
                        setComment('')
                        setIsShow(false)
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
                      onClick={handleComment}
                    >
                      Bình luận
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(data?.data.data.length as number) > 0 ?
          data?.data.data.map((item, index) => {
            return <CommentItem key={item._id} dataComment={item} />
          })
          : (
            <div className="flex justify-center items-center w-full h-full  ">
              <span className="text-base font-bold text-black dark:text-white">Chưa có bình luận nào</span>
            </div>
          )
        }

        {isVerify !== '2' && (
          <div className='mt-3 flex w-full items-center justify-center gap-x-2'>
            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
              Bạn vui lòng đăng nhập để bình luận
            </span>
            <NavLink to={path.login} className='text-sm font-bold text-blue-600 md:text-sm'>
              Đăng nhập
            </NavLink>
          </div>
        )}
      </div>
    </>
  )
}

export default Comment
