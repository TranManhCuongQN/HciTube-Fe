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
import Skeleton from 'src/components/Skeleton'
import Dropdown from 'src/components/Dropdown'

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
    formState: { errors },
    register,
    reset,
    setValue
  } = form

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4']
    },
    onDrop(acceptedFiles) {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles)
        setFileNameVideo(acceptedFiles[0].name)
      }
    }
  })

  const { isModalOpen, handleCloseModal, handleOpenModalPlayList, handleCloseModalPlayList } = props
  const [fileVideo, setFileVideo] = useState<File | null>(null)
  const [fileImage, setFileImage] = useState<File | null>(null)
  const imageRef = React.useRef<HTMLInputElement>(null)
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [progressVideo, setProgressVideo] = useState<number>(0)
  const [urlVideo, setUrlVideo] = useState<string>('')
  const [urlImage, setUrlImage] = useState<string>('')
  const [progressImage, setProgressImage] = useState<number>(0)
  const [showForm, setShowForm] = useState<boolean>(true)
  const [fileNameVideo, setFileNameVideo] = useState<string>('')
  const [idImage, setIdImage] = useState<string>('')
  const [idVideo, setIdVideo] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [imageGetVideo, setImageGetVideo] = useState<string[]>([])

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
    const files = e.target.files
    if (files) {
      setFileVideo(files[0])
      setFileNameVideo(files[0].name)
      setValue('title', files[0].name)
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFileImage(files[0])
      handleDeleteImage()
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
      setUrlImage('')
      setValue('thumbnail', '')
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

  const handleGetImageVideo = useCallback(async () => {
    try {
      const res = await Promise.all([uploadApi.getThumbnail(idVideo, 1), uploadApi.getThumbnail(idVideo, 2)])
      const thumbnail = res.map((res) => res.data)
      thumbnail.map((item) => {
        const blob = new Blob([item], { type: 'image/jpeg' })
        const url = URL.createObjectURL(blob)
        setImageGetVideo((prev) => [...prev, url])
      })
    } catch (error) {
      console.log(error)
    }
  }, [idVideo])

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
    if (!urlImage) {
      setValue('thumbnail', imageGetVideo[0])
    }
  }, [fileImage, handleUploadImageCloud, imageGetVideo, setValue, urlImage])

  useEffect(() => {
    if (idVideo) {
      handleGetImageVideo()
    }
  }, [idVideo, handleGetImageVideo])

  const onSubmit = handleSubmit((data) => {
    const dataUpload = {
      ...data,
      duration: duration
    }
    console.log(dataUpload)
  })

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
    setImageGetVideo([])
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
                    <span className='text-xs font-semibold text-[#a7a7a7] dark:text-[#9f9f9f]'>
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
                        <div className='flex flex-wrap items-center justify-between max-lg:justify-center max-lg:gap-x-5'>
                          <button
                            type='button'
                            className='mt-2 flex h-[80px] w-[150px] flex-shrink-0 cursor-pointer flex-col items-center  justify-center gap-y-3 border border-dashed'
                            onClick={handleUploadImage}
                          >
                            <AiOutlineFileImage className='h-9 w-9 text-black dark:text-white max-md:h-6 max-md:w-6' />
                            <span className='text-xs text-[#a7a7a7] dark:text-white'>Tải hình thu nhỏ lên</span>
                          </button>
                          {imageGetVideo.length === 0 &&
                            Array(2)
                              .fill(0)
                              .map((item, index) => (
                                <div className='mt-2 h-[80px] w-[150px] flex-shrink-0' key={index}>
                                  <Skeleton className='h-full w-full' />
                                </div>
                              ))}
                          {imageGetVideo.length > 1 &&
                            imageGetVideo.map((item, index) => (
                              <div className='mt-2 h-[80px] w-[150px] flex-shrink-0' key={index}>
                                <img src={item} alt='thumbnail' className='h-full w-full object-cover' />
                              </div>
                            ))}
                        </div>
                        <span className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                          {errors.thumbnail?.message}
                        </span>
                      </>
                    )}
                    {progressImage > 0 && progressImage <= 100 && (
                      <>
                        <div className='flex flex-wrap items-center justify-between max-lg:justify-center max-lg:gap-x-5'>
                          <div className='mt-2 flex h-[80px] w-[150px] flex-col items-center justify-center gap-y-3 border border-dashed'>
                            <div className='animate-spin'>
                              <AiOutlineLoading className='h-9 w-9 text-black dark:text-white' />
                            </div>
                            <span className='text-xs text-[#a7a7a7] dark:text-white md:text-sm'>
                              Đã tải được {progressImage + '%'}
                            </span>
                          </div>
                          {imageGetVideo.length === 0 &&
                            Array(2)
                              .fill(0)
                              .map((item, index) => (
                                <div className='mt-2 h-[80px] w-[150px] flex-shrink-0' key={index}>
                                  <Skeleton className='h-full w-full' />
                                </div>
                              ))}
                          {imageGetVideo.length > 1 &&
                            imageGetVideo.map((item, index) => (
                              <div className='mt-2 h-[80px] w-[150px] flex-shrink-0' key={index}>
                                <img src={item} alt='thumbnail' className='h-full w-full object-cover' />
                              </div>
                            ))}
                        </div>
                        <div className='my-1 min-h-[1.25rem]'></div>
                      </>
                    )}
                    {urlImage && (
                      <>
                        <div className='flex flex-wrap items-center justify-between max-lg:justify-center max-lg:gap-x-5'>
                          <div className='relative mt-2 flex h-[80px] w-[150px] flex-col items-center justify-center gap-y-2'>
                            <img src={urlImage} alt='thumbnail' className='h-full w-full object-cover' />
                            <button
                              className='absolute top-1/2 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)]'
                              title='Thay đổi ảnh'
                              onClick={handleUploadImage}
                              type='button'
                            >
                              <MdOutlineSystemUpdateAlt className='h-6 w-6 font-bold text-white ' />
                            </button>
                          </div>
                          {imageGetVideo.length === 0 &&
                            Array(2)
                              .fill(0)
                              .map((item, index) => (
                                <div className='mt-2 h-[80px] w-[150px] flex-shrink-0' key={index}>
                                  <Skeleton className='h-full w-full' />
                                </div>
                              ))}
                          {imageGetVideo.length > 1 &&
                            imageGetVideo.map((item, index) => (
                              <div className='mt-2 h-[80px] w-[150px] flex-shrink-0' key={index}>
                                <img src={item} alt='thumbnail' className='h-full w-full object-cover' />
                              </div>
                            ))}
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
                    <span className='text-xs font-semibold text-[#a7a7a7] dark:text-[#9f9f9f] '>
                      Thêm video của bạn vào một hay nhiều danh sách phát. Các danh sách phát có thể giúp người xem
                      nhanh chóng khám phá nội dung của bạn.
                    </span>
                    <Dropdown
                      handleOpenModalPlayList={handleOpenModalPlayList}
                      handleCloseModalPlayList={handleCloseModalPlayList}
                    />
                    <div className='my-1 min-h-[1.25rem]'></div>
                  </div>
                </div>

                <span className='text-xs font-semibold text-black dark:text-white  md:text-sm lg:hidden'>Video:</span>
                <div className='flex items-center justify-center lg:mt-5'>
                  <div className='mb-2 flex h-72 w-80 flex-col bg-[#f9f9f9] dark:bg-[#1f1f1f]'>
                    {progressVideo === 0 && !urlVideo && (
                      <>
                        <div className='flex h-full w-full flex-col'>
                          <div className='flex h-full w-full flex-col items-center justify-center gap-y-5 border border-dashed bg-[#e9e9e9] dark:bg-[#0d0d0d] lg:h-44 lg:w-80 '>
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
                              <span className='text-xs  text-black dark:text-white md:text-sm '>{fileVideo?.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'></div>
                      </>
                    )}
                    {progressVideo > 0 && progressVideo <= 100 && !urlImage && (
                      <>
                        <div className='flex h-full w-full flex-col'>
                          <div className='flex h-full w-full flex-col items-center justify-center gap-y-5 border border-dashed bg-[#e9e9e9] dark:bg-[#0d0d0d] lg:h-44 lg:w-80 '>
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
                              <span className='text-xs  text-black dark:text-white md:text-sm '>{fileVideo?.name}</span>
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
                            <div className='flex flex-col'>
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-x-1'>
                                  <span className='text-xs text-black dark:text-[#858585]'>Tên tệp: </span>
                                  <span className='text-xs text-black dark:text-white md:text-sm '>
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
