import React from 'react'
import { MdMic } from 'react-icons/md'
const Voice = () => {
  return (
    <button className='mx-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(225,225,225,0.15)]'>
      <MdMic className='h-7 w-7' />
    </button>
  )
}

export default Voice
