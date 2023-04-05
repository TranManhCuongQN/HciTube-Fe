/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useState } from 'react'
import uploadApi from 'src/api/upload.api'
import DialogCustom from 'src/components/DialogCustome'
import { useDropzone } from 'react-dropzone'
import { GrUploadOption } from 'react-icons/gr'
import { AiOutlineLoading, AiOutlineFileImage } from 'react-icons/ai'
import TextArea from 'src/components/TextArea'
import Button from 'src/components/Button'
import { uploadVideoSchema, uploadVideoSchemaType } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormUploadProps {
  isModalOpen: boolean
  handleCloseModal: () => void
}

type FormData = uploadVideoSchemaType
const uploadVideo = uploadVideoSchema
const FormUpload = (props: FormUploadProps) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm<FormData>({
    resolver: yupResolver(uploadVideo)
  })

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4']
    },
    onDrop(acceptedFiles) {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles)
      }
    }
  })

  const { isModalOpen, handleCloseModal } = props
  const [fileVideo, setFileVideo] = useState<File | null>(null)
  const [fileImage, setFileImage] = useState<File | null>(null)
  const imageRef = React.useRef<HTMLInputElement>(null)
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [progressVideo, setProgressVideo] = useState<number>(0)
  const [urlVideo, setUrlVideo] = useState<string>('')
  const [urlImage, setUrlImage] = useState<string>('')
  const [progressImage, setProgressImage] = useState<number>(0)
  const [showForm, setShowForm] = useState<boolean>(false)

  const handleFileChange = (files: React.SetStateAction<File | null>[]) => {
    setFileVideo(files[0])
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
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFileImage(files[0])
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
      console.log('Video:', res.data.url)
      setUrlVideo(res.data.url)
      setFileVideo(null)
      setProgressVideo(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileVideo])

  const handleUploadImageCloud = useCallback(async () => {
    const options = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        setProgressImage(progress)
      }
    }
    try {
      const res = await uploadApi.uploadImage(fileImage as File, options)
      console.log('Image:', res.data.url)
      setUrlImage(res.data.url)
      setFileImage(null)
      setProgressImage(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileImage])

  useEffect(() => {
    if (fileVideo !== null && urlVideo === '') {
      handleUploadCloud()
      setShowForm(true)
    }
  }, [handleUploadCloud, fileVideo, urlVideo])

  useEffect(() => {
    if (fileImage !== null && urlImage === '') {
      handleUploadImageCloud()
    }
  }, [fileImage, handleUploadImageCloud, urlImage])

  const onSubmit = handleSubmit((data) => {
    const dataUpload = {
      ...data,
      image: urlImage,
      video: urlVideo
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
    reset()
  }

  console.log('progressVideo:', progressVideo)
  return (
    <DialogCustom
      isOpen={isModalOpen}
      handleClose={handleCLose}
      className='flex flex-col overflow-y-auto bg-white shadow dark:bg-[#282828] max-md:h-80 max-md:w-96 md:h-[450px] md:w-[800px] lg:h-[560px] lg:w-[1000px]'
    >
      {showForm && (
        <>
          <div className='border-b border-b-gray-300 pb-2 text-sm font-semibold text-black dark:text-white lg:text-lg'>
            Chi tiết
          </div>{' '}
          <form className='mt-5 flex flex-col lg:gap-y-2' onSubmit={onSubmit}>
            <div className='lg:flex lg:items-start lg:justify-between '>
              <div className='flex flex-shrink-0 flex-col lg:w-[500px]'>
                <div className='flex flex-col gap-y-1'>
                  <TextArea
                    name='title'
                    placeholder='Tiêu đề'
                    register={register}
                    errorMessage={errors.title?.message}
                    classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-16     placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121] lg:h-28
                    dark:border-[#595959]'
                  />
                </div>
                <div className='flex flex-col gap-y-1'>
                  <TextArea
                    name='description'
                    register={register}
                    placeholder='Mô tả'
                    errorMessage={errors.description?.message}
                    classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-24 dark:border-[#595959] placeholder:text-xs outline-none md:text-sm lg:h-28  md:placeholder:text-sm dark:bg-[#212121]'
                  />
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
                    {...register('image')}
                    className='hidden'
                    ref={imageRef}
                    onChange={handleChangeImage}
                  />

                  {progressImage === 0 && !urlImage && (
                    <>
                      <button
                        type='button'
                        className='mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-3 border border-dashed max-md:h-20 max-md:w-28 md:h-36 md:w-60'
                        onClick={handleUploadImage}
                      >
                        <AiOutlineFileImage className='h-9 w-9 text-black dark:text-white max-md:h-6 max-md:w-6' />
                        <span className='text-xs text-[#a7a7a7] dark:text-white md:text-sm'>Tải hình thu nhỏ lên</span>
                      </button>
                      <span className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                        {errors.image?.message}
                      </span>
                    </>
                  )}
                  {progressImage > 0 && progressImage < 100 && (
                    <>
                      <div className='mx-auto flex flex-col items-center justify-center gap-y-3 border border-dashed max-md:h-20 max-md:w-28 md:h-36 md:w-60'>
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
                  {progressImage === 0 && urlImage && (
                    <>
                      <div className='mx-auto flex h-24 w-24 flex-col items-center justify-center gap-y-2 border border-dashed max-md:h-20 max-md:w-28 md:h-36 md:w-60'>
                        <img src={urlImage} alt='' className='h-full w-full object-cover' />
                      </div>
                      <div className='my-1 min-h-[1.25rem]'></div>
                    </>
                  )}
                </div>
              </div>

              <div className='flex flex-col bg-[#f9f9f9] dark:bg-[#1f1f1f] max-lg:h-48 max-lg:w-full lg:h-56 lg:w-80'>
                <span className='text-xs font-semibold text-black dark:text-white  md:text-sm lg:hidden'>Video:</span>
                {progressVideo > 0 && progressVideo < 100 && (
                  <div className='flex h-full w-full flex-col items-center justify-center gap-y-5 border border-dashed '>
                    <div className='animate-spin'>
                      <AiOutlineLoading className='h-6 w-6 text-black dark:text-white md:h-9 md:w-9' />
                    </div>
                    <span className='text-xs font-semibold text-black dark:text-white md:text-sm'>
                      Đã tải được {progressVideo + '%'}
                    </span>
                  </div>
                )}
                {progressVideo === 0 && urlVideo && (
                  <video src={urlVideo} className='aspect-video h-full w-full' controls />
                )}
              </div>
            </div>
            <div className='text-right'>
              <Button
                className='mt-5 rounded bg-blue-700 p-2 text-xs font-semibold text-white max-lg:mt-7 max-sm:w-20 md:text-sm lg:w-24'
                type='submit'
              >
                UPLOAD
              </Button>
            </div>
          </form>
        </>
      )}

      {!showForm && (
        <>
          <div className='border-b border-b-gray-300 pb-2 text-sm font-semibold text-black dark:text-white md:text-base'>
            Tải video lên
          </div>{' '}
          {progressVideo === 0 && (
            <>
              {' '}
              <div className='flex items-center justify-center lg:my-16'>
                <div
                  className={`flex h-32 w-full cursor-pointer items-center justify-center border border-dashed  text-center max-md:h-[200px] md:h-[300px] lg:h-72 ${
                    isDragReject ? 'border-red-500' : 'border-gray-300'
                  } `}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} type='file' accept='video/mp4,video/x-m4v,video/*' />
                  <div className='flex flex-col items-center gap-y-4'>
                    <div className='animate-bounce text-center text-black dark:text-white'>
                      <GrUploadOption className='h-10 w-10 text-black dark:text-white md:h-16 md:w-16' />
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
                ref={fileRef}
                onChange={handleChangeFile}
              />
              <button
                className='mx-auto w-24 rounded bg-blue-700 py-2 text-center text-xs font-semibold uppercase text-white max-md:mt-4 md:mt-8 md:w-32 md:text-sm'
                type='button'
                onClick={handleClick}
              >
                Chọn tệp
              </button>
            </>
          )}
        </>
      )}
    </DialogCustom>
  )
}

export default FormUpload
