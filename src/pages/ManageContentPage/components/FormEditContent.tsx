/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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

interface FormEditContentProps {
  isOpenModal: boolean
  handleCloseModal: () => void
  data?: Video
}

type FormData = uploadVideoSchemaType
const uploadVideo = uploadVideoSchema
const FormEditContent = (props: FormEditContentProps) => {
  const { isOpenModal, handleCloseModal, data } = props
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset
  } = useForm<FormData>({
    resolver: yupResolver(uploadVideo),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      thumbnail: data?.thumbnail || '',
      video: data?.video || ''
    }
  })
  const [fileImage, setFileImage] = useState<File | null>(null)
  const imageRef = React.useRef<HTMLInputElement>(null)
  const [urlImage, setUrlImage] = useState<string>('')
  const [progressImage, setProgressImage] = useState<number>(0)

  const handleUploadImage = () => {
    imageRef.current?.click()
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFileImage(files[0])
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
      console.log('Image:', res.data.url)
      setUrlImage(res.data.url)
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

  const onSubmit = handleSubmit((value) => {
    const dataEdit = {
      ...value,
      thumbnail: urlImage,
      video: data?.video
    }
    console.log(dataEdit)
  })

  useEffect(() => {
    console.log('1')
    if (data) {
      setValue('title', data.title)
      setValue('description', data.description)
      setValue('thumbnail', data.thumbnail)
      setValue('video', data.video)
    }
  }, [data, setValue, isOpenModal])

  const handleClose = () => {
    handleCloseModal()
    setUrlImage('')
    setFileImage(null)
    setProgressImage(0)
    reset()

    // Cancel API
    if (controllerImage) {
      controllerImage.abort()
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
                <label
                  htmlFor='description'
                  className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                >
                  Mô tả:
                </label>
                <TextArea
                  id='description'
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
                    <div className='relative mx-auto mt-2 flex h-36 w-60 flex-col items-center justify-center gap-y-2 border border-dashed'>
                      <img src={urlImage || data?.thumbnail} alt='' className='h-full w-full object-cover' />
                      <button
                        className='absolute top-1/2 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)]'
                        title='Thay đổi ảnh'
                        onClick={handleUploadImage}
                        type='button'
                      >
                        <MdOutlineSystemUpdateAlt className='h-6 w-6 font-bold text-white ' />
                      </button>
                    </div>
                    <div className='my-1 min-h-[1.25rem]'></div>
                  </>
                )}
              </div>
            </div>

            <span className='text-xs font-semibold text-black dark:text-white  md:text-sm lg:hidden'>Video:</span>
            <div className='flex items-center justify-center max-md:mt-2 lg:mt-5'>
              <div className='mb-2 flex h-72 w-80 flex-col bg-[#f9f9f9] dark:bg-[#1f1f1f]'>
                <div className='flex h-full w-full flex-col'>
                  <div className='flex h-full w-full flex-col items-center justify-center gap-y-5 border border-dashed bg-[#e9e9e9] lg:h-44 lg:w-80 '>
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
            >
              Upload
            </Button>
          </div>
        </form>
      </>
    </DialogCustom>
  )
}

export default FormEditContent
