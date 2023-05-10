import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoArrowBackOutline, IoCloseOutline } from 'react-icons/io5'
import { AiOutlineSearch } from 'react-icons/ai'
import { AppContext } from 'src/context/app.context'
import ToolTip from 'src/components/ToolTip'

const SearchMobie = () => {
  const searchingHistory = ['keshi', 'grey D', 'chillies', 'MAROON 5']
  const [focusingOnInput ,setFocusingOnInput] = useState<boolean>(false);
  const { showSearchMobie, setShowSearchMobie } = useContext(AppContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickBack = () => {
    setShowSearchMobie(false)
  }

  useEffect(() => {
    if (showSearchMobie) {
      inputRef.current?.focus()
    }
  }, [showSearchMobie])

  return (
    <>
      {showSearchMobie && (
        <div
          role='presentation'
          className='color-[#0f0f0f] container sticky top-0 left-0 z-40 flex h-14 items-center justify-between gap-x-2 bg-[#ffffff] pl-2 pr-2 shadow drop-shadow dark:bg-[#0f0f0f] md:hidden'
        >
          <ToolTip position='bottom' content='Quay lại'>
            {' '}
            <button
              className=' flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10  '
              onClick={handleClickBack}
            >
              <IoArrowBackOutline className='h-6 w-6 text-black dark:text-white lg:h-6 lg:w-6' />
            </button>
          </ToolTip>

          {/* //* Input search */}
          <div className=' flex h-8 w-full items-center'>
            <div className=''>
              <input
                onFocus={() => setFocusingOnInput(true)}
                onBlur={() => setFocusingOnInput(false)}
                type='text'
                className='h-full w-full rounded-l-full border border-[#d8d8d8] px-6 text-lg text-black outline-none placeholder:text-base dark:border-[#1e1e1e] dark:bg-[#2a2a2a] dark:text-white'
                placeholder='Tìm kiếm'
                ref={inputRef}
              />
              
            </div>
            <ToolTip position='bottom' content='Tìm kiếm'>
              <button className='ml-[1px] flex h-8 cursor-pointer items-center justify-center rounded-r-full bg-[#f8f8f8] px-4  py-1 dark:bg-[#222222] md:border-y md:border-r md:border-[#d8d8d8]'>
                <AiOutlineSearch className='h-8 w-8 text-black dark:text-white' />
              </button>
            </ToolTip>
          </div>

          <div className={`${focusingOnInput ? 'block' : 'hidden'} absolute right-0 left-0 h-fit top-[100%] bg-[#f8f8f8] dark:bg-[#222222] py-4 drop-shadow-md`}>
            <ul className="text-white text-base font-bold">
              {
                searchingHistory.map((item, index) => (
                  <li key={index} className="flex items-center cursor-pointer justify-between lowercase px-4 py-1 text-black dark:text-white hover:bg-[#E6E6E6] dark:hover:bg-[#3D3D3D]">
                    <div className="flex items-center">
                      <AiOutlineSearch className='h-5 w-5  mr-4' />
                      {item}
                    </div>

                    <IoCloseOutline className="h-5 w-5"/>
                  </li>
                ))
              }
                    
            </ul>
          </div>

        </div>
      )}
    </>
  )
}

export default SearchMobie
