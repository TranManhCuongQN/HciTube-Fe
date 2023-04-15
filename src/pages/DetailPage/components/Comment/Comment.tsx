import React, { useRef, useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { BsEmojiLaughing } from 'react-icons/bs'
import useOnClickOutSide from 'src/hook/useOnClickOutSide'
import CommentItem from '../CommentItem'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import ToolTip from 'src/components/ToolTip'

const Comment = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowArrange, setIsShowArrange] = useState<boolean>(false)
  const emojiRef = useRef<HTMLDivElement>(null)
  const [comment, setComment] = useState<string>('')
  const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false)
  const [valueArrange, setValueArrange] = useState<string>('comment')
  const arrangeRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation(['detail'])

  useOnClickOutSide(emojiRef.current, () => {
    setIsShowEmoji(false)
  })

  useOnClickOutSide(arrangeRef.current, () => {
    setIsShowArrange(false)
  })

  const handlwShowEmoji = () => {
    setIsShowEmoji(!isShowEmoji)
  }

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setComment(comment + emojiData.emoji)
  }

  const handleComment = () => {
    console.log(comment)
    setComment('')
    setIsShow(false)
  }

  return (
    <>
      <div className='my-3 flex flex-col '>
        <div className='flex items-center gap-x-5'>
          <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
            14 {t('detail:detail.comments')}
          </span>
          <div
            className='relative flex cursor-pointer items-center gap-x-1'
            onClick={() => setIsShowArrange(!isShowArrange)}
            role='presentation'
            ref={arrangeRef}
          >
            <BiMenuAltLeft className='h-5 w-5 text-black dark:text-white' />
            <ToolTip content={t('detail:detail.sort_comment')} position='bottom'>
              {' '}
              <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                {' '}
                {t('detail:detail.sort_by')}
              </span>
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
                  {t('detail:detail.top_comment')}
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
                  {t('detail:detail.newest_first')}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='mt-3 flex items-center gap-x-2'>
          <img
            src='https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg'
            alt='avatar'
            className='h-8 w-8 flex-shrink-0 rounded-full object-cover  md:h-10 md:w-10'
          />
          <div className='flex flex-grow flex-col gap-y-3'>
            <textarea
              className='h-8 w-full border-b border-b-black bg-transparent p-2 text-xs text-black outline-none placeholder:text-xs placeholder:font-semibold placeholder:text-gray-400 dark:border-b-white dark:text-white md:h-10 md:text-sm md:placeholder:text-sm'
              placeholder={t('detail:detail.add_a_comment')}
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
                      setIsShow(false)
                    }}
                  >
                    {t('detail:detail.cancel')}
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
                    {t('detail:detail.comment')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <CommentItem />
      </div>
    </>
  )
}

export default Comment
