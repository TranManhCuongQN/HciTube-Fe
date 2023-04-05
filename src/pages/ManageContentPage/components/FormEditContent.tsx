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
        <form className='mt-5 flex flex-col lg:gap-y-2'>
          <div className='lg:flex lg:items-start lg:justify-between '>
            <div className='flex flex-shrink-0 flex-col lg:w-[500px]'>
              <div className='flex flex-col gap-y-1'>
                <TextArea
                  name='title'
                  placeholder='Tiêu đề'
                  classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-16 placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121] lg:h-28
                dark:border-[#595959]'
                  value={data?.title}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <TextArea
                  name='description'
                  placeholder='Mô tả'
                  classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-24 dark:border-[#595959] placeholder:text-xs outline-none md:text-sm lg:h-28  md:placeholder:text-sm dark:bg-[#212121]'
                  value={data?.comments}
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
                <input type='file' accept='image/*' className='hidden' ref={imageRef} onChange={handleChangeImage} />

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

              <video src='' className='aspect-video h-full w-full' controls />
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
    </DialogCustom>
  )
}

export default FormEditContent
