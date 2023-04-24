/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useState } from 'react'
import uploadApi, { controllerImage, controllerVideo } from 'src/api/upload.api'
import DialogCustom from 'src/components/DialogCustome'
import { useDropzone } from 'react-dropzone'
import { AiOutlineLoading, AiOutlineFileImage } from 'react-icons/ai'
import TextArea from 'src/components/TextArea'
import Button from 'src/components/Button'
import { uploadVideoSchema, uploadVideoSchemaType } from 'src/utils/rules'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IoCloseOutline } from 'react-icons/io5'
import { BiCopy } from 'react-icons/bi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ImCloudUpload } from 'react-icons/im'
import { MdOutlineSystemUpdateAlt } from 'react-icons/md'
import Editor from 'src/components/Editor'
import Dropdown from 'src/components/Dropdown'
import { useMutation, useQuery } from 'react-query'
import playListAPI from 'src/api/playlist.api'
import categoryAPI from 'src/api/category.api'
import { toast } from 'react-toastify'
import { convertBytesToMB } from 'src/utils/utils'

interface FormUploadProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  handleOpenModalPlayList: () => void
  handleCloseModalPlayList: () => void
}

type FormData = uploadVideoSchemaType
const uploadVideo = uploadVideoSchema
const FormUpload = (props: FormUploadProps) => {
  const form = useForm<FormData>({
    resolver: yupResolver(uploadVideo)
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setValue
  } = form

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
      'video/x-matroska': ['.mkv', '.MKV']
    },
    onDrop(acceptedFiles) {
      if (Number(convertBytesToMB(acceptedFiles[0].size)) > 100) {
        toast.dismiss()
        toast.error('File video của bạn vượt quá 100MB cho phép', {
          position: 'top-right',
          autoClose: 2000,
          pauseOnHover: false
        })
      }
      if (acceptedFiles.length > 0 && Number(convertBytesToMB(acceptedFiles[0].size)) < 100) {
        handleFileChange(acceptedFiles)
        setFileNameVideo(acceptedFiles[0].name)
      }
    }
  })

  const { isModalOpen, handleCloseModal, handleOpenModalPlayList } = props
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false)
  const [fileVideo, setFileVideo] = useState<File | null>(null)
  const [fileImage, setFileImage] = useState<File | null>(null)
  const imageRef = React.useRef<HTMLInputElement>(null)
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [progressVideo, setProgressVideo] = useState<number>(0)
  const [urlVideo, setUrlVideo] = useState<string>('')
  const [urlImage, setUrlImage] = useState<string>('')
  const [progressImage, setProgressImage] = useState<number>(0)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [fileNameVideo, setFileNameVideo] = useState<string>('')
  const [idImage, setIdImage] = useState<string>('')
  const [idVideo, setIdVideo] = useState<string>('')
  const [playListSelected, setPlayListSelected] = useState<string[]>([])
  const [duration, setDuration] = useState<string>('')
  const childRef = React.useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<string[]>([])

  const { data: dataPlayList } = useQuery({
    queryKey: 'playList',
    queryFn: () => playListAPI.getPlayList()
  })

  const { data: dataCategories } = useQuery({
    queryKey: 'categories',
    queryFn: () => categoryAPI.getCategories()
  })

  const handleFileChange = (files: React.SetStateAction<File | null>[]) => {
    setFileVideo(files[0])
    if (files) {
      setValue('title', files[0]?.name as string)
    }
  }

  const handleClick = () => {
    fileRef.current?.click()
  }

  const handleUploadImage = () => {
    imageRef.current?.click()
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList
    if (files.length > 0) {
      if (Number(convertBytesToMB((files[0] as File)?.size)) < 100) {
        setFileVideo(files[0])
        setFileNameVideo(files[0].name)
        setValue('title', files[0].name)
      } else {
        toast.dismiss()
        toast.error('File video của bạn vượt quá 100MB cho phép', {
          position: 'top-right',
          autoClose: 2000,
          pauseOnHover: false
        })
      }
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length === 1) {
      setFileImage(files[0])
      if (idImage) {
        handleDeleteImage()
        setUrlImage('')
        setValue('thumbnail', '')
      }
    }
  }

  const handleUploadCloud = useCallback(async () => {
    const options = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        setProgressVideo(progress)
      }
    }
    try {
      const res = await uploadApi.uploadVideo(fileVideo as File, options)
      console.log('Video:', res.data)
      setUrlVideo(res.data.url)
      setValue('video', res.data.url)
      setIdVideo(res.data.public_id)
      setDuration(res.data.duration)
      setFileVideo(null)
      setProgressVideo(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileVideo, setValue])

  const handleUploadImageCloud = useCallback(async () => {
    const options = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        setProgressImage(progress)
      }
    }
    try {
      const res = await uploadApi.uploadImage(fileImage as File, options)
      console.log('Image:', res.data)
      setValue('thumbnail', res.data.url)
      setUrlImage(res.data.url)
      setIdImage(res.data.public_id)
      setFileImage(null)
      setProgressImage(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileImage, setValue])

  const handleDeleteImage = async () => {
    try {
      const res = await uploadApi.deleteImage(idImage)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteVideo = async () => {
    try {
      const res = await uploadApi.deleteVideo(idVideo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (fileVideo !== null && urlVideo === '') {
      handleUploadCloud()
      setShowForm(true)
    }
  }, [handleUploadCloud, fileVideo, urlVideo])

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
      setCategories([...categories, e.target.value])
      setValue('category', [...categories, e.target.value])
    } else {
      setCategories(categories.filter((item) => item !== e.target.value))
      setValue(
        'category',
        categories.filter((item) => item !== e.target.value)
      )
    }
  }

  const handleCLose = () => {
    setFileVideo(null)
    setFileImage(null)
    setUrlVideo('')
    setUrlImage('')
    setShowForm(false)
    handleCloseModal()
    setProgressVideo(0)
    setProgressImage(0)
    setFileNameVideo('')
    setPlayListSelected([])
    setCategories([])
    reset()
    if (urlVideo) {
      handleDeleteVideo()
    }

    if (urlImage) {
      handleDeleteImage()
    }

    // Cancel upload
    if (controllerImage) {
      controllerImage.abort()
    }
    if (controllerVideo) {
      controllerVideo.abort()
    }
  }

  const handleCloseDropDown = () => {
    setIsOpenDropDown(false)
  }

  const handleOpenDropDown = () => {
    setIsOpenDropDown(true)
  }

  const createVideoMutation = useMutation({
    mutationFn: uploadApi.createVideo,
    onSuccess: () => {
      toast.dismiss()
      toast.success('Upload video thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      setFileVideo(null)
      setFileImage(null)
      setUrlVideo('')
      setUrlImage('')
      setShowForm(false)
      handleCloseModal()
      setProgressVideo(0)
      setProgressImage(0)
      setFileNameVideo('')
      setPlayListSelected([])
      setCategories([])
      reset()
    }
  })
  const onSubmit = handleSubmit((data) => {
    const dataUpload = {
      ...data,
      duration: duration,
      playList: playListSelected
    }
    createVideoMutation.mutate(dataUpload)
    console.log(dataUpload)
  })

  return (
    <DialogCustom
      isOpen={isModalOpen}
      handleClose={handleCLose}
      className='flex flex-col overflow-y-auto bg-white shadow dark:bg-[#282828] max-md:h-[400px] max-md:w-96 md:h-[450px] md:w-[800px] lg:h-[560px] lg:w-[1000px]'
    >
      {showForm && (
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
                      classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-16     placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121] lg:h-28
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
                    <span className='text-xs font-semibold text-[#a7a7a7] dark:text-[#9f9f9f] md:text-sm'>
                      Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. Hình thu nhỏ hấp dẫn sẽ
                      làm nổi bật video của bạn và thu hút người xem
                    </span>
                    <input
                      type='file'
                      accept='image/*'
                      {...register('thumbnail')}
                      className='hidden'
                      ref={imageRef}
                      onChange={handleChangeImage}
                    />

                    {progressImage === 0 && !urlImage && (
                      <>
                        <button
                          type='button'
                          className='mx-auto mt-2 flex h-36 w-60 flex-col items-center justify-center gap-y-3 border border-dashed'
                          onClick={handleUploadImage}
                        >
                          <AiOutlineFileImage className='h-9 w-9 text-black dark:text-white max-md:h-6 max-md:w-6' />
                          <span className='text-xs text-[#a7a7a7] dark:text-white'>Tải hình thu nhỏ lên</span>
                        </button>

                        <span className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                          {errors.thumbnail?.message}
                        </span>
                      </>
                    )}
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
                    {urlImage && (
                      <>
                        <div className='upload-image relative mx-auto  mt-2  flex  h-36 w-60  flex-col items-center justify-center '>
                          <img src={urlImage} alt='thumbnail' className='h-full w-full object-cover' />
                          <div className='absolute top-0 left-0 h-full w-full hover:bg-[#0000005e] dark:hover:bg-[#63738150]'>
                            <button
                              className='button-edit absolute top-1/2 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full opacity-0 shadow transition-all hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] '
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
                      Thêm video của bạn vào một hay nhiều danh sách phát. Các danh sách phát có thể giúp người xem
                      nhanh chóng khám phá nội dung của bạn.
                    </span>
                    <Dropdown
                      childRef={childRef}
                      isOpen={isOpenDropDown}
                      handleClose={handleCloseDropDown}
                      handleOpen={handleOpenDropDown}
                      renderData={
                        <div
                          className='absolute top-0 left-0 z-40 flex h-72 w-full flex-col items-start overflow-hidden overflow-y-auto rounded-lg bg-[#ffffff] shadow dark:bg-[#1f1f1f] max-lg:h-60 max-md:h-48'
                          ref={childRef}
                        >
                          <div className='relative w-full pb-6'>
                            {dataPlayList &&
                              dataPlayList.data.data.map((item) => (
                                <div
                                  className='my-1 flex w-full items-center gap-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                                  key={item._id}
                                >
                                  <input
                                    type='checkbox'
                                    className='h-4 w-4 accent-black dark:accent-white'
                                    id={item._id}
                                    value={item._id}
                                    checked={playListSelected.includes(item._id)}
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

                            <div className='absolute bottom-1 left-1 my-1 flex w-full items-center justify-between px-2'>
                              <button
                                className='text-xs font-semibold text-[#1569d6]'
                                type='button'
                                onClick={handleOpenModalPlayList}
                              >
                                TẠO MỚI
                              </button>
                              <button
                                className='text-xs font-semibold text-[#1569d6]'
                                type='button'
                                onClick={handleCloseDropDown}
                              >
                                XONG
                              </button>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      {playListSelected.length === 0 && <span>Chọn</span>}
                      {playListSelected.length === 1 && (
                        <span className='text-xs text-gray-900 dark:text-gray-300 md:text-sm'>
                          {' '}
                          {dataPlayList &&
                            dataPlayList.data.data.find((item) => item._id === playListSelected[0])?.title}
                        </span>
                      )}
                      {playListSelected.length > 1 && (
                        <span className='text-xs text-gray-900 dark:text-gray-300 md:text-sm'>
                          {playListSelected.length} danh sách phát
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
                      {dataCategories &&
                        dataCategories.data.data.map((item) => (
                          <div className='flex items-center' key={item._id}>
                            <input
                              type='checkbox'
                              name='categories'
                              value={item._id}
                              id={item._id}
                              checked={categories.includes(item._id)}
                              className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700'
                              onChange={handleChangeCategories}
                            />
                            <label
                              htmlFor={item._id}
                              className='ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300'
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>

                    <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                      {errors.category?.message}
                    </div>
                  </div>
                </div>

                <span className='text-xs font-semibold text-black dark:text-white  md:text-sm lg:hidden'>Video:</span>
                <div className='flex items-center justify-center lg:mt-5'>
                  <div className='min-h-72 mb-2 flex w-80 flex-col bg-[#f9f9f9] dark:bg-[#1f1f1f]'>
                    {progressVideo === 0 && !urlVideo && (
                      <>
                        <div className='flex h-full w-full flex-col '>
                          <div className='flex h-44 w-full flex-col items-center justify-center gap-y-5 border border-dashed bg-[#e9e9e9] dark:bg-[#0d0d0d] lg:w-80'>
                            <div className='animate-spin'>
                              <AiOutlineLoading className='h-6 w-6 text-black dark:text-white md:h-9 md:w-9' />
                            </div>
                            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                              Đã tải được {progressVideo + '%'}
                            </span>
                          </div>
                          <div className='flex flex-col gap-y-3 p-3'>
                            <div className='flex flex-col gap-y-1'>
                              <span className='text-xs text-black dark:text-[#858585] '>Đường liên kết của video</span>
                              <span className='text-xs  text-blue-400 '>Đang tạo đương liên kết ...</span>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-xs text-black dark:text-[#858585]'>Tên tệp</span>
                              <span className='break-words  text-xs text-black dark:text-white md:text-sm '>
                                {fileVideo?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'></div>
                      </>
                    )}
                    {progressVideo > 0 && progressVideo <= 100 && (
                      <>
                        <div className='flex h-full w-full flex-col'>
                          <div className='flex h-44 w-full flex-col items-center justify-center gap-y-5 border border-dashed bg-[#e9e9e9] dark:bg-[#0d0d0d] lg:w-80 '>
                            <div className='animate-spin'>
                              <AiOutlineLoading className='h-6 w-6 text-black dark:text-white md:h-9 md:w-9' />
                            </div>
                            <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                              Đã tải được {progressVideo + '%'}
                            </span>
                          </div>
                          <div className='flex flex-col gap-y-3 p-3'>
                            <div className='flex flex-col gap-y-1'>
                              <span className='text-xs text-black dark:text-[#858585] '>Đường liên kết của video</span>
                              <span className='text-xs  text-blue-400 '>Đang tạo đương liên kết ...</span>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-xs text-black dark:text-[#858585]'>Tên tệp</span>
                              <span className='break-words text-xs text-black dark:text-white md:text-sm '>
                                {fileVideo?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                          {errors.video?.message}
                        </div>
                      </>
                    )}
                    {urlVideo && (
                      <>
                        <div className='flex h-full w-full flex-col'>
                          <div className='flex h-full w-full flex-col items-center justify-center gap-y-5  bg-[#e9e9e9] lg:h-44 lg:w-80 '>
                            <video src={urlVideo} className='aspect-video h-full w-full' controls />
                          </div>
                          <div className='flex flex-col gap-y-3 p-3'>
                            <div className='flex flex-col gap-y-1'>
                              <span className='text-xs text-black dark:text-[#858585] '>Đường liên kết của video</span>
                              <span className='cursor-pointer  text-xs text-blue-400 line-clamp-1 md:text-sm'>
                                {urlVideo}
                              </span>
                            </div>
                            <div className='flex w-full flex-col'>
                              <div className='flex flex-wrap items-center justify-between'>
                                <div className='flex w-full items-center gap-x-1'>
                                  <span className='flex-shrink-0 text-xs text-black dark:text-[#858585]'>
                                    Tên tệp:{' '}
                                  </span>
                                  <span className='break-all text-xs text-black dark:text-white md:text-sm'>
                                    {fileNameVideo}
                                  </span>
                                </div>
                                <CopyToClipboard text={urlVideo}>
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
                        <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                          {errors.video?.message}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='mt-5 flex w-full items-center justify-end gap-x-6'>
                <Button
                  className='rounded-lg py-2 px-3 text-xs font-semibold text-blue-600 hover:bg-blue-50 md:text-sm'
                  onClick={handleCLose}
                  type='button'
                >
                  Hủy
                </Button>
                <Button
                  className='rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Upload
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}

      {!showForm && (
        <>
          <div className='flex w-full items-center justify-between border-b border-b-gray-300 pb-2'>
            <div className='text-sm font-semibold text-black dark:text-white md:text-base'>Tải video lên</div>{' '}
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'
              onClick={handleCLose}
            >
              <IoCloseOutline className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
            </button>
          </div>
          {progressVideo === 0 && (
            <>
              {' '}
              <div className='flex items-center justify-center lg:my-16'>
                <div
                  className={`flex h-32 w-full cursor-pointer items-center justify-center border border-dashed  text-center max-md:h-[250px] md:h-[300px] lg:h-72 ${
                    isDragReject ? 'border-red-500' : 'border-gray-300'
                  } `}
                  {...getRootProps()}
                >
                  <input
                    {...getInputProps()}
                    type='file'
                    accept='video/mp4,video/x-m4v,video/*'
                    {...register('video')}
                  />
                  <div className='flex flex-col items-center gap-y-4'>
                    <div className='animate-bounce text-center text-black dark:text-white'>
                      <ImCloudUpload className='h-10 w-10 text-black dark:text-white md:h-16 md:w-16' />
                    </div>

                    {isDragReject ? (
                      <span className='text-xs font-semibold text-red-600 md:text-base'>
                        Tệp không hợp lệ. Vui lòng chọn một tệp video
                      </span>
                    ) : (
                      <span className='text-xs font-semibold text-black dark:text-white md:text-base'>
                        Kéo và thả tệp video để tải lên
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <input
                type='file'
                accept='video/mp4,video/x-m4v,video/*'
                className='hidden'
                {...register('video')}
                ref={fileRef}
                onChange={handleChangeFile}
                onClick={(event) => {
                  ;(event.target as any).value = null
                }}
              />
              <Button
                className='mx-auto w-28 rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white shadow-2xl shadow-sky-300 max-lg:mt-5 md:text-sm'
                type='button'
                onClick={handleClick}
              >
                Chọn tệp
              </Button>
            </>
          )}
        </>
      )}
    </DialogCustom>
  )
}

export default FormUpload
