import React from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { BsYoutube } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { resetPasswordSchemaType, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = resetPasswordSchemaType
const resetPasswordSchema = schema.pick(['password', 'passwordConfirm'])
const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('data', data)
  })
  return (
    <div className='mx-auto flex min-h-screen w-72 flex-col justify-center gap-y-5 py-5 md:w-[400px]'>
      <Link to={path.home} className='flex flex-col items-center'>
        <BsYoutube className='h-16 w-16 text-red-600 md:h-24 md:w-24' />
        <div className='flex items-end gap-x-1'>
          <span className='text-lg font-semibold text-black dark:text-white md:text-2xl'>Chào mừng bạn đến</span>
          <span className='dynamic text-lg font-semibold text-red-600 after:bg-white dark:after:bg-[#0f0f0f] md:text-2xl'>
            YouTube
          </span>
        </div>
      </Link>
      <form className={`flex w-full flex-col`} noValidate onSubmit={onSubmit}>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label
            htmlFor='password'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            Mật khẩu mới
          </label>
          <Input
            name='password'
            type='password'
            register={register}
            errorMessage={errors.password?.message}
            placeholder='Mời nhập mật khẩu của bạn'
            id='password'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none text-xs md:text-sm'
          />
        </div>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label
            htmlFor='passwordConfirm'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm  '
          >
            Nhập lại mật khẩu mới
          </label>
          <Input
            name='passwordConfirm'
            type='password'
            errorMessage={errors.passwordConfirm?.message}
            register={register}
            placeholder='Nhập lại mật khẩu mới'
            id='passwordConfirm'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none text-xs md:text-sm'
          />
        </div>
        <Button
          className='mt-3 w-full rounded-lg bg-blue-600 p-2 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
          type='submit'
        >
          Xác nhận
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordPage
