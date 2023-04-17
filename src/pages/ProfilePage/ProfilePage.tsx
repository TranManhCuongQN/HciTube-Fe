import React, { useCallback, useEffect, useRef, useState } from 'react'
import uploadApi from 'src/api/upload.api'
import Editor from 'src/components/Editor'
import Input from 'src/components/Input'
import { MdOutlineSystemUpdateAlt } from 'react-icons/md'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDropzone } from 'react-dropzone'
import { ImCloudUpload } from 'react-icons/im'
import Button from 'src/components/Button'
import { AiOutlineLoading } from 'react-icons/ai'
import { profileSchema, profileSchemaType } from 'src/utils/rules'
import { useQuery } from 'react-query'
import profileApi from 'src/api/profile.api'
type FormData = profileSchemaType

const ProfilePage = () => {
  const form = useForm<FormData>({
    resolver: yupResolver(profileSchema)
  })
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue
  } = form
  const imageRef = useRef<HTMLInputElement>(null)
  const [fileImage, setFileImage] = useState<File | null>(null)
  const [idImage, setIdImage] = useState<string>('')
  const [urlImage, setUrlImage] = useState<string>('')
  const [progressImage, setProgressImage] = useState<number>(0)
  const [urlThumbnail, setUrlThumbnail] = useState<string>('')
  const [progressThumbnail, setProgressThumbnail] = useState<number>(0)
  const [idThumbnail, setIdThumbnail] = useState<string>('')
  const [fileThumbnail, setFileThumbnail] = useState<File | null>(null)
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png']
    },
    onDrop(acceptedFiles) {
      if (acceptedFiles.length > 0) {
        setFileThumbnail(acceptedFiles[0])
      }
    }
  })

  const { data: profileData } = useQuery({
    queryKey: 'user',
    queryFn: profileApi.getProfile
  })

  const profile = profileData?.data.data
  console.log(profile)

  const handleUploadImage = () => {
    imageRef.current?.click()
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
      console.log('Image:', res.data)
      setValue('avatar', res.data.url)
      setUrlImage(res.data.url)
      setIdImage(res.data.public_id)
      setFileImage(null)
      setProgressImage(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileImage, setValue])

  const handleUploadThumbnailCloud = useCallback(async () => {
    const options = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        setProgressThumbnail(progress)
      }
    }
    try {
      const res = await uploadApi.uploadImage(fileThumbnail as File, options)
      console.log('Thumbnail:', res.data)
      setValue('thumbnail', res.data.url)
      setUrlThumbnail(res.data.url)
      setIdThumbnail(res.data.public_id)
      setFileThumbnail(null)
      setProgressThumbnail(0)
    } catch (error) {
      console.log(error)
    }
  }, [fileThumbnail, setValue])

  useEffect(() => {
    if (fileImage !== null && fileImage !== undefined) {
      handleUploadImageCloud()
    }
  }, [fileImage, handleUploadImageCloud])

  useEffect(() => {
    if (fileThumbnail !== null && fileThumbnail !== undefined) {
      handleUploadThumbnailCloud()
    }
  }, [fileThumbnail, handleUploadThumbnailCloud])

  useEffect(() => {
    if (profile) {
      setValue('fullName', profile.fullName)
      setValue('avatar', profile.avatar)
      setValue('thumbnail', profile.thumbnail)
      setValue('description', profile.description)
      setUrlImage(profile.avatar)
      setUrlThumbnail(profile.thumbnail)
    }
  }, [profile, setValue])

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFileImage(files[0])
      if (idImage) {
        handleDeleteImage(idImage)
      }
    }
  }

  const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFileImage(files[0])
      if (idThumbnail) {
        handleDeleteImage(idThumbnail)
      }
    }
  }

  const handleDeleteImage = async (id: string) => {
    try {
      const res = await uploadApi.deleteImage(id)
      setUrlImage('')
      setValue('avatar', '')
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='flex w-full flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
      <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Hồ sơ cá nhân</span>
      <FormProvider {...form}>
        <form
          className='my-5 mx-auto flex w-11/12 flex-col gap-y-2 rounded-lg bg-white p-5 dark:bg-[#282828]'
          onSubmit={onSubmit}
        >
          <div className='flex flex-col gap-y-2'>
            <label
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
              htmlFor='avatar'
            >
              Avatar
            </label>
            <input type='file' accept='image/*' className='hidden' ref={imageRef} onChange={handleChangeImage} />
            {progressImage > 0 && progressImage <= 100 && (
              <div
                className={`relative mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-dashed border-gray-50
                
                `}
              >
                <span className='text-xs text-[#a7a7a7] dark:text-white md:text-sm'>
                  Đã tải được {progressImage + '%'}
                </span>
              </div>
            )}
            {progressImage === 0 && (
              <div className='relative mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-gray-50'>
                <img
                  src={urlImage || 'https://i.pinimg.com/564x/53/d2/cc/53d2cc393e5a6196a8ba8a8c310bc2e0.jpg'}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
                <button
                  className='absolute top-1/2 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)]'
                  title='Thay đổi ảnh'
                  onClick={handleUploadImage}
                  type='button'
                >
                  <MdOutlineSystemUpdateAlt className='h-6 w-6 font-bold text-white ' />
                </button>
              </div>
            )}
            <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>{errors.avatar?.message}</div>
          </div>
          <div className='flex flex-col gap-y-1'>
            <label
              htmlFor='fullName'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              Tên người dùng:
            </label>
            <Input
              name='fullName'
              id='fullName'
              register={register}
              errorMessage={errors.fullName?.message}
              placeholder='Đặt tên người dùng'
              classNameInput='rounded-lg border border-gray-400 p-3 placeholder:text-xs dark:bg-transparent text-black dark:text-white  md:placeholder:text-sm outline-none text-xs md:text-sm w-full '
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <Editor name='description' />
            <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>{errors.description?.message}</div>
          </div>
          <div className='flex flex-col gap-y-1'>
            <label
              htmlFor='thumbnail'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              Ảnh bìa:
            </label>
            {progressThumbnail === 0 && !urlThumbnail && (
              <div
                className={`flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border  border-dashed text-center max-md:h-[250px] md:h-[300px] lg:h-72 ${
                  isDragReject ? 'border-red-500' : 'border-gray-300'
                } `}
                {...getRootProps()}
              >
                <input {...getInputProps()} type='file' accept='video/mp4,video/x-m4v,video/*' />
                <div className='flex flex-col items-center gap-y-4'>
                  <div className='animate-bounce text-center text-black dark:text-white'>
                    <ImCloudUpload className='h-10 w-10 text-black dark:text-white md:h-16 md:w-16' />
                  </div>

                  {isDragReject ? (
                    <span className='text-xs font-semibold text-red-600 md:text-base'>
                      Tệp không hợp lệ. Vui lòng chọn một tệp ảnh
                    </span>
                  ) : (
                    <span className='text-xs font-semibold text-black dark:text-white md:text-base'>
                      Kéo và thả tệp ảnh để tải lên
                    </span>
                  )}
                </div>
              </div>
            )}
            {progressThumbnail > 0 && progressThumbnail <= 100 && (
              <div
                className={`flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border  border-dashed text-center max-md:h-[250px] md:h-[300px] lg:h-72`}
              >
                <div className='flex items-center justify-center gap-x-3'>
                  <div className='animate-spin text-black dark:text-white'>
                    <AiOutlineLoading className='h-10 w-10 text-black dark:text-white md:h-16 md:w-16' />
                  </div>
                  <span className='text-xs text-[#a7a7a7] dark:text-white md:text-sm'>
                    Đã tải được {progressThumbnail + '%'}
                  </span>
                </div>
              </div>
            )}
            {urlThumbnail && (
              <div
                className={`relative flex h-32 w-full cursor-pointer items-center justify-center rounded-xl text-center max-md:h-[250px] md:h-[300px] lg:h-72`}
              >
                <img src={urlThumbnail} alt='thumbnail' className='h-full w-full rounded-lg object-cover' />
                <button
                  className='absolute top-1/2 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)]'
                  title='Thay đổi ảnh bìa'
                  // onClick={handleUploadImage}
                  type='button'
                >
                  <MdOutlineSystemUpdateAlt className='h-6 w-6 font-bold text-white ' />
                </button>
              </div>
            )}
          </div>
          <div className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>{errors.thumbnail?.message}</div>

          <Button
            className='mt-3 rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
            type='submit'
          >
            Lưu
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default ProfilePage
