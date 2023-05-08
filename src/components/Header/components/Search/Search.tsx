import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Voice from '../Voice'
import ToolTip from 'src/components/ToolTip'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import useQueryConfig from 'src/hook/useQueryConfig'
import { omit } from 'lodash'

const Search = () => {
  const [keyword, setKeyword] = useState<string>('')

  const handleKeyWord = (keyWordVoice: string) => {
    setKeyword(keyWordVoice)
    navigate({
      pathname: path.search,
      search: createSearchParams(
        omit(
          {
            ...queryConFig,
            keyword: keyWordVoice
          },
          ['category', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList']
        )
      ).toString()
    })
  }

  const navigate = useNavigate()
  const queryConFig = useQueryConfig()
  const handleClickSearch = () => {
    navigate({
      pathname: path.search,
      search: createSearchParams(
        omit(
          {
            ...queryConFig,
            keyword: keyword
          },
          ['category', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList']
        )
      ).toString()
    })
  }
  return (
    <div className='flex flex-grow items-center justify-center gap-x-3 max-sm:hidden'>
      <div className=' flex h-8 items-center md:w-[70%]  lg:h-10 2xl:w-[60%] '>
        <input
          type='text'
          className='h-full w-full rounded-l-full border border-[#d8d8d8] px-4 text-base text-black outline-none placeholder:text-base dark:border-[#303030] dark:bg-[rgba(0,0,0,0)] dark:text-white'
          placeholder='Tìm kiếm'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <ToolTip position='bottom' content='Tìm kiếm'>
          <button
            className='flex h-8 cursor-pointer items-center justify-center rounded-r-full border-y border-r border-[#d8d8d8]  bg-[#f8f8f8] px-4 py-1 dark:border-[#303030] dark:bg-[#222222] lg:h-10'
            onClick={handleClickSearch}
          >
            <AiOutlineSearch className='h-8 w-8 text-black dark:text-white' />
          </button>
        </ToolTip>
      </div>
      <Voice handleKeyWord={handleKeyWord} />
    </div>
  )
}

export default Search
