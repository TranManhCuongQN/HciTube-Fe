import 'babel-polyfill'
import { useEffect, useState } from 'react'
import { MdMic } from 'react-icons/md'
import DialogCustom from '../DialogCustome'
import Popover from '../Popover'
import { IoCloseOutline } from 'react-icons/io5'
import { BsMicFill } from 'react-icons/bs'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Voice = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [record, setRecord] = useState<string>('')
  const { transcript, listening } = useSpeechRecognition()
  const [isProcess, setIsProcess] = useState<boolean>(false)

  useEffect(() => {
    setRecord(transcript)
  }, [transcript])

  useEffect(() => {
    const out = setTimeout(() => {
      if (record === '' && isOpen && isProcess)
        // audioEndRef.current?.play()
        SpeechRecognition.stopListening()
      setIsProcess(false)
    }, 3000)
    if (listening === false && record !== '' && isOpen !== false) {
      setIsOpen(false)
      setKeyword(record)
      // audioEndRef.current?.play()
    }
    return () => {
      clearTimeout(out)
    }
  }, [listening, record])

  const handleVoice = () => {
    setIsOpen(true)
    // audioStartRef.current?.play()
    setIsProcess(true)
    SpeechRecognition.startListening({ language: 'vi-VN' })
  }

  const handleClose = () => {
    setIsOpen(false)
    // audioCloseRef.current?.play()
    SpeechRecognition.abortListening()
  }
  return (
    <>
      <Popover
        className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10 '
        renderPopover={
          <span className='z-50 mt-5 block h-full rounded-lg bg-gray-500 px-2 py-2 text-xs font-semibold'>
            Tìm kiếm bằng giọng nói
          </span>
        }
        handleClick={handleVoice}
      >
        <MdMic className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
      </Popover>

      <DialogCustom handleClose={handleClose} isOpen={isOpen} className={'dark:bg-[#212121]shadow-md h-80  bg-white'}>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-medium text-black dark:text-white'>Đang nghe ...</span>
          <button
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
            onClick={() => {
              setIsOpen(false)
              // audioCloseRef.current?.play()
              SpeechRecognition.abortListening()
            }}
          >
            <IoCloseOutline className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          </button>
        </div>
        <div className='flex h-full w-full items-center justify-center'>
          <div className='flex flex-col'>
            <div className=' flex h-14 w-14 animate-ping items-center justify-center rounded-full bg-gray-100'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-600'>
                <BsMicFill className='h-5 w-5 text-white' />
              </div>
            </div>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default Voice
