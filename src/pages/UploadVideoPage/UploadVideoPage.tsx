/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useState } from 'react'
import DialogCustom from 'src/components/DialogCustome'
import Sidebar from './components/Sidebar'
import Dropzone from 'react-dropzone'
import { GrUploadOption } from 'react-icons/gr'
import uploadApi from 'src/api/upload.api'
import { AiOutlineLoading, AiOutlineFileImage } from 'react-icons/ai'
import Input from 'src/components/Input'

const UploadVideoPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [fileVideo, setFileVideo] = useState<File | null>(null)
  const [fileImage, setFileImage] = useState<File | null>(null)
  const imageRef = React.useRef<HTMLInputElement>(null)
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState<number>(0)
  const [urlVideo, setUrlVideo] = useState<string>('')
  const [urlImage, setUrlImage] = useState<string>('')
  const [progressImage, setProgressImage] = useState<number>(0)
  const [showForm, setShowForm] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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
        setProgress(progress)
      }
    }
    try {
      const res = await uploadApi.uploadVideo(fileVideo as File, options)
      console.log('Video:', res.data.url)
      setUrlVideo(res.data.url)
      setFileVideo(null)
      setProgress(0)
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
    if (fileImage !== null && urlImage === '') {
      handleUploadImageCloud()
    }
  }, [handleUploadCloud, fileVideo, fileImage, handleUploadImageCloud, urlImage, urlVideo])

  console.log('progressImage:', progressImage)

  return (
    <>
      <div className='container flex flex-col gap-y-5 bg-[#f9f9f9] pl-3 pr-3 pb-3 dark:bg-[#0f0f0f] lg:h-screen lg:flex-row lg:gap-x-8'>
        {/* //* SideBar */}
        <Sidebar />
        {/* //* Main */}
        <div className='flex flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
          <span className='text-sm font-semibold text-black dark:text-white md:text-base'>
            Trang tổng quan của kênh
          </span>
          <div className='flex flex-col gap-y-5 gap-x-5 bg-[#f9f9f9] dark:bg-[#0f0f0f] lg:flex-row lg:gap-x-5'>
            <div className='flex flex-col items-center justify-center gap-y-5 rounded-lg bg-white p-5 dark:bg-[#282828] md:p-8'>
              <div className='h-36 w-36 md:h-44 md:w-44'>
                <img
                  src='https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3.svg'
                  alt='avatar'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='text-center text-xs text-black dark:text-white md:text-sm'>
                Bạn có muốn xem các chỉ số cho video gần đây của mình không?
              </div>
              <div className='text-center text-xs text-black dark:text-white md:text-sm'>
                Hãy đăng tải và xuất bản một video để bắt đầu.
              </div>
              <button
                className='bg-blue-600 p-2 text-xs font-semibold text-white md:p-3'
                onClick={() => setIsModalOpen(true)}
              >
                TẢI VIDEO LÊN
              </button>
            </div>

            <div className='flex flex-col items-start gap-y-5 rounded-lg bg-white p-5 dark:bg-[#282828] dark:shadow-2xl lg:w-72'>
              <span className='text-sm font-semibold text-black dark:text-white md:text-base'>
                Số liệu phân tích về kênh
              </span>
              <div className='flex flex-col border-b border-b-gray-300 py-2'>
                <span className='text-xs text-black dark:text-white md:text-sm'>Số người đăng ký hiện tại</span>
                <span className='text-base font-semibold text-black dark:text-white md:text-lg'>0</span>
              </div>
              <div className='flex w-full flex-col gap-y-2'>
                <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Tóm tắt</span>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-black dark:text-white md:text-sm'>Số lượt xem</span>
                  <span className='text-sm font-bold text-black dark:text-white md:text-base'>0</span>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <span className='text-xs text-black dark:text-white md:text-sm'>Thời gian xem</span>
                  <span className='text-sm font-bold text-black dark:text-white md:text-base'>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //* Dialog */}
      <DialogCustom
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        className='flex h-72 w-full flex-col overflow-y-auto bg-white md:h-[400px]'
      >
        <div className='border-b border-b-gray-300 pb-2 text-sm font-semibold text-black md:text-base'>
          Tải video lên
        </div>
        {showForm && (
          <>
            {' '}
            <form className='mt-5 flex flex-col gap-y-3'>
              <div className='flex flex-col gap-y-1'>
                <label
                  htmlFor='title'
                  className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                >
                  Tiêu đề:
                </label>
                <Input
                  name='title'
                  type='text'
                  placeholder='Tiêu đề'
                  id='title'
                  classNameInput='text-xs text-black dark:text-white p-2 border w-full rounded placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm'
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <label
                  htmlFor='description'
                  className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                >
                  Mô tả:
                </label>
                <textarea
                  id='description'
                  className='h-20 w-full border p-2 text-xs text-black outline-none  md:text-sm md:placeholder:text-sm'
                  placeholder='Mô tả'
                />
              </div>
              <div className='flex flex-col gap-y-2'>
                <label
                  htmlFor='thumbnail'
                  className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                >
                  Hình ảnh:
                </label>
                <input type='file' accept='image/*' className='hidden' ref={imageRef} onChange={handleChangeImage} />
                {progressImage === 0 && !urlImage && (
                  <button
                    type='button'
                    className='mx-auto flex h-24 w-24 flex-col items-center justify-center gap-y-2 border border-dashed md:h-36 md:w-36'
                    onClick={handleUploadImage}
                  >
                    <AiOutlineFileImage className='h-6 w-6 text-black' />
                    <span className='text-xs text-black'>Tải hình lên</span>
                  </button>
                )}
                {progressImage > 0 && (
                  <div className='mx-auto flex h-24 w-24 flex-col items-center justify-center gap-y-3 border border-dashed md:h-36 md:w-36'>
                    <div className='animate-spin'>
                      <AiOutlineLoading className='h-6 w-6 text-black' />
                    </div>
                    <span className='text-xs font-semibold text-black md:text-sm'>{progress + '%'}</span>
                  </div>
                )}
                {progressImage === 0 && urlImage && (
                  <div className='mx-auto flex h-24 w-24 flex-col items-center justify-center gap-y-2 border border-dashed md:h-36 md:w-1/3'>
                    <img src={urlImage} alt='' className='h-full w-full object-cover' />
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-y-2'>
                <label
                  htmlFor='video'
                  className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
                >
                  Video:
                </label>
                {progress > 0 && (
                  <div className='flex h-36 w-full flex-col items-center justify-center gap-y-5 border border-dashed '>
                    <div className='animate-spin'>
                      <AiOutlineLoading className='h-6 w-6' />
                    </div>
                    <span className='text-xs font-semibold text-black md:text-sm'>Đã tải được {progress + '%'}</span>
                  </div>
                )}
                {progress === 0 && urlVideo && (
                  <div className='flex h-36 w-full flex-col items-center justify-center gap-y-5 border border-dashed '>
                    <video src={urlVideo} className='h-full w-full' />
                  </div>
                )}
              </div>
              <button className='bg-blue-500 p-2 text-xs text-white md:text-sm' type='submit'>
                UPLOAD
              </button>
            </form>
          </>
        )}
        {!showForm && (
          <>
            {' '}
            {progress === 0 && (
              <>
                {' '}
                <div className='flex h-full w-full items-center justify-center'>
                  <Dropzone onDrop={handleFileChange}>
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className='flex h-32 w-full items-center justify-center border border-dashed border-gray-300 text-center md:h-36'
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <div className='flex flex-col items-center gap-y-4'>
                          <div className='animate-bounce text-center'>
                            <GrUploadOption className='h-10 w-10 md:h-12 md:w-12' />
                          </div>
                          <span className='text-xs font-semibold text-black md:text-sm'>
                            Kéo và thả tệp video để tải lên
                          </span>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </div>
                <input
                  type='file'
                  accept='video/mp4,video/x-m4v,video/*'
                  className='hidden'
                  ref={fileRef}
                  onChange={handleChangeFile}
                />
                <button
                  className='mx-auto w-24 rounded bg-blue-600 py-2 text-center text-xs font-semibold uppercase text-white md:w-36 md:text-sm'
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
    </>
  )
}

export default UploadVideoPage
