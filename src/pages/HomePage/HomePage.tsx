import AsideBar from './components/AsideBar'
import ListFilter from './components/ListFilter'
import VideoList from './components/VideoList'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useContext, useEffect, useRef } from 'react'
import { AppContext } from 'src/context/app.context'
import AsideBarSub from './components/AsideBarSub'

const HomePage = () => {
  const body = document.querySelector('body')
  const { showSideBar, showSideBar2xl } = useContext(AppContext)

  useEffect(() => {
    if (showSideBar) {
      disableBodyScroll(body as HTMLElement)
    } else {
      enableBodyScroll(body as HTMLElement)
    }
  }, [body, showSideBar])

  return (
    <>
      <div className='container flex items-baseline gap-x-20 bg-[#ffffff] pl-2 pr-2 dark:bg-[#0f0f0f] lg:px-8'>
        <AsideBar />
        <AsideBarSub />
        <div className={`mb-16 flex w-full flex-col`}>
          <ListFilter />
          <VideoList />
        </div>
      </div>
    </>
  )
}

export default HomePage
