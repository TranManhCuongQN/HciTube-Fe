import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import { playList } from 'src/types/playList.type'
import Button from '../Button'
import DialogCustom from '../DialogCustome'
import Editor from '../Editor'
import TextArea from '../TextArea'

const data = [
  {
    id: 1,
    name: 'Lap trinh'
  },
  {
    id: 2,
    name: 'Giai tri'
  },
  {
    id: 3,
    name: 'Giao duc'
  },
  {
    id: 4,
    name: 'The Thao'
  },
  {
    id: 5,
    name: 'Am nhac'
  },
  {
    id: 6,
    name: 'Phim'
  }
]
const Dropdown = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const childRef = React.useRef<HTMLDivElement>(null)
  const [playList, setPlayList] = useState<string[]>([])
  const { handleSubmit } = useForm<playList>({
    // resolver: yupResolver()
  })

  useOnClickOutside(childRef, () => setIsOpen(false))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPlayList([...playList, e.target.value])
    } else {
      setPlayList(playList.filter((item) => item !== e.target.value))
    }
  }

  console.log('isOpen', isOpen)
  console.log('playList', playList)
  return (
    <>
      <div className='relative flex w-[280px] flex-col items-center rounded-lg max-sm:w-2/3'>
        <div
          className='flex w-full items-center justify-between rounded-lg border border-[#d2d2d2] bg-[#ffffff] p-3 text-xs font-bold tracking-wider text-[#b8b8b8] duration-300 active:border-black dark:border-[#575757] dark:bg-[#282828] dark:text-[#878787] dark:active:border-white md:text-sm '
          onClick={() => setIsOpen(true)}
          role='presentation'
        >
          {playList.length === 0 && <span>Chọn</span>}
          {playList.length === 1 && (
            <span className='text-xs text-black dark:text-white md:text-sm'> {playList[0]}</span>
          )}
          {playList.length > 1 && (
            <span className='text-xs text-black dark:text-white md:text-sm'>{playList.length} danh sách phát</span>
          )}
          {isOpen ? (
            <AiOutlineCaretUp className='h-4 w-4 text-black dark:text-[#aaaaaa]' />
          ) : (
            <AiOutlineCaretDown className='h-4 w-4 text-black dark:text-[#aaaaaa]' />
          )}
        </div>

        {isOpen && (
          <div
            className='absolute top-0 left-0 z-40 flex h-40 w-full flex-col items-start overflow-hidden overflow-y-auto rounded-lg bg-[#ffffff] shadow dark:bg-[#1f1f1f]'
            ref={childRef}
          >
            {data.map((item) => (
              <div
                className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                key={item.id}
              >
                <input
                  type='checkbox'
                  className='h-4 w-4 accent-black dark:accent-white'
                  id={item.name}
                  value={item.name}
                  checked={playList.includes(item.name)}
                  onChange={handleChange}
                />
                <label className='cursor-pointer text-xs text-black dark:text-white' htmlFor={item.name}>
                  {item.name}
                </label>
              </div>
            ))}

            <div className='relative bottom-0 left-0 my-1 flex w-full items-center justify-between px-2'>
              <button className='text-xs text-[#1569d6]' type='button' onClick={() => setShowModal(true)}>
                TẠO MỚI
              </button>
              <button className='text-xs text-[#1569d6]' type='button' onClick={() => setIsOpen(false)}>
                XONG
              </button>
            </div>
          </div>
        )}
      </div>
      <DialogCustom isOpen={showModal} handleClose={() => setShowModal(false)}>
        <div className='relative z-50 mb-5 overflow-hidden overflow-y-auto shadow dark:bg-[#282828] lg:h-[520px] lg:w-[500px]'>
          <div className='flex flex-col px-5'>
            <span className='py-5 text-sm font-semibold dark:text-white  md:text-base'>Tạo danh sách phát mới</span>
            <div className='w-full border border-gray-500'></div>
            <form className='mt-5 flex flex-col'>
              <div className='flex flex-col gap-y-1'>
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
                  classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-20 placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121]
                    dark:border-[#595959]'
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <Editor name='description' />
                {/* <div className='my-1 mt-16 min-h-[1.25rem] text-xs font-semibold text-red-600 max-[320px]:mt-24'>
                      {errors.description?.message}
                    </div> */}
              </div>
              <div className='mt-[80px] flex w-full items-start justify-end gap-x-2'>
                <Button
                  className='rounded-lg p-2 text-xs font-semibold text-blue-600  md:text-sm'
                  type='button'
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </Button>
                <Button className='rounded-lg p-2 text-xs font-semibold text-blue-600  md:text-sm' type='submit'>
                  Tạo
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default Dropdown
