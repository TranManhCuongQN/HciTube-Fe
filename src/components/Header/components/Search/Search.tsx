import React, { useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoCloseOutline } from 'react-icons/io5'
import { TfiClose } from 'react-icons/tfi'
import { MdHistory } from 'react-icons/md'
import Voice from '../Voice'
import ToolTip from 'src/components/ToolTip'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import useQueryConfig from 'src/hook/useQueryConfig'
import { omit } from 'lodash'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import { useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import useDebounce from 'src/hook/useDebounce'
import { AppContext } from 'src/context/app.context'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'

const Search = () => {
  const [focusingOnInput, setFocusingOnInput] = useState<boolean>(false)
  const { keyword, setKeyword } = useContext(AppContext)
  const historySearchArray = JSON.parse(localStorage.getItem('historySearch') as string)
  const [historySearch, setHistorySearch] = useState<{ id: number; keyword: string; createdAt: number }[]>(
    historySearchArray || []
  )
  const inputRef = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const queryConFig = useQueryConfig()

  useOnClickOutside(inputRef, () => setFocusingOnInput(false))

  const search = useDebounce(keyword, 800)
  const { data: getVideo } = useQuery({
    queryKey: ['getVideo', search],
    queryFn: () =>
      videoApi.searchVideo(
        omit(
          {
            ...queryConFig,
            keyword: search
          },
          ['category', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList', 'favorite']
        )
      ),
    enabled: Boolean(search)
  })

  const handleKeyWord = (keyWordVoice: string) => {
    setKeyword(keyWordVoice)
    setHistorySearch((prev) => [...prev, { id: Date.now(), keyword: keyWordVoice, createdAt: new Date().getTime() }])
    localStorage.setItem('historySearch', JSON.stringify(historySearch))
    navigate({
      pathname: path.search,
      search: createSearchParams(
        omit(
          {
            ...queryConFig,
            keyword: keyWordVoice
          },
          ['category', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList', 'favorite']
        )
      ).toString()
    })
  }

  const handleClickSearch = () => {
    if (keyword === '') return
    setHistorySearch((prev) => [...prev, { id: Date.now(), keyword: keyword, createdAt: new Date().getTime() }])
    localStorage.setItem('historySearch', JSON.stringify(historySearch))
    navigate({
      pathname: path.search,
      search: createSearchParams(
        omit(
          {
            ...queryConFig,
            keyword: keyword
          },
          ['category', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList', 'favorite']
        )
      ).toString()
    })
  }

  const handleSearch = (keywordItem: string) => {
    navigate({
      pathname: path.search,
      search: createSearchParams(
        omit(
          {
            ...queryConFig,
            keyword: keywordItem
          },
          ['category', 'duration_min', 'duration_max', 'timeRange', 'sortBy', 'playList', 'favorite']
        )
      ).toString()
    })
    setKeyword(keywordItem)
    setFocusingOnInput(false)
  }

  const handleSearchChannel = (item: User) => {
    navigate(`/${item._id}/channel`)
    setFocusingOnInput(false)
  }

  const handleSearchVideo = (item: Video) => {
    navigate(`/detail/${item._id}?category=1`)
    setFocusingOnInput(false)
  }

  const handleDeleteKeyword = (idKeyword: number, e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    const deleteKeyword = historySearch.filter((item) => item.id !== idKeyword)
    setHistorySearch(deleteKeyword)
    localStorage.setItem('historySearch', JSON.stringify(historySearch))
  }

  return (
    <div className=' flex flex-grow items-center justify-center gap-x-3 max-sm:hidden'>
      <div className=' flex h-8 items-center md:w-[70%]  lg:h-10 2xl:w-[60%] '>
        <div className='relative flex h-full w-full items-center'>
          <input
            onClick={() => setFocusingOnInput(true)}
            type='text'
            className=' h-full w-full rounded-l-full border border-[#d8d8d8] px-4 text-base text-black outline-none placeholder:text-base dark:border-[#303030] dark:bg-[rgba(0,0,0,0)] dark:text-white'
            placeholder='Tìm kiếm'
            value={keyword}
            onKeyUp={(e) => {
              e.stopPropagation()
              if (!!keyword && e.key === 'Enter') {
                handleClickSearch()
              }
            }}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <TfiClose
              className='absolute right-1 h-9 w-9 cursor-pointer rounded-full p-2 text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]'
              onClick={() => setKeyword('')}
            />
          )}
          <div
            className={`${
              (focusingOnInput && historySearch.length > 0) ||
              (focusingOnInput && (getVideo?.data.data.users.length as number) > 0) ||
              (focusingOnInput && (getVideo?.data.data.videos.length as number) > 0)
                ? 'block'
                : 'hidden'
            } absolute top-[110%] h-fit w-full rounded-xl bg-[#f8f8f8] py-4 drop-shadow-md dark:bg-[#222222]`}
            ref={inputRef}
          >
            <div className='max-h-60 overflow-y-scroll text-base font-bold text-white lg:max-h-80'>
              {historySearch.length > 0 &&
                historySearch
                  .sort((a, b) => b?.createdAt - a?.createdAt)
                  .slice(0, 9)
                  .map((item, index) => (
                    <div
                      key={index}
                      className='flex cursor-pointer items-center justify-between px-4 py-1 lowercase text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]'
                      role='presentation'
                      onClick={() => handleSearch(item.keyword)}
                    >
                      <div className='flex items-center  '>
                        <MdHistory className='mr-4 h-5  w-5' />
                        <span className='flex-shrink-0 line-clamp-1'>{item.keyword}</span>
                      </div>
                      <IoCloseOutline
                        className='relative z-20 h-5 w-5'
                        onClick={(e) => handleDeleteKeyword(item.id, e)}
                      />
                    </div>
                  ))}
              {(getVideo?.data.data.users.length as number) > 0 &&
                getVideo?.data.data.users.map((item) => (
                  <div
                    role='presentation'
                    key={item._id}
                    className='flex cursor-pointer items-center justify-between px-4 py-1 lowercase text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]'
                    onClick={() => handleSearchChannel(item)}
                  >
                    <div className='flex items-center'>
                      <AiOutlineSearch className='mr-4 h-5 w-5 flex-shrink-0' />
                      <span className='line-clamp-1'>{item.fullName}</span>
                    </div>
                  </div>
                ))}
              {(getVideo?.data.data.videos.length as number) > 0 &&
                getVideo?.data.data.videos.map((item) => (
                  <div
                    key={item._id}
                    role='presentation'
                    className='flex cursor-pointer items-center justify-between px-4 py-1 lowercase text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]'
                    onClick={() => handleSearchVideo(item)}
                  >
                    <div className='flex items-center'>
                      <AiOutlineSearch className='mr-4 h-5 w-5 flex-shrink-0' />
                      <span className='line-clamp-1'>{item.title}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
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
