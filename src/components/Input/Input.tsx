import { InputHTMLAttributes, useState } from 'react'
import type { RegisterOptions, UseFormRegister, FieldValues, FieldPath } from 'react-hook-form'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<TFieldValues>
  rules?: RegisterOptions
  classNameEye?: string
  name: FieldPath<TFieldValues>
}

export default function Input<TFieldValues extends FieldValues = FieldValues>({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'my-1 text-red-600 min-h-[1.25rem] text-xs md:text-sm font-semibold',
  classNameEye = 'absolute top-[8px] right-[8px] h-5 w-5 cursor-pointer',
  ...rest
}: Props<TFieldValues>) {
  const [openEye, setOpenEye] = useState(false)
  const registerResult = register && name ? register(name, rules) : null

  const toggleEye = () => {
    setOpenEye((prev) => !prev)
  }

  const handleType = () => {
    if (rest.type === 'password') {
      return openEye ? 'text' : 'password'
    }
    return rest.type
  }

  return (
    <div className={'relative ' + className}>
      <input className={classNameInput} {...registerResult} {...rest} type={handleType()} />
      {rest.type === 'password' && openEye && (
        <BsEyeFill className={`h-5 w-5 text-black dark:text-white ${classNameEye}`} onClick={toggleEye} />
      )}
      {rest.type === 'password' && !openEye && (
        <BsEyeSlashFill className={`h-5 w-5 text-black dark:text-white ${classNameEye}`} onClick={toggleEye} />
      )}

      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
