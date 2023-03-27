/* eslint-disable jsx-a11y/media-has-caption */
import 'babel-polyfill'
import { useEffect, useRef, useState } from 'react'
import { MdMic } from 'react-icons/md'
import DialogCustom from '../../../DialogCustome'
import { IoCloseOutline } from 'react-icons/io5'
import { BsMicFill } from 'react-icons/bs'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import ToolTip from 'src/components/ToolTip'
import { useTranslation } from 'react-i18next'

interface VoiceProps {
  handleKeyWord: (keyWordVoice: string) => void
}
const Voice = (props: VoiceProps) => {
  const { handleKeyWord } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [record, setRecord] = useState<string>('')
  const { transcript, listening } = useSpeechRecognition()
  const [isProcess, setIsProcess] = useState<boolean>(false)
  const audioStartRef = useRef<HTMLAudioElement | null>(null)
  const audioEndRef = useRef<HTMLAudioElement | null>(null)
  const audioCloseRef = useRef<HTMLAudioElement | null>(null)
  const { t } = useTranslation(['home'])

  useEffect(() => {
    setRecord(transcript)
  }, [transcript])

  useEffect(() => {
    const out = setTimeout(() => {
      if (record === '' && isOpen && isProcess) audioEndRef.current?.play()
      SpeechRecognition.stopListening()
      setIsProcess(false)
    }, 3000)
    if (listening === false && record !== '' && isOpen !== false) {
      setIsOpen(false)
      handleKeyWord(record)
      audioEndRef.current?.play()
    }
    return () => {
      clearTimeout(out)
    }
  }, [listening, record])

  const handleVoice = () => {
    setIsOpen(true)
    audioStartRef.current?.play()
    setIsProcess(true)
    SpeechRecognition.startListening({ language: 'vi-VN' })
  }

  const handleClose = () => {
    setIsOpen(false)
    audioCloseRef.current?.play()
    SpeechRecognition.abortListening()
  }
  return (
    <>
      <ToolTip position='bottom' content={t('side bar.search_with_voice')}>
        <button
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] lg:h-10 lg:w-10 '
          onClick={handleVoice}
        >
          <MdMic className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
        </button>
      </ToolTip>

      {/* //* Dialog */}
      <DialogCustom handleClose={handleClose} isOpen={isOpen} className={'h-80 bg-white shadow-md  dark:bg-[#212121]'}>
        <div className='flex items-center justify-between'>
          {transcript === '' ? (
            listening === true ? (
              <>
                <span className='text-xl font-medium text-black dark:text-white'>{t('side bar.listening')}</span>
              </>
            ) : isProcess ? (
              <>
                <span className='text-xl font-medium text-black dark:text-white'>{t('side bar.listening')}</span>
              </>
            ) : (
              <>
                <span className='text-xl font-medium text-black dark:text-white'>{t('side bar.didnt her that')}</span>
              </>
            )
          ) : (
            <>
              <span className='text-xl font-medium text-black dark:text-white'>{transcript}</span>
            </>
          )}

          <button
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.15)] max-md:hidden lg:h-10 lg:w-10'
            onClick={() => {
              setIsOpen(false)
              audioCloseRef.current?.play()
              SpeechRecognition.abortListening()
            }}
          >
            <IoCloseOutline className='h-5 w-5 text-black dark:text-white lg:h-6 lg:w-6' />
          </button>
        </div>
        {transcript === '' ? (
          listening === true ? (
            <>
              <div className='flex h-full w-full items-center justify-center'>
                <div className='flex flex-col'>
                  <div className=' flex h-14 w-14 animate-ping items-center justify-center rounded-full bg-gray-100'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-600'>
                      <BsMicFill className='h-5 w-5 text-white' />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : isProcess ? (
            <>
              <div className='flex h-full w-full items-center justify-center'>
                <div className='flex flex-col'>
                  <div className=' flex h-14 w-14 animate-ping items-center justify-center rounded-full bg-gray-100'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-600'>
                      <BsMicFill className='h-5 w-5 text-white' />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex h-full w-full items-center justify-center'>
                <div className='flex flex-col items-center gap-y-6'>
                  <button
                    className='flex h-16 w-16 items-center justify-center rounded-full bg-[#cecece]'
                    onClick={() => {
                      audioStartRef.current?.play()
                      SpeechRecognition.startListening({ language: 'vi-VN' })
                      setIsProcess(true)
                    }}
                  >
                    <BsMicFill className='h-7 w-7 text-black' />
                  </button>
                  <span className='text-center text-base font-medium text-black dark:text-white'>
                    {t('side bar.tap the mic')}
                  </span>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div className='flex h-full w-full items-center justify-center'>
              <div className='flex flex-col'>
                <div className=' flex h-14 w-14 animate-ping items-center justify-center rounded-full bg-gray-100'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-600'>
                    <BsMicFill className='h-5 w-5 text-white' />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogCustom>

      {/* //* Audio */}
      <audio
        src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
        ref={audioStartRef}
        className='hidden opacity-0'
      />
      <audio
        src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
        ref={audioEndRef}
        className='hidden opacity-0 '
      />
      <audio
        src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
        ref={audioCloseRef}
        className='hidden opacity-0'
      />
    </>
  )
}

export default Voice
