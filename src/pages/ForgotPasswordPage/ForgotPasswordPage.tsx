import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { BsYoutube } from 'react-icons/bs'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { forgotPasswordSchemaType, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import authApi from 'src/api/auth.api'
import { isAxiosNotFoundError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = forgotPasswordSchemaType
const forgotPasswordSchema = schema.pick(['email'])
const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordSchema)
  })

  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')

  const forgotPasswordMutaion = useMutation({
    mutationFn: (email: FormData) => authApi.forgotPassword(email),
    onSuccess: (data) => {
      navigate(path.verifyResetPass)
    },
    onError: (error) => {
      if (isAxiosNotFoundError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.message
        setError('email', { type: 'custom', message: formError })
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    forgotPasswordMutaion.mutate(data)
  })
  return (
    <div>
      <div className='mx-auto flex h-screen w-64 flex-col justify-center gap-y-5 md:w-96'>
        <Link to={path.home} className='flex flex-col items-center'>
          <BsYoutube className='h-16 w-16 text-red-600 md:h-24 md:w-24' />
          <div className='flex items-end gap-x-1'>
            <span className='text-lg font-semibold text-black dark:text-white md:text-2xl'>Chào mừng bạn đến</span>
            <span className='dynamic text-lg font-semibold text-red-600 after:bg-white dark:after:bg-[#0f0f0f] md:text-2xl'>
              YouTube
            </span>
          </div>
        </Link>
        <form className={`flex w-full flex-col`} noValidate onSubmit={onSubmit} autoComplete='false'>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label
              htmlFor='email'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              Email:
            </label>
            <Input
              name='email'
              type='text'
              register={register}
              placeholder='Mời nhập email của bạn'
              id='email'
              errorMessage={errors.email?.message}
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-64 dark:bg-transparent text-black dark:text-white md:w-96 md:placeholder:text-sm outline-none text-xs md:text-sm'
            />
          </div>
          <Button
            className='mt-3 w-full rounded-lg bg-blue-600 p-2 text-xs font-semibold text-white md:text-sm'
            type='submit'
          >
            Xác nhận
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
