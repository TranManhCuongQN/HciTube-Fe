import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { BsYoutube } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { verifySchema as schema, verifySchemaType } from 'src/utils/rules'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { AppContext } from 'src/context/app.context'
import { useMutation } from 'react-query'
import authApi from 'src/api/auth.api'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosBadRequestError, isAxiosUnauthorizedError, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { clearLocalStorage, getProfileFromLocalStorage } from 'src/utils/auth'
import { Helmet } from 'react-helmet-async'

type FormData = verifySchemaType
const verifySchema = schema
const VerifyResetPassPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(verifySchema)
  })

  const { setIsVerify } = useContext(AppContext)
  const [remainingTime, setRemainingTime] = useState<{ minutes: number; seconds: number }>({ minutes: 1, seconds: 0 })
  const intervalRef = useRef<NodeJS.Timer>()

  const navigate = useNavigate()

  const email = localStorage.getItem('email')

  const verifyMutation = useMutation({
    mutationFn: (body: { encode: string }) => authApi.verifyResetPassPage(body)
  })

  const getOTP = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword({ email })
  })

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newSeconds = prevTime.seconds - 1
        const newMinutes = prevTime.minutes - (newSeconds < 0 ? 1 : 0)
        return { minutes: newMinutes, seconds: (60 + newSeconds) % 60 }
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [remainingTime])

  useEffect(() => {
    if (remainingTime.minutes === 0 && remainingTime.seconds === 0) {
      clearInterval(intervalRef.current)
    }
  }, [remainingTime])

  const handleSendCode = () => {
    getOTP.mutate(email as string, {
      onSuccess: (data) => {
        setRemainingTime({ minutes: 1, seconds: 0 })
      }
    })
  }

  const onSubmit = handleSubmit((data) => {
    const dataRequest = {
      encode: data.encode
    }
    verifyMutation.mutate(dataRequest, {
      onSuccess: (data) => {
        navigate(`/reset-password/${data.data.hashedToken}`)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.message
          setError('encode', { type: 'custom', message: formError })
        }
      }
    })
  })

  return (
    <>
      <Helmet>
        <title>Trang xác thực tài khoản</title>
        <meta name='description' content='Trang xác thực tài khoản' />
      </Helmet>
      <div className='mx-auto flex h-screen w-64 flex-col justify-center gap-y-5 md:w-96'>
        <Link to={path.home} className='flex flex-col items-center'>
          <BsYoutube className='h-16 w-16 text-red-600 md:h-24 md:w-24' />
          <div className='flex items-end gap-x-1'>
            <span className='text-lg font-semibold text-black dark:text-white md:text-2xl'>Chào mừng bạn đến</span>
            <span className='dynamic text-lg font-semibold text-red-600 after:bg-white dark:after:bg-[#0f0f0f] md:text-2xl'>
              HciTube
            </span>
          </div>
        </Link>
        <form className={`flex w-full flex-col`} noValidate onSubmit={onSubmit} autoComplete='false'>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label
              htmlFor='encode'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              Mã xác nhận
            </label>
            <Input
              name='encode'
              type='text'
              register={register}
              placeholder='Mời bạn nhập mã xác nhận'
              id='encode'
              errorMessage={errors.encode?.message}
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-64 dark:bg-transparent text-black dark:text-white md:w-96 md:placeholder:text-sm outline-none text-xs md:text-sm'
            />
          </div>
          <div className='flex items-center gap-x-1'>
            <span className='text-xs text-black dark:text-white md:text-sm '>
              Mã này sẽ hết hạn sau &nbsp;
              {`${remainingTime.minutes.toString().padStart(2, '0')}:${remainingTime.seconds
                .toString()
                .padStart(2, '0')}`}{' '}
            </span>
            <button
              type='button'
              className='text-xs font-semibold text-black underline dark:text-white md:text-sm'
              disabled={getOTP.isLoading}
              onClick={handleSendCode}
            >
              Lấy mã mới
            </button>
          </div>
          <Button
            className='mt-3 w-full rounded-lg bg-blue-600 p-2 text-xs font-semibold text-white md:text-sm'
            type='submit'
            isLoading={verifyMutation.isLoading}
            disabled={verifyMutation.isLoading}
          >
            Xác nhận
          </Button>
        </form>
      </div>
    </>
  )
}

export default VerifyResetPassPage
