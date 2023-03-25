import React from 'react'
import AsideBar from '../HomePage/components/AsideBar'
import CompactVideoItem from './components/CompactVideoItem'
import WatchingVideo from './components/WatchingVideo'

const DetailPage = () => {
  return (
    <>
      <div className='container  pl-3 pr-3 pb-5 lg:mt-2 lg:flex lg:items-start lg:gap-x-5 lg:pl-10 lg:pr-10'>
        <WatchingVideo />
        <CompactVideoItem />
      </div>
    </>
  )
}

export default DetailPage
