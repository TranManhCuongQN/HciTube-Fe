import AsideBar from './components/AsideBar'
import ListFilter from './components/ListFilter'
import VideoList from './components/VideoList'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/context/app.context'

const categoryAPI = [
  {
    id: '1',
    name: 'Tất cả'
  },
  {
    id: '643ce9a448f7c65f714e2690',
    name: 'Khoa học và Công nghệ'
  },
  {
    id: '643ce99b48f7c65f714e268d',
    name: 'Tin tức và sự kiện'
  },
  {
    id: '643ce99248f7c65f714e268a',
    name: 'Đời sống'
  },
  {
    id: '6438f59e0ec1f545856c75e6',
    name: 'Thể thao'
  },
  {
    id: '6438f5a00ec1f545856c75e9',
    name: 'Giải trí'
  },
  {
    id: '6438cb58276e67d1286406ef',
    name: 'Âm nhạc'
  }
]
const HomePage = () => {
  const body = document.querySelector('body')
  const { showSideBar } = useContext(AppContext)
  const [filter, setFilter] = useState<string>('1')

  useEffect(() => {
    if (showSideBar) {
      disableBodyScroll(body as HTMLElement)
    } else {
      enableBodyScroll(body as HTMLElement)
    }
  }, [body, showSideBar])

  return (
    <>
      <div className='container flex min-h-screen gap-x-20 bg-[#ffffff] dark:bg-[#0f0f0f]'>
        <AsideBar />

        <div className={`mb-16 flex h-full w-full flex-col 2xl:pl-64`}>
          <ListFilter dataCategories={categoryAPI} filter={filter} setFilter={setFilter} />
          <VideoList filter={filter} />
        </div>
      </div>
    </>
  )
}

export default HomePage
