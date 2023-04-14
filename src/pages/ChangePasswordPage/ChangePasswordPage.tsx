import React from 'react'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

const ChangePasswordPage = () => {
  return (
    <div className='flex w-full flex-col gap-y-2 lg:mt-4 lg:gap-y-5'>
      <span className='text-sm font-semibold text-black dark:text-white md:text-base'>Đổi mật khẩu</span>
      <form className='my-5 mx-auto flex w-11/12 flex-col gap-y-2 rounded-lg bg-white p-5 dark:bg-[#282828]'>
        <div className='flex flex-col gap-y-1'>
          <label
            htmlFor='oldPassword'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            Mật khẩu cũ
          </label>
          <Input
            type='password'
            name='oldPassword'
            id='oldPassword'
            placeholder='Mật khẩu cũ'
            classNameInput='rounded-lg border border-gray-400 p-3 placeholder:text-xs dark:bg-transparent text-black dark:text-white  md:placeholder:text-sm outline-none text-xs md:text-sm w-full '
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <label
            htmlFor='newPassword'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            Mật khẩu mới
          </label>
          <Input
            type='password'
            name='newPassword'
            id='newPassword'
            placeholder='Mật khẩu mới'
            classNameInput='rounded-lg border border-gray-400 p-3 placeholder:text-xs dark:bg-transparent text-black dark:text-white  md:placeholder:text-sm outline-none text-xs md:text-sm w-full '
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <label
            htmlFor='retypePassword'
            className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'
          >
            Nhập lại mật khẩu mới
          </label>
          <Input
            type='password'
            name='retypePassword'
            id='retypePassword'
            placeholder='Nhập lại mật khẩu mới'
            classNameInput='rounded-lg border border-gray-400 p-3 placeholder:text-xs dark:bg-transparent text-black dark:text-white  md:placeholder:text-sm outline-none text-xs md:text-sm w-full '
          />
        </div>
        <Button
          className='mt-3 rounded-lg bg-blue-700 py-2 px-3 text-xs font-semibold text-white shadow-2xl shadow-sky-300 md:text-sm'
          type='submit'
        >
          Cập nhập
        </Button>
      </form>
    </div>
  )
}

export default ChangePasswordPage
