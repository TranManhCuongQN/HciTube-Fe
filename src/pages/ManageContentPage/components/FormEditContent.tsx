/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DialogCustom from 'src/components/DialogCustome'
import { uploadVideoSchema, uploadVideoSchemaType } from 'src/utils/rules'
import { AiOutlineLoading, AiOutlineFileImage } from 'react-icons/ai'
import uploadApi from 'src/api/upload.api'
import TextArea from 'src/components/TextArea'
import Button from 'src/components/Button'
import { Video } from 'src/types/video.type'

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
    reset
  } = useForm<FormData>({
    resolver: yupResolver(uploadVideo)
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
      setFileImage(null)
      setProgressImage(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileImage])

  useEffect(() => {
    if (fileImage !== null && urlImage === '') {
      handleUploadImageCloud()
    }
  }, [fileImage, handleUploadImageCloud, urlImage])

  const onSubmit = handleSubmit((data) => {
    console.log('data:', data)
  })
  return (
    <DialogCustom
      isOpen={isOpenModal}
      handleClose={handleCloseModal}
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
                  classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-16     placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121] lg:h-28
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
                {progressImage > 0 && progressImage <= 100 && (
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
                {urlImage && (
                  <>
                    <div className='mx-auto flex h-24 w-24 flex-col items-center justify-center gap-y-2 border border-dashed max-md:h-20 max-md:w-28 md:h-36 md:w-60'>
                      <img src={urlImage} alt='' className='h-full w-full object-cover' />
                    </div>
                    <div className='my-1 min-h-[1.25rem]'></div>
                  </>
                )}
              </div>
            </div>

            <span className='text-xs font-semibold text-black dark:text-white  md:text-sm lg:hidden'>Video:</span>
            <div className='flex items-center justify-center'>
              <div className='mb-2 flex h-72 w-80 flex-col bg-[#f9f9f9] dark:bg-[#1f1f1f]'>
                {progressVideo >= 0 && progressVideo <= 100 && (
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
                )}
                {urlVideo && (
                  <div className='flex h-full w-full flex-col'>
                    <div className='flex h-full w-full flex-col items-center justify-center gap-y-5 border border-dashed bg-[#e9e9e9] lg:h-44 lg:w-80 '>
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
                          <span className='text-xs text-black dark:text-[#858585]'>Tên tệp</span>
                          <span className='text-xs text-black dark:text-white md:text-sm '>{fileNameVideo}</span>
                          <CopyToClipboard text={urlVideo}>
                            <span className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10'>
                              <BiCopy className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
                            </span>
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                  </div>
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
      </>
    </DialogCustom>
  )
}

export default FormEditContent
