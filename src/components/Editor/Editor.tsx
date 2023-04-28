import React, { useContext, useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { Controller, useFormContext } from 'react-hook-form'
import { AppContext } from 'src/context/app.context'

const Editor = ({ name }: { name: string }) => {
  const { control } = useFormContext()
  const { theme } = useContext(AppContext)

  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link'
  ]
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link']
      ]
    }),
    []
  )

  return (
    <>
      <label htmlFor={name} className='cursor-pointer text-xs font-semibold text-black dark:text-white md:text-sm'>
        Mô tả:
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <ReactQuill
              className={theme === 'Dark' ? 'ql-dark ' : 'ql-light '}
              value={field.value}
              onChange={field.onChange}
              id={name}
              formats={formats}
              modules={modules}
              theme='snow'
            />
          )
        }}
      />
    </>
  )
}

export default Editor
