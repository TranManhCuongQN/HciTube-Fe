import React, { useContext, useMemo } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import uploadApi from 'src/api/upload.api'
import 'react-quill/dist/quill.snow.css'
import ImageUploader from 'quill-image-uploader'
import { Controller, useFormContext } from 'react-hook-form'
import { AppContext } from 'src/context/app.context'

Quill.register('modules/imageUploader', ImageUploader)

const Editor = () => {
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
    'link',
    'image'
  ]
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image']
      ],
      imageUploader: {
        upload: async (file: File) => {
          try {
            const res = await uploadApi.uploadImage(file, undefined)
            return res.data.url
          } catch (error) {
            console.log(error)
          }
        }
      }
    }),
    []
  )
  return (
    <>
      <Controller
        control={control}
        name='description'
        render={({ field }) => (
          <ReactQuill
            className={theme === 'Dark' ? 'ql-dark dark:placeholder:text-white' : 'ql-light placeholder:text-black'}
            value={field.value}
            onChange={field.onChange}
            formats={formats}
            modules={modules}
            placeholder='Mô tả'
            theme='snow'
            style={{ height: '150px', width: '100%' }}
          />
        )}
      />
    </>
  )
}

export default Editor
