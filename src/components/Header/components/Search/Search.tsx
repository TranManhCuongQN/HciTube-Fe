import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Voice from '../Voice'
import { useTranslation } from 'react-i18next'
import ToolTip from 'src/components/ToolTip'

const Search = () => {
  const [keyword, setKeyword] = useState<string>('')
  const { t } = useTranslation(['home'])

  const handleKeyWord = (keyWordVoice: string) => {
    setKeyword(keyWordVoice)
  }

  return (
    <div className='flex flex-grow items-center justify-center gap-x-3 max-sm:hidden'>
      <div className=' flex h-8 items-center lg:h-10  md:w-[70%] 2xl:w-[60%] '>
        <input
          type='text'
          className='h-full w-full rounded-l-full border border-[#d8d8d8] px-4 text-base text-black outline-none placeholder:text-base dark:border-[#303030] dark:bg-[rgba(0,0,0,0)] dark:text-white'
          placeholder={t('side bar.search')}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <ToolTip position='bottom' content={t('side bar.search')}>
          <button className='flex h-8 lg:h-10 cursor-pointer items-center justify-center border-y border-r border-[#d8d8d8]  rounded-r-full bg-[#f8f8f8] dark:border-[#303030] px-4 py-1 dark:bg-[#222222]'>
            <AiOutlineSearch className='h-8 w-8 text-black dark:text-white' />
          </button>
        </ToolTip>
      </div>
      <Voice handleKeyWord={handleKeyWord} />
    </div>
  )
}

export default Search
