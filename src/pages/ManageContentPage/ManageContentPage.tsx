import React, { useContext, useEffect, useMemo, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import ToolTip from 'src/components/ToolTip'
import { AiOutlineDelete } from 'react-icons/ai'
import { AppContext } from 'src/context/app.context'
import { keyBy } from 'lodash'
import FormEditContent from './components'
import { Video } from 'src/types/video.type'
import { convertNumberToDisplayString, getFormattedDate } from 'src/utils/utils'
import FormAddPlayList from '../UploadVideoPage/components/FormAddPlayList'
import { useMutation, useQuery } from 'react-query'
import videoApi from 'src/api/video.api'
import parse from 'html-react-parser'
import DialogCustom from 'src/components/DialogCustome'
import { toast } from 'react-toastify'

const ManageContentPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false)
  const { extendedVideos, setExtendedVideos } = useContext(AppContext)
  const [idVideo, setIdVideo] = useState<string[] | undefined>([''])

  const { data: dataVideo, refetch } = useQuery({
    queryKey: ['ListVideo'],
    queryFn: videoApi.getVideo
  })

  const data = dataVideo?.data.data

  // const updateInforVideoMutation = useMutation({
  //   mutationFn: (data:FormData)=> videoApi.updateInforVideo(data, idVideo as String)
  //   onSuccess: () => {
  //     // khi thành công có sẽ refetch lại api này
  //     refetch()
  //   }
  // })

  const deleteVideoMutation = useMutation({
    mutationFn: (id: string) => videoApi.deleteVideo(id)
  })
  const isAllChecked = useMemo(() => extendedVideos.every((item) => item.checked), [extendedVideos])
  const checkedVideos = useMemo(() => extendedVideos.filter((item) => item.checked), [extendedVideos])
  const checkedVideosCount = checkedVideos?.length
  const [dataEdit, setDataEdit] = useState<Video | undefined>()
  const [isOpenModalPlayList, setIsOpenModalPlayList] = useState<boolean>(false)

  useEffect(() => {
    setExtendedVideos((prev) => {
      const extendsVideosObject = keyBy(prev, '_id')
      // 1: {_id: '1', title: 'Video 1', createdAt: '2021-10-10', views: 100, comments: 10, …}
      // 2: {_id: '2', title: 'Video 1', createdAt: '2021-10-10', views: 100, comments: 10, …}
      // 3: {_id: '3', title: 'Video 1', createdAt: '2021-10-10', views: 100, comments: 10, …}

      return (
        data?.map((item) => {
          return {
            ...item,
            checked: Boolean(extendsVideosObject[item._id]?.checked),
            disabled: false
          }
        }) || []
      )
    })
  }, [setExtendedVideos, data])

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
    const VideoItem = data?.filter((item) => item._id === id) as Video[]
    setIsShowNotification(true)
    if (checkedVideosCount > 0 && videoId.length > 0) {
      setIdVideo(videoId.map((item) => item._id))
    }
    if (checkedVideosCount === 0) {
      setIdVideo(VideoItem.map((item) => item._id))
    }
  }

  const handleDeleteAll = () => {
    const videoIds = checkedVideos.map((item) => item._id)
    console.log('videos:', videoIds)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleCLoseModalPlayList = () => {
    setIsOpenModalPlayList(false)
  }

  const handleOpenModalPlayList = () => {
    setIsOpenModalPlayList(true)
  }

  const handleCloseNotification = () => {
    setIsShowNotification(false)
    setIdVideo([''])
  }

  const handleDeleteVideo = () => {
    console.log('idVideo:', idVideo)
    if (idVideo) {
      deleteVideoMutation.mutate(idVideo[0], {
        onSuccess: () => {
          setIsShowNotification(false)
          setIdVideo([''])
          toast.success('Xóa video thành công', {
            position: 'top-right',
            autoClose: 2000,
            pauseOnHover: false
          })
          refetch()
        }
      })
    }
  }

  const handleEdit = (id: string) => () => {
    const videoEdit = checkedVideos.filter((item) => item._id === id)
    const videoItem = data?.filter((item) => item._id === id) as Video[]
    console.log('video:', videoItem)
    if (checkedVideosCount > 0 && videoEdit.length > 0) {
      setIsOpenModal(true)
      setDataEdit(videoEdit[0])
      console.log('video:', videoEdit[0])
    }
    if (checkedVideosCount === 0) {
      setIsOpenModal(true)
      setDataEdit(videoItem[0])
      console.log('video:', videoItem[0])
    }
  }

  return (
    <>
      <div className='flex w-full flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
        <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Nội dung của kênh</span>
        <div className='overflow-auto'>
          <div className='my-10 min-w-[710px]'>
            <table className='w-full  '>
              <thead>
                <tr className='border-b border-t text-xs dark:border-[#363636] md:text-sm'>
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
                    <tr
                      key={item._id}
                      className='border-b border-t text-xs hover:bg-gray-200 dark:border-[#363636] dark:hover:bg-gray-800 md:text-sm'
                    >
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
                              dangerouslySetInnerHTML={{ __html: String(parse(item.description)) }}
                            ></span>
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
                          {/* {convertNumberToDisplayString(item.views)} */}
                        </span>
                      </th>
                      <th>
                        <span
                          className=' cursor-pointer text-xs text-black dark:text-white md:text-sm'
                          title={String(item.comments)}
                        >
                          {/* {convertNumberToDisplayString(item.comments)} */}
                        </span>
                      </th>
                      <th>
                        <span
                          className=' cursor-pointer text-xs text-black dark:text-white md:text-sm'
                          title={String(item.like)}
                        >
                          {/* {convertNumberToDisplayString(item.like)} */}
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
                <tr className='border-b border-t text-xs hover:bg-gray-200 dark:border-[#363636] dark:hover:bg-gray-800 md:text-sm'>
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

      {data && (
        <FormEditContent
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
          data={dataEdit}
          handleOpenModalPlayList={handleOpenModalPlayList}
          handleCloseModalPlayList={handleCLoseModalPlayList}
        />
      )}
      <FormAddPlayList showModal={isOpenModalPlayList} closeModal={handleCLoseModalPlayList} />

      <DialogCustom
        isOpen={isShowNotification}
        handleClose={() => setIsShowNotification(false)}
        className='z-50 rounded-lg bg-white shadow-md dark:bg-[#212121] md:h-[140px] md:w-[500px]'
      >
        <div className='flex w-full flex-col  p-2'>
          <span className='text-lg font-semibold text-black dark:text-white'>Bạn có muốn xóa video này không ?</span>
          <div className='flex items-center justify-end gap-x-5 md:mt-8'>
            <button
              className='flex h-8 w-20 items-center justify-center rounded-md bg-gray-200 text-black hover:bg-gray-300 dark:bg-[#363636] dark:text-white dark:hover:bg-[#2f2f2f]'
              onClick={handleCloseNotification}
            >
              Hủy
            </button>
            <button
              className='flex h-8 w-20 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600'
              onClick={handleDeleteVideo}
            >
              Xóa
            </button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default ManageContentPage
