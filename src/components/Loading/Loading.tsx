import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

const Loading = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <AiOutlineLoading className='h-14 w-14 animate-spin text-gray-500' />
    </div>
  )
}

export default Loading
