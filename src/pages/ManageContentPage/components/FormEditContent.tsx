/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import DialogCustom from 'src/components/DialogCustome'
import { uploadVideoSchema, uploadVideoSchemaType } from 'src/utils/rules'
import { AiOutlineLoading } from 'react-icons/ai'
import uploadApi, { controllerImage } from 'src/api/upload.api'
import TextArea from 'src/components/TextArea'
import Button from 'src/components/Button'
import { Video } from 'src/types/video.type'
import CopyToClipboard from 'react-copy-to-clipboard'
import { BiCopy } from 'react-icons/bi'
import { MdOutlineSystemUpdateAlt } from 'react-icons/md'
import Editor from 'src/components/Editor'
import Dropdown from 'src/components/Dropdown'
import parse from 'html-react-parser'
import playListAPI from 'src/api/playlist.api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import categoryAPI from 'src/api/category.api'
import { getPublicId } from 'src/utils/utils'
import videoApi from 'src/api/video.api'
import { toast } from 'react-toastify'

interface FormEditContentProps {
  isOpenModal: boolean
  handleCloseModal: () => void
  data?: Video
  handleOpenModalPlayList: () => void
  handleCloseModalPlayList: () => void
}

type FormData = uploadVideoSchemaType
const uploadVideo = uploadVideoSchema
const FormEditContent = (props: FormEditContentProps) => {
  const { isOpenModal, handleCloseModal, data, handleOpenModalPlayList } = props
  const { data: dataPlayList } = useQuery({
    queryKey: 'playList',
    queryFn: () => playListAPI.getPlayList()
  })

  const { data: dataCategories } = useQuery({
    queryKey: 'categories',
    queryFn: () => categoryAPI.getCategories()
  })
  const form = useForm<FormData>({
    resolver: yupResolver(uploadVideo)
  })
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset
  } = form
  const [fileImage, setFileImage] = useState<File | null>(null)
  const imageRef = React.useRef<HTMLInputElement>(null)
  const [urlImage, setUrlImage] = useState<string>('')
  const [progressImage, setProgressImage] = useState<number>(0)
  const [idImage, setIdImage] = useState<string>('')
  const childRef = useRef<HTMLDivElement>(null)
  const [playListSelected, setPlayListSelected] = useState<string[]>([])
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([])
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const editVideoMutation = useMutation({
    mutationFn: (dataUpdate: FormData) => videoApi.updateInforVideo(dataUpdate, data?._id as string),
    onSuccess: () => {
      toast.dismiss()
      toast.success('Cập nhật thông tin video thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      handleCloseModal()
      setUrlImage('')
      setFileImage(null)
      setProgressImage(0)
      setPlayListSelected([])
      setCategoriesSelected([])
      reset()
      queryClient.invalidateQueries('videoList')
    }
  })

  const handleUploadImage = () => {
    imageRef.current?.click()
  }

  const handleCloseDropDown = () => {
    setIsOpenDropDown(false)
  }

  const handleOpenDropDown = () => {
    setIsOpenDropDown(true)
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length === 1) {
      setFileImage(files[0])
      if (idImage) {
        handleDeleteImage(idImage)
        setUrlImage('')
        setValue('thumbnail', '')
      }
    }
  }

  const handleDeleteImage = async (idImage: string) => {
    try {
      const res = await uploadApi.deleteImage(idImage)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUploadImageCloud = useCallback(async () => {
    const options = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        setProgressImage(progress)
      }
    }
    try {
      const res = await uploadApi.uploadImage(fileImage as File, options)

      setUrlImage(res.data.url)
      setIdImage(res.data.public_id)
      setValue('thumbnail', res.data.url)
      setFileImage(null)
      setProgressImage(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileImage, setValue])

  useEffect(() => {
    if (fileImage !== null && fileImage !== undefined) {
      handleUploadImageCloud()
    }
  }, [fileImage, handleUploadImageCloud])

  const handleChangeSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPlayListSelected([...playListSelected, e.target.value])
    } else {
      setPlayListSelected(playListSelected.filter((item) => item !== e.target.value))
    }
  }

  const handleChangeCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCategoriesSelected([...categoriesSelected, e.target.value])
      setValue('category', [...categoriesSelected, e.target.value])
    } else {
      setCategoriesSelected(categoriesSelected.filter((item) => item !== e.target.value))
      setValue(
        'category',
        categoriesSelected.filter((item) => item !== e.target.value)
      )
    }
  }

  const onSubmit = handleSubmit((value) => {
    const dataEdit = {
      ...value,
      playList: playListSelected
    }

    editVideoMutation.mutate(dataEdit)
  })

  useEffect(() => {
    if (data) {
      setValue('title', data?.title as string)
      setValue('description', String(parse(data.description as string)))

      setValue('thumbnail', data?.thumbnail as string)
      setIdImage(getPublicId(data?.thumbnail as string) as string)

      setValue('video', data.video as string)

      setPlayListSelected(data.playList as string[])
      setValue('category', data.category as string[])
      setCategoriesSelected(data.category as string[])
    }
  }, [data, isOpenModal, setValue])

  const handleClose = () => {
    handleCloseModal()
    setUrlImage('')
    setFileImage(null)
    setProgressImage(0)
    setPlayListSelected([])
    setCategoriesSelected([])
    reset()

    // Cancel API
    if (controllerImage) {
      controllerImage.abort()
    }

    if (idImage) {
      handleDeleteImage(idImage)
      setIdImage('')
    }
  }

  return (
    <DialogCustom
      isOpen={isOpenModal}
      handleClose={handleClose}
      className='flex flex-col overflow-y-auto bg-white shadow dark:bg-[#282828] max-md:h-80 max-md:w-96 md:h-[450px] md:w-[800px] lg:h-[560px] lg:w-[1000px]'
    >
      <>
        <div className='border-b border-b-gray-300 pb-2 text-sm font-semibold text-black dark:text-white lg:text-lg'>
          Chi tiết
        </div>{' '}
        <FormProvider {...form}>
          <form className='mt-5 flex flex-col lg:gap-y-2' onSubmit={onSubmit}>
            <div className='lg:flex lg:items-start lg:justify-between '>
              <div className='flex flex-shrink-0 flex-col lg:w-[500px]'>
                <div className='flex flex-col gap-y-1'>
                  <label
                    htmlFor='title'
                    className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                  >
                    Tiêu đề:
                  </label>
                  <TextArea
                    name='title'
                    id='title'
                    placeholder='Tiêu đề'
                    register={register}
                    errorMessage={errors.title?.message}
                    classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-16 placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121] lg:h-28
                    dark:border-[#595959]'
                  />
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Editor name='description' />
                  <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                    {errors.description?.message}
                  </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <label
                    htmlFor='thumbnail'
                    className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                  >
                    Hình thu nhỏ:
                  </label>
                  <span className='text-xs text-[#a7a7a7] dark:text-white md:text-sm'>
                    Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. Hình thu nhỏ hấp dẫn sẽ làm
                    nổi bật video của bạn và thu hút người xem
                  </span>
                  <input
                    type='file'
                    accept='image/*'
                    {...register('thumbnail')}
                    className='hidden'
                    ref={imageRef}
                    onChange={handleChangeImage}
                  />

                  {progressImage > 0 && progressImage <= 100 && (
                    <>
                      <div className='mx-auto mt-2 flex h-36 w-60 flex-col items-center justify-center gap-y-3 border border-dashed'>
                        <div className='animate-spin'>
                          <AiOutlineLoading className='h-9 w-9 text-black dark:text-white max-md:h-6 max-md:w-6' />
                        </div>
                        <span className='text-xs text-[#a7a7a7] dark:text-white md:text-sm'>
                          Đã tải được {progressImage + '%'}
                        </span>
                      </div>
                      <div className='my-1 min-h-[1.25rem]'></div>
                    </>
                  )}

                  {progressImage === 0 && (
                    <>
                      <div className='upload-image relative mx-auto mt-2 flex h-36 w-60 flex-col items-center justify-center gap-y-2 '>
                        <img src={urlImage || data?.thumbnail} alt='' className='h-full w-full object-cover' />
                        <div className='absolute top-0 left-0 h-full w-full hover:bg-[#0000005e] dark:hover:bg-[#63738150]'>
                          <button
                            className='button-edit absolute top-1/2 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)]'
                            title='Thay đổi ảnh'
                            onClick={handleUploadImage}
                            type='button'
                          >
                            <MdOutlineSystemUpdateAlt className='h-6 w-6 font-bold text-white ' />
                          </button>
                        </div>
                      </div>
                      <div className='my-1 min-h-[1.25rem]'></div>
                    </>
                  )}
                </div>
                <div className='flex flex-col gap-y-2'>
                  <label
                    htmlFor='playlist'
                    className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                  >
                    Danh sách phát:
                  </label>
                  <span className='text-xs font-semibold text-[#a7a7a7] dark:text-[#9f9f9f] md:text-sm '>
                    Thêm video của bạn vào một hay nhiều danh sách phát. Các danh sách phát có thể giúp người xem nhanh
                    chóng khám phá nội dung của bạn.
                  </span>
                  <Dropdown
                    childRef={childRef}
                    isOpen={isOpenDropDown}
                    handleClose={handleCloseDropDown}
                    handleOpen={handleOpenDropDown}
                    renderData={
                      <div
                        className='absolute top-0 left-0 z-40 flex h-40 w-full flex-col items-start overflow-hidden overflow-y-auto rounded-lg bg-[#ffffff] shadow dark:bg-[#1f1f1f]'
                        ref={childRef}
                      >
                        {dataPlayList?.data.data.map((item) => (
                          <div
                            className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                            key={item._id}
                          >
                            <input
                              type='checkbox'
                              className='h-4 w-4 accent-black dark:accent-white'
                              id={item._id}
                              value={item._id}
                              checked={playListSelected?.includes(item._id)}
                              onChange={handleChangeSelected}
                            />
                            <label
                              className='cursor-pointer text-xs text-gray-900 dark:text-gray-300'
                              htmlFor={item._id}
                            >
                              {item.title}
                            </label>
                          </div>
                        ))}

                        <div className='relative bottom-0 left-0 my-1 flex w-full items-center justify-between px-2'>
                          <button className='text-xs text-[#1569d6]' type='button' onClick={handleOpenModalPlayList}>
                            TẠO MỚI
                          </button>
                          <button className='text-xs text-[#1569d6]' type='button' onClick={handleCloseDropDown}>
                            XONG
                          </button>
                        </div>
                      </div>
                    }
                  >
                    {playListSelected?.length === 0 && <span>Chọn</span>}
                    {playListSelected?.length === 1 && (
                      <span className='text-xs text-gray-900 dark:text-gray-300 md:text-sm'>
                        {' '}
                        {dataPlayList && dataPlayList.data.data.find((item) => item._id === playListSelected[0])?.title}
                      </span>
                    )}
                    {playListSelected?.length > 1 && (
                      <span className='text-xs text-gray-900 dark:text-gray-300 md:text-sm'>
                        {playListSelected?.length} danh sách phát
                      </span>
                    )}
                  </Dropdown>
                  <div className='my-1 min-h-[1.25rem]'></div>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <label
                    htmlFor='categories'
                    className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                  >
                    Thể loại:
                  </label>

                  <div className='flex w-full flex-wrap gap-x-6 gap-y-5'>
                    {dataCategories?.data.data.map((item) => {
                      return (
                        <div className='flex items-center' key={item._id}>
                          <input
                            type='checkbox'
                            name='categories'
                            value={item._id}
                            id={item._id}
                            checked={categoriesSelected.includes(item._id)}
                            className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700'
                            onChange={handleChangeCategories}
                          />
                          <label
                            htmlFor={item._id}
                            className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                          >
                            {item.name}
                          </label>
                        </div>
                      )
                    })}
                  </div>

                  <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                    {errors.category?.message}
                  </div>
                </div>
              </div>

              <span className='text-xs font-semibold text-black dark:text-white  md:text-sm lg:hidden'>Video:</span>
              <div className='flex items-center justify-center max-md:mt-2 lg:mt-5'>
                <div className='mb-2 flex h-72 w-80 flex-col bg-[#f9f9f9] dark:bg-[#1f1f1f]'>
                  <div className='flex h-full w-full flex-col'>
                    <div className='flex h-full w-full flex-col items-center justify-center gap-y-5 bg-[#e9e9e9] lg:h-44 lg:w-80 '>
                      <video src={data?.video} className='aspect-video h-full w-full' controls />
                    </div>
                    <div className='flex flex-col gap-y-3 p-3'>
                      <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-black dark:text-[#858585] '>Đường liên kết của video</span>
                        <span className='cursor-pointer  text-xs text-blue-400 line-clamp-1 md:text-sm'>
                          {data?.video}
                        </span>
                      </div>
                      <div className='flex flex-col'>
                        <CopyToClipboard text={data?.video as string}>
                          <span
                            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'
                            title='copy link'
                          >
                            <BiCopy className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
                          </span>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-5 flex w-full items-center justify-end gap-x-6'>
              <Button
                className='rounded-lg py-2 px-3 text-xs font-semibold text-blue-600 hover:bg-blue-50 md:text-sm'
                onClick={handleClose}
                type='button'
              >
                Hủy
              </Button>
              <Button
                className='rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
                type='submit'
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Upload
              </Button>
            </div>
          </form>
        </FormProvider>
      </>
    </DialogCustom>
  )
}

export default FormEditContent
