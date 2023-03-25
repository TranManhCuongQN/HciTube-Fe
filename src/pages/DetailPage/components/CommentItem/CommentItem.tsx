import { RxDotsVertical } from 'react-icons/rx'
import { BiLike, BiDislike } from 'react-icons/bi'
import { useRef, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DialogCustom from 'src/components/DialogCustome'
import { useClickOutSide } from 'src/hook/useClickOutSide'
const CommentItem = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const editRef = useRef<HTMLDivElement>(null)

  useClickOutSide(editRef.current, () => {
    setIsShow(false)
  })

  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  return (
    <>
      <div className='mt-8 flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2'>
            <img
              src='https://i.pinimg.com/564x/53/d2/cc/53d2cc393e5a6196a8ba8a8c310bc2e0.jpg'
              alt='avatar'
              className='h-8 w-8 flex-shrink-0 rounded-full object-cover  md:h-10 md:w-10'
            />
            <div className='flex flex-col gap-y-1'>
              <div className='flex items-center gap-x-2'>
                <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>Quỳnh Anh</span>
                <span className='text-xs text-[#959197] '>1 ngày trước</span>
              </div>
              <span className='text-xs text-black dark:text-white md:text-sm'>Đẳng’s cấp luôn nhá 😊😊😊🎉🎉❤❤</span>
            </div>
          </div>
          <div className='relative' ref={editRef}>
            <RxDotsVertical
              className='h-5 w-5 cursor-pointer text-black dark:text-white'
              onClick={() => setIsShow(!isShow)}
            />
            {isShow && (
              <div className='absolute top-6 right-0 z-40 flex w-[120px] flex-col gap-y-2 rounded-xl bg-white py-2 shadow transition-all ease-linear  dark:bg-[#212121] md:w-[160px]'>
                <button
                  className={
                    'flex w-full items-center justify-center gap-x-3 p-1 text-xs text-black hover:bg-[#e5e5e5] dark:text-white dark:hover:bg-[#4d4d4d] md:p-2 md:text-sm'
                  }
                >
                  <FiEdit2 className='h-5 w-5 text-black dark:text-white' />
                  Chỉnh sửa
                </button>
                <button
                  className={
                    'flex w-full justify-center gap-x-5 p-1 text-xs text-black hover:bg-[#e5e5e5] dark:text-white dark:hover:bg-[#4d4d4d] md:p-2 md:text-sm'
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
        </div>
        <div className='flex items-center gap-x-2 pl-8 pr-3'>
          <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
            <BiLike className='h-5 w-5 text-black dark:text-white' />
          </button>
          <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
            <BiDislike className='h-5 w-5 text-black dark:text-white' />
          </button>
          <button className='rounded-2xl px-4 py-2 text-xs font-semibold text-black hover:bg-[#f2f2f2] dark:text-white dark:hover:bg-[#272727] md:text-sm'>
            Phản hồi
          </button>
        </div>
      </div>
      <DialogCustom
        isOpen={isShowModal}
        handleClose={handleCloseModal}
        className={'h-40 bg-white shadow-md  dark:bg-[#212121] md:h-48'}
      >
        <div className='flex h-full flex-col justify-around'>
          <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Xóa bình luận </span>
          <span className='text-xs text-black dark:text-white md:text-sm'>Xóa bình luận này của bạn vĩnh viễn?</span>
          <div className='flex items-center justify-end gap-x-5'>
            <button
              className='rounded-2xl px-4 py-2 text-xs font-semibold text-[#5f98d3] hover:bg-blue-50   md:text-sm'
              onClick={() => setIsShowModal(false)}
            >
              Hủy
            </button>
            <button className='rounded-2xl px-4 py-2 text-xs font-semibold text-[#5f98d3] hover:bg-blue-50 md:text-sm'>
              Xóa
            </button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default CommentItem
