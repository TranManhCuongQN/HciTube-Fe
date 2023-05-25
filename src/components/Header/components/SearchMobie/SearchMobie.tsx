import React, { useContext, useRef, useState } from 'react'
import { IoArrowBackOutline, IoCloseOutline } from 'react-icons/io5'
import { AiOutlineSearch } from 'react-icons/ai'
import { TfiClose } from 'react-icons/tfi'
import { AppContext } from 'src/context/app.context'
import ToolTip from 'src/components/ToolTip'
import { useQuery } from 'react-query'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from 'src/hook/useQueryConfig'
import useDebounce from 'src/hook/useDebounce'
import useOnClickOutside from 'src/hook/useOnClickOutSide'
import videoApi from 'src/api/video.api'
import { omit } from 'lodash'
import path from 'src/constants/path'
import { User } from 'src/types/user.type'
import { Video } from 'src/types/video.type'
import { MdHistory } from 'react-icons/md'
import { AiOutlineLoading } from 'react-icons/ai'

const SearchMobie = () => {
  const [focusingOnInput, setFocusingOnInput] = useState<boolean>(false)
  const { showSearchMobie, setShowSearchMobie, keyword, setKeyword } = useContext(AppContext)
  const historySearchArray = JSON.parse(localStorage.getItem('historySearch') as string)
  const [historySearch, setHistorySearch] = useState<{ id: number; keyword: string }[]>(historySearchArray || [])
  const navigate = useNavigate()
  const queryConFig = useQueryConfig()
  const inputRef = useRef<HTMLInputElement>(null)

  useOnClickOutside(inputRef, () => setFocusingOnInput(false))
  const search = useDebounce(keyword, 800)

  const {
    data: getVideo,
    isSuccess,
    isLoading
  } = useQuery({
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

  const handleClickSearch = () => {
    if (keyword === '') return
    setHistorySearch((prev) => [...prev, { id: Date.now(), keyword: keyword }])
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

  const handleClickBack = () => {
    setShowSearchMobie(false)
  }

  return (
    <>
      {showSearchMobie && (
        <div
          role='presentation'
          className='color-[#0f0f0f] container sticky top-0 left-0 z-[500] flex h-14 items-center justify-between gap-x-2 bg-[#ffffff] pl-2 pr-2 shadow drop-shadow dark:bg-[#0f0f0f] md:hidden'
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
          <div className=' relative flex h-8 w-full items-center'>
            <input
              onClick={() => setFocusingOnInput(true)}
              type='text'
              className='h-full w-full rounded-l-full border border-[#d8d8d8] px-6 text-lg text-black outline-none placeholder:text-base dark:border-[#1e1e1e] dark:bg-[#2a2a2a] dark:text-white'
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
            {focusingOnInput && (
              <TfiClose className='absolute right-14 h-8 w-8 rounded-full p-2 text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]' />
            )}
            <ToolTip position='bottom' content='Tìm kiếm'>
              <button
                className='ml-[1px] flex h-8 cursor-pointer items-center justify-center rounded-r-full border-y border-r  border-[#d8d8d8] bg-[#f8f8f8] px-4 py-1 dark:border-[#1e1e1e] dark:bg-[#222222]'
                onClick={handleClickSearch}
              >
                <AiOutlineSearch className='h-8 w-8 text-black dark:text-white' />
              </button>
            </ToolTip>
          </div>

          <div
            className={`${
              (focusingOnInput && historySearch.length > 0) ||
              (focusingOnInput && (getVideo?.data.data.users.length as number) > 0) ||
              (focusingOnInput && (getVideo?.data.data.videos.length as number) > 0)
                ? 'block'
                : 'hidden'
            } absolute right-0 left-0 top-[100%] h-fit bg-[#f8f8f8] py-4 drop-shadow-md dark:bg-[#222222]`}
            ref={inputRef}
          >
            <div className='max-h-40 overflow-y-scroll text-base font-bold text-white'>
              {historySearch.length > 0 &&
                historySearch.slice(0, 9).map((item, index) => (
                  <div
                    key={index}
                    className='flex cursor-pointer items-center justify-between px-4 py-1 lowercase text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]'
                    role='presentation'
                    onClick={() => handleSearch(item.keyword)}
                  >
                    <div className='flex items-center'>
                      <MdHistory className='mr-4 h-5 w-5 flex-shrink-0' />
                      <span className=' line-clamp-1'>{item.keyword}</span>
                    </div>

                    <IoCloseOutline
                      className='relative z-20 h-5 w-5'
                      onClick={(e) => handleDeleteKeyword(item.id, e)}
                    />
                  </div>
                ))}
              {isLoading && (
                <div className='flex h-full w-full items-center justify-center'>
                  <AiOutlineLoading className='h-7 w-7 animate-spin text-gray-500 transition-all' />
                </div>
              )}
              {isSuccess &&
                (getVideo?.data.data.users.length as number) > 0 &&
                getVideo?.data.data.users.map((item) => (
                  <div
                    role='presentation'
                    key={item._id}
                    className='flex cursor-pointer items-center justify-between px-4 py-1 lowercase text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]'
                    onClick={() => handleSearchChannel(item)}
                  >
                    <div className='flex items-center'>
                      <AiOutlineSearch className='mr-4 h-5 w-5 flex-shrink-0 ' />
                      <span className='line-clamp-1'>{item.fullName}</span>
                    </div>
                  </div>
                ))}
              {isSuccess &&
                (getVideo?.data.data.videos.length as number) > 0 &&
                getVideo?.data.data.videos.map((item) => (
                  <div
                    key={item._id}
                    role='presentation'
                    className='flex cursor-pointer items-center justify-between px-4 py-1 lowercase text-black hover:bg-[#E6E6E6] dark:text-white dark:hover:bg-[#3D3D3D]'
                    onClick={() => handleSearchVideo(item)}
                  >
                    <div className='flex items-center'>
                      <AiOutlineSearch className='mr-4 h-5 w-5 flex-shrink-0' />
                      <span className=' line-clamp-1'>{item.title}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchMobie
