import React, { useContext, useEffect, useMemo, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import ToolTip from 'src/components/ToolTip'
import { AiOutlineDelete } from 'react-icons/ai'
import { AppContext } from 'src/context/app.context'
import { keyBy } from 'lodash'
import FormEditContent from './components'
import { Video } from 'src/types/video.type'
import { convertNumberToDisplayString, getFormattedDate } from 'src/utils/utils'

const data = [
  {
    _id: '1',
    title: 'Rót mật ngọt vào tai em tắt ánh đèn... Bật Tình Yêu Lên | Nhạc Lofi Chill Gây Nghiện Hot Tiktok 2023',
    createdAt: '2021-10-10',
    views: 21000,
    comments: 2,
    like: 2600,
    thumbnail: 'https://i.pinimg.com/736x/f2/3e/72/f23e72bdcb8e366e5efa976cb61b3388.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    video:
      'https://res.cloudinary.com/dw254eqyp/video/upload/v1680777288/Vite_React_TS_-_Google_Chrome_2023-03-23_17-55-06_oeuce6.mp4'
  },
  {
    _id: '2',
    title: 'Thương em khi mùa thu, thương em sang mùa hạ... 4 Mùa Thương Em Lofi | Nhạc Chill Tiktok',
    createdAt: '2021-10-10',
    views: 3600,
    comments: 1,
    like: 1900,
    thumbnail: 'https://i.pinimg.com/564x/c5/b7/f9/c5b7f915a41d4c65dd385edd760db677.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    video:
      'https://res.cloudinary.com/dw254eqyp/video/upload/v1680777288/Vite_React_TS_-_Google_Chrome_2023-03-23_17-55-06_oeuce6.mp4'
  },
  {
    _id: '3',
    title: 'Hẹn Em Ở Lần Yêu Thứ 2 (Lofi Ver.) - Nguyenn x Đặng Tuấn Vũ | Anh Phải Làm Gì Để Em...| Quất Bạc Hà',
    createdAt: '2021-10-10',
    views: 26600,
    comments: 4,
    like: 1000,
    thumbnail: 'https://i.pinimg.com/736x/13/c9/fd/13c9fdc7ad29f43b2119a4ecae7d0a61.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    video:
      'https://res.cloudinary.com/dw254eqyp/video/upload/v1680777288/Vite_React_TS_-_Google_Chrome_2023-03-23_17-55-06_oeuce6.mp4'
  }
]

const ManageContentPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { extendedVideos, setExtendedVideos } = useContext(AppContext)
  const isAllChecked = useMemo(() => extendedVideos.every((item) => item.checked), [extendedVideos])
  const checkedVideos = useMemo(() => extendedVideos.filter((item) => item.checked), [extendedVideos])
  const checkedVideosCount = checkedVideos?.length
  const [dataEdit, setDataEdit] = useState<Video | undefined>()

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

  const handleCheck = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedVideos((prev) =>
      prev.map((item) => (item._id === id ? { ...item, checked: event.target.checked } : item))
    )
  }

  const handleDelete = (id: string) => () => {
    const videoId = checkedVideos.filter((item) => item._id === id)
    console.log(
      'video:',
      videoId.map((item) => item._id)
    )
  }

  const handleDeleteAll = () => {
    const videoIds = checkedVideos.map((item) => item._id)
    console.log('videos:', videoIds)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleEdit = (id: string) => () => {
    const videoEdit = checkedVideos.filter((item) => item._id === id)
    if (checkedVideosCount > 0 && videoEdit.length > 0) {
      setIsOpenModal(true)
      setDataEdit(videoEdit[0])
      console.log('video:', videoEdit[0])
    }
  }

  return (
    <>
      <div className='flex w-full flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
        <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Nội dung của kênh</span>
        <div className='overflow-auto'>
          <div className='mb-10 min-w-[710px]'>
            <table className='w-full bg-white dark:bg-[#282828]'>
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
                          onChange={handleCheck(item._id)}
                        />
                      </th>
                      <th className='w-1/3'>
                        <div className='flex items-start gap-x-1'>
                          <div className='h-16 w-28 flex-shrink-0 rounded-sm'>
                            <img src={item.thumbnail} alt='' className='h-full w-full object-cover object-top' />
                          </div>
                          <div className='flex flex-col items-start gap-y-1'>
                            <span
                              className='cursor-pointer text-xs font-semibold text-black line-clamp-1 dark:text-white md:text-sm'
                              title={item.title}
                            >
                              {item.title}
                            </span>
                            <span
                              className='cursor-pointer text-xs text-black  line-clamp-2 dark:text-white'
                              title={item.description}
                            >
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </th>
                      <th>
                        <span className=' text-xs text-black dark:text-white md:text-sm'>
                          {getFormattedDate(item.createdAt)}
                        </span>
                      </th>
                      <th>
                        <span
                          className=' cursor-pointer text-xs text-black dark:text-white md:text-sm'
                          title={String(item.views)}
                        >
                          {convertNumberToDisplayString(item.views)}
                        </span>
                      </th>
                      <th>
                        <span
                          className=' cursor-pointer text-xs text-black dark:text-white md:text-sm'
                          title={String(item.comments)}
                        >
                          {convertNumberToDisplayString(item.comments)}
                        </span>
                      </th>
                      <th>
                        <span
                          className=' cursor-pointer text-xs text-black dark:text-white md:text-sm'
                          title={String(item.like)}
                        >
                          {convertNumberToDisplayString(item.like)}
                        </span>
                      </th>
                      <th>
                        <div className='flex items-center justify-around'>
                          <ToolTip position='bottom' content='Chỉnh sửa'>
                            <button
                              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'
                              onClick={handleEdit(item._id)}
                            >
                              <BiEditAlt className='h-6 w-6 text-black dark:text-white ' />
                            </button>
                          </ToolTip>

                          <ToolTip position='bottom' content='Xóa'>
                            <button
                              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'
                              onClick={handleDelete(item._id)}
                            >
                              <AiOutlineDelete className='h-6 w-6 text-black dark:text-white ' />
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
                      onChange={handleCheckAll}
                      checked={isAllChecked}
                    />
                  </th>
                  <th>
                    <span className='  text-sm font-semibold text-black dark:text-white md:text-base'>
                      Chọn tất cả ({checkedVideosCount})
                    </span>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className='flex items-center justify-center'>
                    <ToolTip position='bottom' content='Xóa tất cả'>
                      <button
                        className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'
                        onClick={handleDeleteAll}
                      >
                        <AiOutlineDelete className='h-6 w-6 text-black dark:text-white ' />
                      </button>
                    </ToolTip>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {data && <FormEditContent isOpenModal={isOpenModal} handleCloseModal={handleCloseModal} data={dataEdit} />}
    </>
  )
}

export default ManageContentPage
