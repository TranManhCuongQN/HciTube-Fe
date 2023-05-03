import AsideBar from '../HomePage/components/AsideBar'
import VideoItem from './components/VideoItem/'

import Lauv from 'src/assets/Lauv.mp4'
import {GiSettingsKnobs} from 'react-icons/gi'
import {BsCheck} from 'react-icons/bs'
import { RefObject, useEffect, useState, useRef, useCallback } from 'react'
import { Ref } from 'react-hook-form'
import {GrClose} from 'react-icons/gr'
import Filter from './components/Filter'

const SearchPage = () => {
  const filterRef = useRef<HTMLDivElement>(null);

import { GiSettingsKnobs } from 'react-icons/gi'
import { BsCheck } from 'react-icons/bs'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import useQueryConfig from 'src/hook/useQueryConfig'
import videoApi from 'src/api/video.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import categoryAPI from 'src/api/category.api'

const uploadDateItems = [
  {
    id: 1,
    name: 'Hôm nay',
    value: 'today'
  },
  {
    id: 2,
    name: 'Tuần này',
    value: 'thisWeek'
  },
  {
    id: 3,
    name: 'Tháng này',
    value: 'thisMonth'
  },
  {
    id: 4,
    name: 'Năm này',
    value: 'thisYear'
  }
]
const durationItems = [
  {
    id: 1,
    name: 'Dưới 4 phút',
    value: '4 minutes'
  },
  {
    id: 2,
    name: '4 - 20 phút',
    value: '4-20 minutes'
  },
  {
    id: 3,
    name: 'Trên 20 phút',
    value: '20 minutes'
  }
]
const orderItems = [
  {
    id: 1,
    name: 'Ngày tải lên',
    value: 'createdAt'
  },
  {
    id: 2,
    name: 'Lượt xem',
    value: 'view'
  }
]

const SearchPage = () => {
  const filterRef = useRef<HTMLDivElement>(null)
  const uploadDateFilterRef = useRef<HTMLDivElement>(null)
  const typeFilterRef = useRef<HTMLDivElement>(null)
  const durationFilterRef = useRef<HTMLDivElement>(null)
  const orderFilterRef = useRef<HTMLDivElement>(null)
  const queryConfig = useQueryConfig()

  const { data: getVideo } = useQuery({
    queryKey: ['getVideo', queryConfig],
    queryFn: () => videoApi.searchVideo(queryConfig)
  })

  const { data: dataCategories } = useQuery({
    queryKey: 'categories',
    queryFn: () => categoryAPI.getCategories()
  })

  const { timeRange, sortBy, duration_max, duration_min, category } = queryConfig

  const navigate = useNavigate()
  const handleClickUploadDateFilter = (value: string) => {
    navigate({
      pathname: path.search,
      search: createSearchParams({
        ...queryConfig,
        timeRange: value
      }).toString()
    })
  }

  const handleClickTypeFilter = (value: string) => {
    navigate({
      pathname: path.search,
      search: createSearchParams({
        ...queryConfig,
        category: value
      }).toString()
    })
  }

  const handleClickOrderFilter = (value: string) => {
    navigate({
      pathname: path.search,
      search: createSearchParams({
        ...queryConfig,
        sortBy: value
      }).toString()
    })
  }

  const handleClickDurationFilter = (value: string) => {
    if (value === '4 minutes') {
      navigate({
        pathname: path.search,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              duration_max: '240'
            },
            ['duration_min']
          )
        ).toString()
      })
    } else if (value === '4-20 minutes') {
      navigate({
        pathname: path.search,
        search: createSearchParams({
          ...queryConfig,
          duration_min: '240',
          duration_max: '1200'
        }).toString()
      })
    } else if (value === '20 minutes') {
      navigate({
        pathname: path.search,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              duration_min: '1200'
            },
            ['duration_max']
          )
        ).toString()
      })
    }
  }

  const handleClickFilterBtn = () => {
    if (filterRef.current) {
      filterRef.current.classList.toggle('active-grid')
    }
  }

  const handleClickFilterNode = (ref: RefObject<HTMLDivElement>, clickedFilterIndex: number) => {
    if (ref.current) {
      ref.current.querySelectorAll('button').forEach((element, index) => {
        if (index !== clickedFilterIndex) {
          element.classList.remove('filter--active')
        } else {
          ref.current?.children[clickedFilterIndex + 1].classList.add('filter--active')
        }
      })
    }
  }

  useEffect(() => {
    if (timeRange === 'today') {
      if (uploadDateFilterRef.current) {
        uploadDateFilterRef.current.children[0].classList.add('filter--active')
      }
    } else if (timeRange === 'thisWeek') {
      if (uploadDateFilterRef.current) {
        uploadDateFilterRef.current.children[1].classList.add('filter--active')
      }
    } else if (timeRange === 'thisMonth') {
      if (uploadDateFilterRef.current) {
        uploadDateFilterRef.current.children[2].classList.add('filter--active')
      }
    } else if (timeRange === 'thisYear') {
      if (uploadDateFilterRef.current) {
        uploadDateFilterRef.current.children[3].classList.add('filter--active')
      }
    }
  }, [])

  useEffect(() => {
    if (sortBy === 'createdAt') {
      if (orderFilterRef.current) {
        orderFilterRef.current.children[0].classList.add('filter--active')
      }
    } else if (sortBy === 'view') {
      if (orderFilterRef.current) {
        orderFilterRef.current.children[1].classList.add('filter--active')
      }
    }
  }, [])

  useEffect(() => {
    if (duration_min === '240' && duration_max === '1200') {
      if (durationFilterRef.current) {
        durationFilterRef.current.children[1].classList.add('filter--active')
      }
    } else if (duration_min === '1200') {
      if (durationFilterRef.current) {
        durationFilterRef.current.children[2].classList.add('filter--active')
      }
    } else if (duration_max === '240') {
      if (durationFilterRef.current) {
        durationFilterRef.current.children[0].classList.add('filter--active')
      }
    }
  }, [])

  return (
    <div className='container flex gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
      <AsideBar />
      <div className='mb-16 flex min-h-screen w-full flex-col 2xl:pl-64'>

        <div className="flex flex-col items-center justify-center w-full h-full md:px-3 lg:px-6 lg:py-4">
          <div className="lg:grid lg:grid-cols-1 w-full max-w-[1096px] h-full">
            <div className="flex flex-col lg:col-span-1">
              <div className="max-lg:ml-3 border-b border-[rgba(0, 0, 0, 0.1)] dark:border-gray-600 py-2">
                <button onClick={handleClickFilterBtn} className="flex items-center hover:bg-[#f2f2f2] px-4 py-2 rounded-full dark:hover:bg-[#272727]">
                  <GiSettingsKnobs className="text-black dark:text-white rotate-90 mr-2 w-5 h-5"/>
                  <span className="font-semibold text-black line-clamp-2 dark:text-white sm:text-sm md:font-bold lg:text-base">
                    Bộ lọc
                  </span>
                </button>
            
                <div ref={filterRef} className="hidden grid-cols-1 md:grid-cols-4 pl-4">
                  <Filter/>

        <div className='flex h-full w-full flex-col justify-center md:px-3 lg:px-6 lg:py-4'>
          <div className='h-full w-full max-w-[1280px] lg:grid lg:grid-cols-3'>
            <div className='flex flex-col lg:col-span-2'>
              <div className='border-[rgba(0, 0, 0, 0.1)] border-b py-2 dark:border-gray-600 max-lg:ml-3'>
                <button
                  onClick={handleClickFilterBtn}
                  className='flex items-center rounded-full px-4 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
                >
                  <GiSettingsKnobs className='mr-2 h-5 w-5 rotate-90 text-black dark:text-white' />
                  <span className='font-semibold text-black line-clamp-2 dark:text-white sm:text-sm md:font-bold lg:text-base'>
                    Bộ lọc
                  </span>
                </button>

                <div ref={filterRef} className='hidden grid-cols-1 pl-4 md:grid-cols-4'>
                  <div
                    ref={uploadDateFilterRef}
                    className='col-span-1 mb-8 flex flex-col pr-8 text-[#606060] dark:text-[#aaa]'
                  >
                    <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
                      Ngày tải lên
                    </h1>
                    {uploadDateItems.map((item, index) => {
                      return (
                        <button
                          className='flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between '
                          key={index}
                          onClick={() => handleClickUploadDateFilter(item.value)}
                        >
                          <span>{item.name}</span>
                          <BsCheck className='filter__check text-xl transition-all duration-200 md:ml-4' />
                        </button>
                      )
                    })}
                  </div>

                  <div
                    ref={typeFilterRef}
                    className='col-span-1 mb-8 flex flex-col pr-8 text-[#606060] dark:text-[#aaa]'
                  >
                    <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
                      Thể loại
                    </h1>
                    {dataCategories?.data.data.map((item, index) => {
                      return (
                        <button
                          className='flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between '
                          key={index}
                          onClick={() => handleClickTypeFilter(item._id)}
                        >
                          <span>{item.name}</span>
                          <BsCheck className='filter__check text-xl transition-all duration-200 md:ml-4' />
                        </button>
                      )
                    })}
                  </div>

                  <div
                    ref={durationFilterRef}
                    className='col-span-1 mb-8 flex flex-col pr-8 text-[#606060] dark:text-[#aaa]'
                  >
                    <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
                      Thời lượng
                    </h1>
                    {durationItems.map((item, index) => {
                      return (
                        <button
                          className='flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between '
                          key={index}
                          onClick={() => handleClickDurationFilter(item.value)}
                        >
                          <span>{item.name}</span>
                          <BsCheck className='filter__check text-xl transition-all duration-200 md:ml-4' />
                        </button>
                      )
                    })}
                  </div>

                  <div
                    ref={orderFilterRef}
                    className='col-span-1 mb-8 flex flex-col pr-8 text-[#606060] dark:text-[#aaa]'
                  >
                    <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
                      Sắp xếp theo
                    </h1>
                    {orderItems.map((item, index) => {
                      return (
                        <button
                          className='flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between '
                          key={index}
                          onClick={() => handleClickOrderFilter(item.value)}
                        >
                          <span>{item.name}</span>
                          <BsCheck className='filter__check text-xl transition-all duration-200 md:ml-4' />
                        </button>
                      )
                    })}
                  </div>

                </div>
              </div>

              {/* //* subscriber */}
              {/* <div className='border-[rgba(0, 0, 0, 0.1)] flex w-full cursor-pointer items-center border-b py-4 dark:border-gray-600 max-lg:px-3'>
                <div className='mr-3 flex w-[120px] md:w-[200px] lg:w-[360px] lg:justify-center '>
                  <img
                    src='https://yt3.googleusercontent.com/9DTziUXmosxUCZUqErlwiIBfPOCcDSm6sU1scc7rkCWUJW7kvu6rTjOx5SiR3Ze4E2V0oE4OCg=s176-c-k-c0x00ffffff-no-rj-mo'
                    alt=''
                    className='h-24 w-24 rounded-full md:h-[8.5rem] md:w-[8.5rem]'
                  />
                </div>
                <div className='flex flex-1 flex-row items-center justify-between gap-y-3 md:flex-col md:items-start lg:flex-row lg:items-center'>
                  <div className='flex flex-col'>
                    <span className='mb-2 text-lg font-medium dark:text-[#f1f1f1]'>Charlie Puth</span>
                    <span className='hidden text-xs font-normal dark:text-[#aaa] md:block'>
                      @charlieputh - 21,9 Tr người đăng ký
                    </span>
                    <span className='text-xs font-normal dark:text-[#aaa] md:hidden'>@charlieputh</span>
                    <span className='text-xs font-normal dark:text-[#aaa] md:hidden'>21,9 Tr người đăng ký</span>
                  </div>
                  <button className=' h-fit rounded-full bg-black px-4 py-2 text-sm font-bold text-white hover:bg-[#4d4d4d] dark:bg-white  dark:text-black dark:hover:bg-[#E5E5E5]'>
                    Đăng ký
                  </button>
                </div>
              </div> */}

              <div>
                {(getVideo?.data.data.length as number) > 0 &&
                  getVideo?.data.data.map((item) => <VideoItem key={item._id} data={item} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
