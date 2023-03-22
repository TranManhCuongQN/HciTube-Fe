import AsideBar from './components/AsideBar'
import ListFilter from './components/ListFilter'
import VideoList from './components/VideoList'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useContext, useEffect, useRef } from 'react'
import { AppContext } from 'src/context/app.context'
import AsideBarSub from './components/AsideBarSub'
import { useOuterClick } from 'src/hook/useClickOutSide'

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
      <div className='container flex bg-[#ffffff] pl-2 pr-2 dark:bg-[#0f0f0f]'>
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
