import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import DialogCustom from 'src/components/DialogCustome'
import Editor from 'src/components/Editor'
import TextArea from 'src/components/TextArea'
import { uploadVideoSchema, uploadVideoSchemaType } from 'src/utils/rules'

interface FormAddPlayListProps {
  showModal: boolean
  setShowModal: (value: boolean) => void
}

type FormData = Pick<uploadVideoSchemaType, 'description' | 'title'>
const playListSchema = uploadVideoSchema.pick(['description', 'title'])
const FormAddPlayList = ({ showModal, setShowModal }: FormAddPlayListProps) => {
  const form = useForm<FormData>({
    resolver: yupResolver(playListSchema)
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = form

  const handleClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (!showModal) {
      reset()
    }
  }, [showModal, reset])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setShowModal(false)
    reset()
  })

  console.log(errors)

  return (
    <>
      <DialogCustom isOpen={showModal} handleClose={handleClose}>
        <div className='relative z-50 mb-5 overflow-hidden overflow-y-auto bg-white shadow dark:bg-[#282828] max-sm:h-96 max-[320px]:h-72 lg:h-[520px] lg:w-[500px]'>
          <div className='flex flex-col px-5'>
            <span className='py-5 text-sm font-semibold dark:text-white  md:text-base'>Tạo danh sách phát mới</span>
            <div className='w-full border border-gray-500'></div>
            <FormProvider {...form}>
              <form className='my-5 flex flex-col' onSubmit={onSubmit}>
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
                    classNameTextArea='text-xs text-black dark:text-white p-2 border w-full rounded md:h-20 placeholder:text-xs outline-none md:text-sm md:placeholder:text-sm dark:bg-[#212121]
                    dark:border-[#595959]'
                  />
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Editor name='description' />
                  <span className='my-1 min-h-[1.25rem] text-xs font-semibold text-red-600'>
                    {errors.description?.message}
                  </span>
                </div>
                <div className='flex w-full items-start justify-end gap-x-2'>
                  <Button
                    className='rounded-lg p-2 text-xs font-semibold text-blue-600  md:text-sm'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </Button>
                  <Button className='rounded-lg p-2 text-xs font-semibold text-blue-600  md:text-sm' type='submit'>
                    Tạo
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default FormAddPlayList
