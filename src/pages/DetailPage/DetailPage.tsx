import React from 'react'
import CompactVideoItem from './components/CompactVideoItem'
import WatchingVideo from './components/WatchingVideo'

const DetailPage = () => {
  return (
    <>
      <div className='lg:mt-2 lg:flex lg:items-start lg:gap-x-4 lg:pl-5 lg:pr-5'>
        <WatchingVideo />
        <CompactVideoItem />
      </div>
    </>
  )
}

export default DetailPage
