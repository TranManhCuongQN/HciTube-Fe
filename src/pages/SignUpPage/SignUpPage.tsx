import { useTranslation } from 'react-i18next'
import { BsYoutube } from 'react-icons/bs'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { registerSchemaType, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import authApi from 'src/api/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

type FormData = registerSchemaType
const registerSchema = schema
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const { t } = useTranslation(['auth'])
  const { setIsAuthentication, setIsVerify } = useContext(AppContext)
  const navigate = useNavigate()

  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // registerAccountMutation.mutate(data, {
    //   onSuccess: () => {
    //     // setIsAuthentication(true)
    //     navigate(path.verify)
    //   },
    //   onError: (error) => {
    //     if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
    //       const formError = error.response?.data.data
    //       if (formError) {
    //         Object.keys(formError).forEach((key) => {
    //           console.log('key', key)
    //           console.log('formError[key]', formError[key as keyof FormData])
    //         })
    //       }
    //     }
    //   }
    // })
    console.log('data', data)
    setIsVerify('1')
    navigate(path.verify)
  })

  return (
    <div className='mx-auto flex min-h-screen w-72 flex-col justify-center gap-y-5 py-5 md:w-[400px]'>
      <Link to={path.home} className='flex flex-col items-center'>
        <BsYoutube className='h-16 w-16 text-red-600 md:h-24 md:w-24' />
        <div className='flex items-end gap-x-1'>
          <span className='text-lg font-semibold text-black dark:text-white md:text-2xl'>
            {t('auth:auth.welcome to')}
          </span>
          <span className='dynamic text-lg font-semibold text-red-600 after:bg-white dark:after:bg-[#0f0f0f] md:text-2xl'>
            YouTube
          </span>
        </div>
      </Link>
      <form className={`flex w-full flex-col`} noValidate onSubmit={onSubmit}>
        <div className='flex items-center gap-x-1'>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label
              htmlFor='firstName'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              {t('auth:auth.first name') + ': '}
            </label>
            <Input
              name='firstName'
              type='text'
              register={register}
              placeholder={t('auth:auth.first name')}
              errorMessage={t(errors.firstName?.message as any)}
              id='firstName'
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-[140px] dark:bg-transparent text-black dark:text-white md:w-[195px] md:placeholder:text-sm outline-none text-xs md:text-sm'
            />
          </div>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label
              htmlFor='lastName'
              className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
            >
              {t('auth:auth.last name') + ': '}
            </label>
            <Input
              name='lastName'
              type='text'
              register={register}
              errorMessage={t(errors.lastName?.message as any)}
              placeholder={t('auth:auth.last name')}
              id='lastName'
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-[140px] dark:bg-transparent text-black dark:text-white md:w-[195px] md:placeholder:text-sm outline-none text-xs md:text-sm'
            />
          </div>
        </div>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label htmlFor='email' className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'>
            Email:
          </label>
          <Input
            name='email'
            type='text'
            register={register}
            errorMessage={t(errors.email?.message as any)}
            placeholder={t('auth:auth.enter your email')}
            id='email'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none text-xs md:text-sm'
          />
        </div>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label
            htmlFor='password'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            {t('auth:auth.password')}
          </label>
          <Input
            name='password'
            type='password'
            register={register}
            errorMessage={t(errors.password?.message as any)}
            placeholder={t('auth:auth.enter your password')}
            id='password'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none text-xs md:text-sm'
          />
        </div>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label
            htmlFor='passwordConfirm'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm  '
          >
            {t('auth:auth.Retype password')}
          </label>
          <Input
            name='passwordConfirm'
            type='password'
            errorMessage={t(errors.passwordConfirm?.message as any)}
            register={register}
            placeholder={t('auth:auth.enter your retype password')}
            id='passwordConfirm'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none text-xs md:text-sm'
          />
        </div>
        <Button
          className='mt-3 w-full rounded-lg bg-blue-600 p-2 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
          type='submit'
          isLoading={registerAccountMutation.isLoading}
          disabled={registerAccountMutation.isLoading}
        >
          {t('auth:auth.sign up')}
        </Button>
        <div className='mt-3 flex items-center justify-center gap-x-1'>
          <span className='text-xs text-black dark:text-white md:text-sm'>
            {t('auth:auth.do you already have an account')}
          </span>
          <Link
            to={path.login}
            className='cursor-pointer text-xs font-semibold text-black underline dark:text-white md:text-sm'
          >
            {t('auth:auth.sign in')}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage
