import { RxDotsVertical } from 'react-icons/rx'
import { BiLike, BiDislike } from 'react-icons/bi'
const CommentItem = () => {
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
          <button>
            <RxDotsVertical className='h-5 w-5 text-black dark:text-white' />
          </button>
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
      <div className='mt-3 flex flex-col'>
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
          <button>
            <RxDotsVertical className='h-5 w-5 text-black dark:text-white' />
          </button>
        </div>
        <div className='flex items-center pl-8 pr-3'>
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
      <div className='mt-3 flex flex-col'>
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
          <button>
            <RxDotsVertical className='h-5 w-5 text-black dark:text-white' />
          </button>
        </div>
        <div className='flex items-center pl-8 pr-3'>
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
    </>
  )
}

export default CommentItem
