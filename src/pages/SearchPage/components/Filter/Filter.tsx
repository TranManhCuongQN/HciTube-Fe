import { BsCheck } from 'react-icons/bs'
import { RefObject, useEffect, useState, useRef, useCallback } from 'react'
import { useQuery } from 'react-query'
import categoryAPI from 'src/api/category.api'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import useQueryConfig from 'src/hook/useQueryConfig'
import { omit } from 'lodash'

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

const Filter = () => {
  const uploadDateFilterRef = useRef<HTMLDivElement>(null)
  const typeFilterRef = useRef<HTMLDivElement>(null)
  const durationFilterRef = useRef<HTMLDivElement>(null)
  const orderFilterRef = useRef<HTMLDivElement>(null)

  const [updateFilterIndex, setUpdateFilterIndex] = useState<number>()
  const [typeFilterIndex, setTypeFilterIndex] = useState<string>()
  const [durationFilterIndex, setDurationFilterIndex] = useState<number>()
  const [orderFilterIndex, setOrderFilterIndex] = useState<number>()

  const { data: dataCategories } = useQuery({
    queryKey: 'categories',
    queryFn: () => categoryAPI.getCategories()
  })
  const queryConfig = useQueryConfig()
  const { timeRange, sortBy, duration_max, duration_min, category } = queryConfig

  const navigate = useNavigate()

  useEffect(() => {
    if (timeRange) {
      const index = uploadDateItems.findIndex((item) => item.value === timeRange)
      setUpdateFilterIndex(uploadDateItems[index].id)
    }
    if (category) {
      setTypeFilterIndex(category)
    }
    if (sortBy) {
      const index = orderItems.findIndex((item) => item.value === sortBy)
      setOrderFilterIndex(orderItems[index].id)
    }
    if (duration_max) {
      if (duration_max === '240') {
        setDurationFilterIndex(1)
      }
    }
    if (duration_min && duration_max) {
      if (duration_min === '240' && duration_max === '1200') {
        setDurationFilterIndex(2)
      }
    }
    if (duration_min) {
      if (duration_min === '1200') {
        setDurationFilterIndex(3)
      }
    }
  }, [])

  const handleClickUploadDateFilter = (value: string, id: number) => {
    if (id === updateFilterIndex) {
      setUpdateFilterIndex(undefined)
      navigate({
        pathname: path.search,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              timeRange: undefined
            },
            ['timeRange']
          )
        ).toString()
      })
    } else {
      setUpdateFilterIndex(id)
      navigate({
        pathname: path.search,
        search: createSearchParams({
          ...queryConfig,
          timeRange: value
        }).toString()
      })
    }
  }

  const handleClickTypeFilter = (value: string) => {
    if (value === typeFilterIndex) {
      setTypeFilterIndex(undefined)
      navigate({
        pathname: path.search,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              category: undefined
            },
            ['category']
          )
        ).toString()
      })
    } else {
      setTypeFilterIndex(value)
      navigate({
        pathname: path.search,
        search: createSearchParams({
          ...queryConfig,
          category: value
        }).toString()
      })
    }
  }

  const handleClickOrderFilter = (value: string, id: number) => {
    if (id === orderFilterIndex) {
      setOrderFilterIndex(undefined)
      navigate({
        pathname: path.search,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              sortBy: undefined
            },
            ['sortBy']
          )
        ).toString()
      })
    } else {
      setOrderFilterIndex(id)
      navigate({
        pathname: path.search,
        search: createSearchParams({
          ...queryConfig,
          sortBy: value
        }).toString()
      })
    }
  }

  const handleClickDurationFilter = (value: string, id: number) => {
    if (id === durationFilterIndex) {
      setDurationFilterIndex(undefined)
      navigate({
        pathname: path.search,
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              duration_max: undefined,
              duration_min: undefined
            },
            ['duration_max', 'duration_min']
          )
        ).toString()
      })
    } else {
      setDurationFilterIndex(id)
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
  }

  return (
    <>
      <div
        ref={uploadDateFilterRef}
        className='col-span-1 mb-8 flex flex-col pr-8 text-[#606060] dark:text-[#aaa]'
        id='UploadDate'
      >
        <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
          Ngày tải lên
        </h1>
        {uploadDateItems.map((item, index) => {
          return (
            <button
              key={index}
              className={`${
                updateFilterIndex == item.id ? 'filter--active ' : ''
              } ${updateFilterIndex} flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between`}
              onClick={() => handleClickUploadDateFilter(item.value, item.id)}
            >
              <span>{item.name}</span>
              <BsCheck className='filter__check text-xl transition-all duration-200 md:ml-4' />
            </button>
          )
        })}
      </div>

      <div ref={typeFilterRef} className='col-span-1 mb-8 flex flex-col pr-8 text-[#606060] dark:text-[#aaa]' id='Type'>
        <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
          Thể loại
        </h1>
        {dataCategories?.data.data.map((item, index) => {
          return (
            <button
              key={index}
              className={`${
                typeFilterIndex == item._id && 'filter--active'
              } flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between `}
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
        id='Duration'
      >
        <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
          Thời lượng
        </h1>
        {durationItems.map((item, index) => {
          return (
            <button
              key={index}
              className={`${
                durationFilterIndex == item.id && 'filter--active'
              } flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between `}
              onClick={() => handleClickDurationFilter(item.value, item.id)}
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
        id='Order'
      >
        <h1 className='my-1 border-b border-b-[rgba(0,0,0,0.1)] py-4 text-xs font-bold uppercase text-[#0f0f0f] dark:border-b-gray-600 dark:text-[#f1f1f1]'>
          Sắp xếp theo
        </h1>
        {orderItems.map((item, index) => {
          return (
            <button
              key={index}
              className={`${
                orderFilterIndex == item.id && 'filter--active'
              } flex cursor-pointer pt-4 text-sm font-semibold max-md:justify-between `}
              onClick={() => handleClickOrderFilter(item.value, item.id)}
            >
              <span>{item.name}</span>
              <BsCheck className='filter__check text-xl transition-all duration-200 md:ml-4' />
            </button>
          )
        })}
      </div>
    </>
  )
}

export default Filter
