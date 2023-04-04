import { TextareaHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister, FieldValues, FieldPath } from 'react-hook-form'

interface Props<TFieldValues extends FieldValues> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string
  classNameTextArea?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<TFieldValues>
  rules?: RegisterOptions
  name: FieldPath<TFieldValues>
}

export default function Input<TFieldValues extends FieldValues = FieldValues>({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameTextArea = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'my-1 text-red-600 min-h-[1.25rem] text-xs md:text-sm font-semibold',
  ...rest
}: Props<TFieldValues>) {
  const registerResult = register && name ? register(name, rules) : null

  return (
    <div className={'relative ' + className}>
      <textarea className={classNameTextArea} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
