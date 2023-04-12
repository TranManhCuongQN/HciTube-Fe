import React, { useState } from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import FormAddPlayList from 'src/pages/UploadVideoPage/components/FormAddPlayList'

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

interface DropDownProps {
  handleOpenModalPlayList: () => void
  handleCloseModalPlayList: () => void
}
const Dropdown = ({ handleOpenModalPlayList, handleCloseModalPlayList }: DropDownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const childRef = React.useRef<HTMLDivElement>(null)
  const [playListSelected, setPlayListSelected] = useState<string[]>([])

  useOnClickOutside(childRef, () => setIsOpen(false))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPlayListSelected([...playListSelected, e.target.value])
    } else {
      setPlayListSelected(playListSelected.filter((item) => item !== e.target.value))
    }
  }

  return (
    <>
      <div className='relative flex w-[280px] flex-col items-center rounded-lg max-sm:w-2/3'>
        <div
          className='flex w-full items-center justify-between rounded-lg border border-[#d2d2d2] bg-[#ffffff] p-3 text-xs font-bold tracking-wider text-[#b8b8b8] duration-300 active:border-black dark:border-[#575757] dark:bg-[#282828] dark:text-[#878787] dark:active:border-white md:text-sm '
          onClick={() => setIsOpen(true)}
          role='presentation'
        >
          {playListSelected.length === 0 && <span>Chọn</span>}
          {playListSelected.length === 1 && (
            <span className='text-xs text-black dark:text-white md:text-sm'> {playListSelected[0]}</span>
          )}
          {playListSelected.length > 1 && (
            <span className='text-xs text-black dark:text-white md:text-sm'>
              {playListSelected.length} danh sách phát
            </span>
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
                  checked={playListSelected.includes(item.name)}
                  onChange={handleChange}
                />
                <label className='cursor-pointer text-xs text-black dark:text-white' htmlFor={item.name}>
                  {item.name}
                </label>
              </div>
            ))}

            <div className='relative bottom-0 left-0 my-1 flex w-full items-center justify-between px-2'>
              <button className='text-xs text-[#1569d6]' type='button' onClick={handleOpenModalPlayList}>
                TẠO MỚI
              </button>
              <button className='text-xs text-[#1569d6]' type='button' onClick={handleCloseModalPlayList}>
                XONG
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dropdown
