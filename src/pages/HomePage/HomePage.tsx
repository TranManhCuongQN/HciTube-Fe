import AsideBar from './components/AsideBar'
import ListFilter from './components/ListFilter'
import VideoList from './components/VideoList'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/context/app.context'
import AsideBarSub from './components/AsideBarSub'
const HomePage = () => {
  const body = document.querySelector('body')
  const { showSideBar, showSideBar2xl } = useContext(AppContext)

  useEffect(() => {
    if (showSideBar && screen.width < 1536) {
      disableBodyScroll(body as HTMLElement)
    } else {
      enableBodyScroll(body as HTMLElement)
    }
  }, [showSideBar, body])
  return (
    <>
      <div className='container flex pl-2 pr-2'>
        <AsideBar />
        <AsideBarSub />
        <div
          className={`container mb-16 flex w-full flex-col pl-2 pr-2 md:ml-3  ${
            showSideBar2xl ? '2xl:ml-[300px]' : ''
          }`}
        >
          <ListFilter />
          <VideoList />
        </div>
      </div>
    </>
  )
}

export default HomePage
