import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import profileApi from 'src/api/profile.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { changePasswordSchema, changePasswordSchemaType } from 'src/utils/rules'
import { isAxiosUnauthorizedError } from 'src/utils/utils'

type FormData = changePasswordSchemaType
const schema = changePasswordSchema
const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const changePasswordMutation = useMutation({
    mutationFn: (data: FormData) => profileApi.changePassword(data),
    onSuccess: () => {
      toast.dismiss()
      toast.success('Cập nhật mật khẩu thành công', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false
      })
      reset()
    },
    onError: (error) => {
      if (isAxiosUnauthorizedError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.message
        setError('passwordCurrent', { type: 'custom', message: formError })
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    changePasswordMutation.mutate(data)
  })

  return (
    <div className='flex w-full flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
      <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Đổi mật khẩu</span>
      <form
        className='my-5 mx-auto flex w-11/12 flex-col gap-y-2 rounded-lg bg-white p-5 dark:bg-[#282828]'
        onSubmit={onSubmit}
      >
        <div className='flex flex-col gap-y-1'>
          <label
            htmlFor='passwordCurrent'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            Mật khẩu cũ
          </label>
          <Input
            type='password'
            name='passwordCurrent'
            id='passwordCurrent'
            register={register}
            errorMessage={errors.passwordCurrent?.message}
            placeholder='Mật khẩu cũ'
            classNameInput='rounded-lg border border-gray-400 p-3 placeholder:text-xs dark:bg-transparent text-black dark:text-white  md:placeholder:text-sm outline-none text-xs md:text-sm w-full '
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <label
            htmlFor='password'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            Mật khẩu mới
          </label>
          <Input
            type='password'
            name='password'
            id='password'
            register={register}
            errorMessage={errors.password?.message}
            placeholder='Mật khẩu mới'
            classNameInput='rounded-lg border border-gray-400 p-3 placeholder:text-xs dark:bg-transparent text-black dark:text-white  md:placeholder:text-sm outline-none text-xs md:text-sm w-full '
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <label
            htmlFor='passwordConfirm'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            Nhập lại mật khẩu mới
          </label>
          <Input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            register={register}
            errorMessage={errors.passwordConfirm?.message}
            placeholder='Nhập lại mật khẩu mới'
            classNameInput='rounded-lg border border-gray-400 p-3 placeholder:text-xs dark:bg-transparent text-black dark:text-white  md:placeholder:text-sm outline-none text-xs md:text-sm w-full '
          />
        </div>
        <Button
          className='mt-3 rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
          type='submit'
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Cập nhập
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordPage
