import React from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import DialogCustom from '../DialogCustome'
const Dropdown = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <>
      <div className='relative flex w-[280px] flex-col items-center rounded-lg max-sm:w-2/3'>
        <button
          className='flex w-full items-center justify-between rounded-lg border border-[#d2d2d2] bg-[#ffffff] p-3 text-xs font-bold tracking-wider text-[#b8b8b8] duration-300 active:border-black dark:border-[#575757] dark:bg-[#282828] dark:text-[#878787] dark:active:border-white md:text-sm '
          onClick={() => setIsOpen(true)}
          type='button'
        >
          Chọn
          {isOpen ? (
            <AiOutlineCaretUp className='h-4 w-4 text-black dark:text-[#aaaaaa]' />
          ) : (
            <AiOutlineCaretDown className='h-4 w-4 text-black dark:text-[#aaaaaa]' />
          )}
          {isOpen && (
            <div className='absolute top-0 left-0 z-40 flex h-52 w-full flex-col items-start overflow-hidden overflow-y-auto rounded-lg bg-[#ffffff] shadow dark:bg-[#1f1f1f]'>
              <div className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
                <input type='checkbox' className='h-4 w-4' />
                <span className='text-xs text-black dark:text-white'>Lap trinh</span>
              </div>
              <div className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
                <input type='checkbox' className='h-4 w-4' />
                <span className='text-xs text-black dark:text-white '>Lap trinh</span>
              </div>
              <div className='absolute bottom-0 left-0 my-1 flex w-full items-center justify-between px-2'>
                <button className='text-xs text-[#1569d6]' type='button' onClick={() => setShowModal(true)}>
                  TẠO MỚI
                </button>
                <button className='text-xs text-[#1569d6]' type='button'>
                  XONG
                </button>
              </div>
            </div>
          )}
        </button>
      </div>
      {/* <DialogCustom isOpen={showModal} handleClose={() => setShowModal(false)}>
        <div className='z-50 h-52 w-52 bg-red-500'></div>
      </DialogCustom> */}
    </>
  )
}

export default Dropdown
