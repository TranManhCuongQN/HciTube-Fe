import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsYoutube } from 'react-icons/bs'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import i18next from 'i18next'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading }
  } = useForm()
  const { t } = useTranslation(['auth'])

  return (
    <div className='mx-auto flex min-h-screen w-72 flex-col justify-center gap-y-5 py-5 md:w-[400px]'>
      <div className='flex flex-col items-center'>
        <BsYoutube className='h-16 w-16 text-red-600 md:h-24 md:w-24' />
        <div className='flex items-end gap-x-1'>
          <span className='text-lg font-semibold text-black dark:text-white md:text-2xl'>
            {t('auth:auth.welcome to')}
          </span>
          <span className='dynamic text-lg font-semibold text-red-600 after:bg-white dark:after:bg-[#0f0f0f] md:text-2xl'>
            YouTube
          </span>
        </div>
      </div>
      <form className='flex w-full flex-col' noValidate>
        <div className='flex items-center gap-x-1'>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label htmlFor='firstName' className='text-xs font-semibold text-black dark:text-white md:text-sm'>
              {t('auth:auth.first name') + ': '}
            </label>
            <Input
              name='firstName'
              type='text'
              register={register}
              placeholder={t('auth:auth.first name')}
              id='firstName'
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-[140px] dark:bg-transparent text-black dark:text-white md:w-[195px] md:placeholder:text-sm outline-none'
            />
          </div>
          <div className='flex w-full flex-col items-start gap-y-1'>
            <label htmlFor='lastName' className='text-xs font-semibold text-black dark:text-white md:text-sm'>
              {t('auth:auth.last name') + ': '}
            </label>
            <Input
              name='lastName'
              type='text'
              register={register}
              placeholder={t('auth:auth.last name')}
              id='lastName'
              classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-[140px] dark:bg-transparent text-black dark:text-white md:w-[195px] md:placeholder:text-sm outline-none'
            />
          </div>
        </div>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label htmlFor='email' className='text-xs font-semibold text-black dark:text-white md:text-sm'>
            Email:
          </label>
          <Input
            name='email'
            type='text'
            register={register}
            placeholder={t('auth:auth.enter your email')}
            id='email'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none'
          />
        </div>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label htmlFor='password' className='text-xs font-semibold text-black dark:text-white md:text-sm'>
            {t('auth:auth.password')}
          </label>
          <Input
            name='password'
            type='password'
            register={register}
            placeholder={t('auth:auth.enter your password')}
            id='password'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none'
          />
        </div>
        <div className='flex w-full flex-col items-start gap-y-1'>
          <label htmlFor='password' className='text-xs font-semibold text-black dark:text-white md:text-sm'>
            {t('auth:auth.Retype password')}
          </label>
          <Input
            name='password'
            type='password'
            register={register}
            placeholder={t('auth:auth.enter your retype password')}
            id='password'
            classNameInput='rounded-lg border border-gray-400 py-2 px-3 placeholder:text-xs w-72 dark:bg-transparent text-black dark:text-white md:w-[400px] md:placeholder:text-sm outline-none'
          />
        </div>
        <Button
          className='mt-3 w-full rounded-lg bg-blue-600 p-2 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
          type='submit'
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

export default SignUp
