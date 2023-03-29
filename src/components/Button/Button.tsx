import React, { ButtonHTMLAttributes } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}
const Button = (props: ButtonProps) => {
  const { className, isLoading, disabled, children, ...rest } = props

  const newClassName = disabled ? className + 'cursor-not-allowed' : className
  const child = isLoading ? (
    <div className='mx-auto h-4 w-4'>
      <AiOutlineLoading3Quarters className='h-full w-full animate-spin font-bold text-white' />
    </div>
  ) : (
    children
  )
  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {child}
    </button>
  )
}

export default Button
