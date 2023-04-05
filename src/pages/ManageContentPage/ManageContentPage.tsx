import React, { useContext, useEffect, useMemo } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import ToolTip from 'src/components/ToolTip'
import { AiFillDelete } from 'react-icons/ai'
import { AppContext } from 'src/context/app.context'
import { keyBy } from 'lodash'

const data = [
  {
    _id: '1',
    title: 'Video 1',
    createdAt: '2021-10-10',
    views: 100,
    comments: 10,
    like: 20,
    thumbnail: 'https://i.pinimg.com/564x/d9/e4/eb/d9e4ebbda3af60f396b189750c8213c9.jpg'
  },
  {
    _id: '2',
    title: 'Video 1',
    createdAt: '2021-10-10',
    views: 100,
    comments: 10,
    like: 20,
    thumbnail: 'https://i.pinimg.com/564x/d9/e4/eb/d9e4ebbda3af60f396b189750c8213c9.jpg'
  },
  {
    _id: '3',
    title: 'Video 1',
    createdAt: '2021-10-10',
    views: 100,
    comments: 10,
    like: 20,
    thumbnail: 'https://i.pinimg.com/564x/d9/e4/eb/d9e4ebbda3af60f396b189750c8213c9.jpg'
  }
]
const ManageContentPage = () => {
  const { extendedVideos, setExtendedVideos } = useContext(AppContext)
  const isAllChecked = useMemo(() => extendedVideos.every((item) => item.checked), [extendedVideos])

  const checkedVideos = useMemo(() => {
    extendedVideos.filter((item) => item.checked)
  }, [extendedVideos])

  useEffect(() => {
    setExtendedVideos((prev) => {
      const extendsPurchasesObject = keyBy(prev, '_id')
      // 1: {_id: '1', title: 'Video 1', createdAt: '2021-10-10', views: 100, comments: 10, …}
      // 2: {_id: '2', title: 'Video 1', createdAt: '2021-10-10', views: 100, comments: 10, …}
      // 3: {_id: '3', title: 'Video 1', createdAt: '2021-10-10', views: 100, comments: 10, …}
      return (
        data?.map((purchase) => {
          return {
            ...purchase,
            checked: Boolean(extendsPurchasesObject[purchase._id]?.checked),
            disabled: false
          }
        }) || []
      )
    })
  }, [setExtendedVideos])

  const handleCheckAll = () => {
    setExtendedVideos((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked
      }))
    )
  }

  return (
    <>
      <div className='flex w-full flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
        <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Nội dung của kênh</span>
        <div className='overflow-auto'>
          <div className='mb-10 min-w-[710px]'>
            <table>
              <thead>
                <tr className='border-b border-t border-gray-300 text-xs md:text-sm'>
                  <th>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-black dark:accent-white max-md:h-4 max-md:w-4'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </th>
                  <th className='w-1/3 text-xs font-semibold text-black dark:text-white md:text-sm'>Video</th>
                  <th className='text-xs font-semibold text-black dark:text-white md:text-sm'>Ngày</th>
                  <th className='text-xs font-semibold text-black dark:text-white md:text-sm'>Số lượt xem</th>
                  <th className='text-xs font-semibold text-black dark:text-white md:text-sm'>Số bình luận</th>
                  <th className='text-xs font-semibold text-black dark:text-white md:text-sm'>Số lượt thích</th>
                  <th className='text-xs font-semibold text-black dark:text-white md:text-sm'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {extendedVideos.length > 0 &&
                  extendedVideos.map((item) => (
                    <tr key={item._id} className='border-b border-t border-gray-300 text-xs md:text-sm'>
                      <th>
                        {' '}
                        <input
                          type='checkbox'
                          className='h-5 w-5 rounded-sm accent-black dark:accent-white max-md:h-4 max-md:w-4'
                          checked={item.checked}
                        />
                      </th>
                      <th className='w-1/3'>
                        <div className='flex items-start gap-x-1'>
                          <div className='h-14 w-28 flex-shrink-0 rounded-sm'>
                            <img src={item.thumbnail} alt='' className='h-full w-full object-cover' />
                          </div>
                          <span
                            className='cursor-pointer text-xs text-black line-clamp-1 dark:text-white md:text-sm'
                            title=' Nhạc Lofi Chill Hot TikTok Gây Nghiện - Nhạc Chill TikTok 2022 - Nhạc Lofi Hot TikTok Mộng
                            Mơ 2022'
                          >
                            Nhạc Lofi Chill Hot TikTok Gây Nghiện - Nhạc Chill TikTok 2022 - Nhạc Lofi Hot TikTok Mộng
                            Mơ 2022
                          </span>
                        </div>
                      </th>
                      <th>
                        <span className=' text-xs text-black dark:text-white md:text-sm'>{item.createdAt}</span>
                      </th>
                      <th>
                        <span className=' text-xs text-black dark:text-white md:text-sm'>{item.views}</span>
                      </th>
                      <th>
                        <span className=' text-xs text-black dark:text-white md:text-sm'>{item.comments}</span>
                      </th>
                      <th>
                        <span className=' text-xs text-black dark:text-white md:text-sm'>{item.like}</span>
                      </th>
                      <th>
                        <div className='flex items-center justify-around'>
                          <ToolTip position='bottom' content='Chỉnh sửa'>
                            <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
                              <BiEditAlt className='h-6 w-6 text-black dark:text-white ' />
                            </button>
                          </ToolTip>

                          <ToolTip position='bottom' content='Xóa'>
                            <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
                              <AiFillDelete className='h-6 w-6 text-black dark:text-white ' />
                            </button>
                          </ToolTip>
                        </div>
                      </th>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className='border-b border-t border-gray-300 text-xs md:text-sm'>
                  <th>
                    <input
                      type='checkbox'
                      className='h-5 w-5 rounded-sm accent-black dark:accent-white max-md:h-4 max-md:w-4'
                      onClick={handleCheckAll}
                    />
                  </th>
                  <th>
                    <span className='  text-sm font-semibold text-black dark:text-white md:text-base'>
                      Chọn tất cả ({data.length})
                    </span>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className='flex items-center justify-center'>
                    <ToolTip position='bottom' content='Xóa tất cả'>
                      <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
                        <AiFillDelete className='h-6 w-6 text-black dark:text-white ' />
                      </button>
                    </ToolTip>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageContentPage
